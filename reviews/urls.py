from django.urls import path
from . import views

urlpatterns = [
    path('filme/<int:tmdb_id>/', views.reviews_filme, name='reviews_filme'),
    path('<int:review_id>/deletar/', views.deletar_review, name='deletar_review'),
    path('<int:review_id>/like/', views.like_review, name='like_review'),
]