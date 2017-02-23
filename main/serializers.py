import uuid
from .models import User, Team
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email','team','verified')
        read_only_fields = ('username',)
        extra_kwargs = {'password': {'write_only': True}}
        depth = 1

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.content = validated_data.get('verified', instance.verified)
        instance.email = validated_data.get('team', instance.team)
        instance.set_password(validated_data.get('password', instance.password))
        instance.verification_code = uuid.uuid4()
        instance.save()
        return instance



class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'name', 'members')
