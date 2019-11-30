from django.db import models

class dialog(models.Model):
	is_group_chat = models.BooleanField(default=False)
	topic = models.CharField(max_length=32,blank=False)
	last_message = models.TextField();