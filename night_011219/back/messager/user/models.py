from django.db import models
from django.contrib.auth.models import AbstractUser

class myuser(AbstractUser):
	nick = models.CharField(max_length=128, blank=False)
	avatar = models.CharField(max_length=128, default='default.png')