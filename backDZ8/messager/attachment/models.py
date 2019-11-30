from django.db import models
from dialog.models import dialog
from user.models import myuser
from message.models import message
class attachment(models.Model):
	chat = models.ForeignKey(dialog,on_delete=models.CASCADE)
	user= models.ForeignKey(myuser,on_delete=models.CASCADE)
	message=models.ForeignKey(message,on_delete=models.CASCADE)
	document=models.FileField(upload_to='documents/',null=True)
	audio=models.FileField(upload_to='audio/',null=True)
	image=models.ImageField(upload_to='images/',null=True)
	attype=models.CharField(max_length=64,blank=False)
	url=models.CharField(max_length=64,blank=False)
	#new_messages = models.TextField()