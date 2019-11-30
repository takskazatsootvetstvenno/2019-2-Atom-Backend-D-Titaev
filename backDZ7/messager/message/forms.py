from django import forms
from message.models import message
from user.models import myuser
from dialog.models import dialog
from member.models import member
import datetime
class CheckMessageIdForm(forms.Form):
	id = forms.IntegerField(required = True)

	def clean_id(self):
		try:
			mymessage = message.objects.get(id = self.cleaned_data['id'])	  
		except message.DoesNotExist:
				self.add_error("id", 'DoesNotExist')
class CheckReadedMessageForm(forms.Form):
	member = forms.IntegerField(required = True)
	chat = forms.IntegerField(required = True)

	def clean_member(self):
		try:
			mymember = member.objects.get(id = self.cleaned_data['member'])
		except member.DoesNotExist:
				self.add_error("member", 'DoesNotExist')

	def clean_chat(self):
		try:
			mychat = dialog.objects.get(id = self.cleaned_data['chat']) 
		except dialog.DoesNotExist:
				self.add_error("chat", 'DoesNotExist')

class CheckChatMessageForm(forms.Form):
	id = forms.IntegerField(required = True)

	def clean_id(self):
		try:
			mychat = dialog.objects.get(id = self.cleaned_data['id'])	  
		except dialog.DoesNotExist:
				self.add_error("id", 'DoesNotExist')
		'''
		try:
			mychat = dialog.objects.get(id = self.cleaned_data['id'])
			mymessages = message.objects.filter(chat = mychat)
		except message.DoesNotExist:
				self.add_error("id", 'DoesNotExist')
		'''

class CheckSendMessageForm(forms.Form):
	class Meta:
		model = message
		fields = ['chat', 'user', 'content']

	chat = forms.IntegerField(required = True)
	user= forms.IntegerField(required = True)
	content = forms.CharField(max_length=256,required = True)
	
	def clean_chat(self):
		try:
			chat_id = self.cleaned_data['chat']
			mychat = dialog.objects.get(id = chat_id)	  
		except dialog.DoesNotExist:
				self.add_error("chat", 'DoesNotExist')
		return chat_id

	def clean_user(self):
		try:
			user_id = self.cleaned_data['user']
			mychat = myuser.objects.get(id = user_id)	  
		except myuser.DoesNotExist:
				self.add_error("user", 'DoesNotExist')
		return user_id

	def save(self):
		data = self.cleaned_data
		chat = data['chat']
		user = data['user']
		content = data['content']
		mymessage = message.objects.create(user=myuser.objects.get(id = user),
								chat=dialog.objects.get(id = chat),
								content=content,
								added_at=datetime.datetime.now())
		mychat = dialog.objects.get(id = chat)
		mychat.last_message = content
		mychat.save()
		curmember=member.objects.get(chat_id=chat)
		curmember.new_messages = content
		curmember.save()
		return mymessage
