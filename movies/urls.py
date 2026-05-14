from django.urls import path
from . import views

urlpatterns = [
    path('buscar/', views.buscar_filmes, name='buscar_filmes'),
    path('populares/', views.filmes_populares, name='filmes_populares'),
    path('<int:tmdb_id>/', views.detalhes_filme, name='detalhes_filme'),
    path('<int:tmdb_id>/marcar/', views.marcar_filme, name='marcar_filme'),
    path('meus/', views.meus_filmes, name='meus_filmes'),
]