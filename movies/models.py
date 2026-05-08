from django.db import models
from users.models import User

# Create your models here.

class Movie(models.Model): 
    tmdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    capa = models.URLField()
    sinopse = models.TextField(blank=True)
    ano = models.IntegerField(null=True)
    genero = models.JSONField(default=list)

    def __str__(self):
        return self.title

class UserMovie(models.Model):
    STATUS = [
        ('assistido', 'Assistido'),
        ('assistindo', 'Assistindo'),
        ('para assistir', 'Para Assistir'),
        ('abandonado', 'Abandonado'),


    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS)   
    nota = models.FloatField(null=True, blank=True)  
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'movie')
    def __str__(self):
        return f"{self.user.username} - {self.movie.title}"
