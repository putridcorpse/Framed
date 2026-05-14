from django.shortcuts import render
import requests
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Movie, UserMovie
from .serializers import MovieSerializer, UserMovieSerializer

TMDB_BASE = 'https://api.themoviedb.org/3'

@api_view(['GET'])
@permission_classes([AllowAny])
def buscar_filmes(request):
    query = request.GET.get('q', '')
    if not query:
        return Response({'erro': 'Parâmetro q é obrigatório'}, status=status.HTTP_400_BAD_REQUEST)
    response = requests.get(f"{TMDB_BASE}/search/movie", params={
        'api_key': settings.TMDB_API_KEY,
        'query': query,
        'language': 'pt-BR'
    })
    return Response(response.json())

@api_view(['GET'])
@permission_classes([AllowAny])
def detalhes_filme(request, tmdb_id):
    response = requests.get(f'{TMDB_BASE}/movie/{tmdb_id}', params={
        'api_key': settings.TMDB_API_KEY,
        'language': 'pt-BR',
        'append_to_response': 'credits'
    })
    return Response(response.json())

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def marcar_filme(request, tmdb_id):
    dados = request.data
    filme_data = requests.get(f'{TMDB_BASE}/movie/{tmdb_id}', params={
        'api_key': settings.TMDB_API_KEY,
        'language': 'pt-BR'
    }).json()
    movie, _ = Movie.objects.get_or_create(tmdb_id=tmdb_id, defaults={
        'title': filme_data.get('title', ''),
        'capa': f"https://image.tmdb.org/t/p/w500{filme_data.get('poster_path', '')}",
        'sinopse': filme_data.get('overview', ''),
        'ano': int(filme_data.get('release_date', '0000-00-00')[:4]) if filme_data.get('release_date') else None,
        'genero': [g['name'] for g in filme_data.get('genres', [])]
    })
    user_movie, created = UserMovie.objects.get_or_create(user=request.user, movie=movie, defaults={
        'status': dados.get('status'),
        'nota': dados.get('nota')
    })
    serializer = UserMovieSerializer(user_movie)
    return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def meus_filmes(request):
    filmes = UserMovie.objects.filter(user=request.user).select_related('movie')
    serializer = UserMovieSerializer(filmes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def filmes_populares(request):
    response = requests.get(f'{TMDB_BASE}/movie/popular', params={
        'api_key': settings.TMDB_API_KEY,
        'language': 'pt-BR'
    })
    return Response(response.json())