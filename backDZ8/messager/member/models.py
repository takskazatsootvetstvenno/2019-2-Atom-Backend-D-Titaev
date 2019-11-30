from django.db import models
from dialog.models import dialog
from user.models import myuser
from message.models import message
class member(models.Model):
	chat = models.ForeignKey(dialog,on_delete=models.CASCADE)
	user= models.ForeignKey(myuser,on_delete=models.CASCADE)
	last_read_messages=models.ForeignKey(message,on_delete=models.CASCADE)
	new_messages = models.TextField()