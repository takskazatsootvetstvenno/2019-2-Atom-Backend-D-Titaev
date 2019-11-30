from django.db import models

class trashchat(models.Model):
	user= models.CharField(max_length=32)
	content = models.TextField()
	added_at = models.DateTimeField(auto_now=True)
