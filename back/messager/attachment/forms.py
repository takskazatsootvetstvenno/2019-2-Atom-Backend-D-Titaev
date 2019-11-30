from django import forms
from message.models import message
from user.models import myuser
from dialog.models import dialog
from attachment.models import attachment

class CheckUploadFileForm(forms.Form):
	chat = forms.IntegerField(required = False)
	user= forms.IntegerField(required = False)
	message = forms.IntegerField(required = True)
	attype = forms.CharField(max_length=32)
	url = forms.CharField(max_length=32)
	document=forms.FileField(required = False)
	audio=forms.FileField(required = False)
	image=forms.ImageField(required = False)
	def clean_message(self):
		try:
			message_id = self.cleaned_data['message']
			mymessage = message.objects.get(id = message_id)
			chat_id =  dialog.objects.get(id=mymessage.chat.id)
			user_id =  myuser.objects.get(id=mymessage.user.id)
		except message.DoesNotExist:
				self.add_error("message", 'DoesNotExist')
		except dialog.DoesNotExist:
				self.add_error("message", 'Chat with this message DoesNotExist')
		except myuser.DoesNotExist:
				self.add_error("message", 'User with this message DoesNotExist')
		return message_id

	def clean_attype(self):
		attype = self.cleaned_data['attype']
		if not (attype == 'document' or  attype == 'audio' or attype == 'image'):
			self.add_error("attype", 'Wrong Type')
		return attype

	def save(self):
		data = self.cleaned_data
		attype = data['attype']
		message_id = data['message']
		url = data['url']
		document=data['document']
		audio=data['audio']
		image=data['image']

		mymessage = message.objects.get(id = message_id)
		user = myuser.objects.get(id = mymessage.user_id)
		chat = dialog.objects.get(id = mymessage.chat_id)
		
		myattachment = attachment.objects.create(message=mymessage,user=user,
								chat=chat,url=url,document=document,
								audio=audio,image=image)
		return myattachment

class CheckDownloadForm(forms.Form):
	attachment = forms.IntegerField(required = False)
	user= forms.IntegerField(required = False)
	attype = forms.CharField(max_length=32)

	def clean_attachment(self):
		try:
			myattachment_id = self.cleaned_data['attachment']
			myattachment=attachment.objects.get(id=myattachment_id)
		except attachment.DoesNotExist:
				self.add_error("attachment", 'DoesNotExist')
		return myattachment_id

	def clean_attype(self):
		attype = self.cleaned_data['attype']
		if not (attype == 'document' or  attype == 'audio' or attype == 'image'):
			self.add_error("attype", 'Wrong Type')
		return attype
