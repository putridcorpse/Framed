from rest_framework import serializers  # type: ignore[import]
from .models import Movie, UserMovie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class UserMovieSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)

    class Meta:
        model = UserMovie
        fields = ['id', 'movie', 'status', 'nota', 'criado_em']