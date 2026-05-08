from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    bio = models.TextField(blank=True)
    foto_perfil = models.ImageField(upload_to='perfis/', blank=True, null=True)

    def __str__(self):
        return self.username