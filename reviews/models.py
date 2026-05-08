from django.db import models
from users.models import User
from movies.models import Movie

# Create your models here.
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    texto = models.TextField()
    nota = models.FloatField()
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'movie')
    def __str__(self):
        return f"{self.user.username} - {self.movie.title}"
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'review')
    #def __str__(self):
      #  return f"{self.user.username} - {self.review.id}"