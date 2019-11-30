from django.db import models
from dialog.models import dialog
'''
from user.models import myuser
from Message.models import message
class attachment(models.Model):
	chat = models.ForeignKey(dialog,on_delete=models.CASCADE)
	user= models.ForeignKey(myuser,on_delete=models.CASCADE)
	last_read_messages=models.ForeignKey(message,on_delete=models.CASCADE)
	attype=models.CharField(max_length=64,blank=False)
	url=models.CharField(max_length=64,blank=False)
	new_messages = models.TextField()
'''