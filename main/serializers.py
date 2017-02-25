import uuid
from .models import User, Team
from rest_framework import serializers

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('name', 'members')

class UserSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    team_id = serializers.IntegerField(required=False)

    class Meta:
        model = User
        fields = ('team_id','team', 'username', 'first_name', 'last_name', 'email','verified', 'password')
        extra_kwargs = {'password': {'write_only': True}, 'team':{'required':False}}
        depth = 1


    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.verified = validated_data.get('verified', instance.verified)
        try:
            instance.team = validated_data.get('team', instance.team)
        except Team.DoesNotExist:
            pass
        instance.set_password(validated_data.get('password', instance.password))
        instance.verification_code = uuid.uuid4()
        instance.save()
        return instance

