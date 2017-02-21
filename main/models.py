from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    verified = models.BooleanField(default=False)
    team = models.ForeignKey('Team',related_name='members', on_delete=models.CASCADE, null=True)

class Team(models.Model):
    name = models.CharField(max_length=20)


