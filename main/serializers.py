from .models import User, Team
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields ='__all__'
        extra_kwargs = {'password': {'write_only': True}}
        depth = 1

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'name', 'members')
