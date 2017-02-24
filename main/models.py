import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    verified = models.BooleanField(default=False)
    verification_code = models.UUIDField(default=uuid.uuid4)
    team = models.ForeignKey('Team', related_name='members', on_delete=models.CASCADE, null=True)

class Team(models.Model):
    name = models.CharField(max_length=20)

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
