from rest_framework import serializers
from .models import Review, Like
from users.serializers import UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'user', 'texto', 'nota', 'criado_em', 'likes_count']

    def get_likes_count(self, obj):
        return obj.like_set.count()