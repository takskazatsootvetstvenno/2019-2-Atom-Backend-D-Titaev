from django.db import models
from dialog.models import dialog
from user.models import myuser
class message(models.Model):
	chat = models.ForeignKey(dialog,on_delete=models.CASCADE)
	user= models.ForeignKey(myuser,on_delete=models.CASCADE)
	topic = models.CharField(max_length=32,blank=False)
	content = models.TextField()
	added_at = models.CharField(max_length=8)
