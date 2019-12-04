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

class CheckNewMessagesForm(forms.Form):
	ye = forms.IntegerField(required = True)
	mo = forms.IntegerField(required = True)
	da = forms.IntegerField(required = True)
	ho = forms.IntegerField(required = True)
	mi = forms.IntegerField(required = True)
	sec = forms.IntegerField(required = True)
	micsec = forms.IntegerField(required = True)
	chat = forms.IntegerField(required = True)
	def	clean_ye(self):
		ye = self.cleaned_data['ye']
		if ye<100 or ye > 3000:
			self.add_error("ye", 'wrong year')
	def clean_chat(self):
		try:
			mychat = dialog.objects.get(id = self.cleaned_data['chat'])	  
		except dialog.DoesNotExist:
				self.add_error("chat", 'DoesNotExist')
	def	clean_mo(self):
		mo = self.cleaned_data['mo']
		if mo<1 or mo > 12:
			self.add_error("mo", 'wrong month')
	def	clean_da(self):
		da = self.cleaned_data['da']
		if da<0 or da > 31:
			self.add_error("da", 'wrong day')
	def	clean_ho(self):
		ho = self.cleaned_data['ho']
		if ho<0 or ho > 24:
			self.add_error("ho", 'wrong hour')
	def	clean_mi(self):
		mi = self.cleaned_data['mi']
		if mi<0 or mi > 60:
			self.add_error("mi", 'wrong minute')
	def	clean_sec(self):
		sec = self.cleaned_data['sec']
		if sec<0 or sec > 60:
			self.add_error("sec", 'wrong second')
	def	clean_micsec(self):
		sec = self.cleaned_data['micsec']
		if sec<0:
			self.add_error("micsec", 'wrong microsecond')

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
	chat = forms.IntegerField(required = True)
	#user= forms.IntegerField(required = True)
	content = forms.CharField(max_length=256,required = True)

	def __init__(self,get,user):
		super().__init__(get)
		self.user=user

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
		user = self.user
		content = data['content']
		mymessage = message.objects.create(user=myuser.objects.get(username = user),
								chat=dialog.objects.get(id = chat),
								content=content,
								added_at=datetime.datetime.now())
		mychat = dialog.objects.get(id = chat)
		mychat.last_message = content
		mychat.save()
		curmember=member.objects.filter(user=myuser.objects.get(username = user)).get(chat_id=chat)
		curmember.new_messages = content
		curmember.save()
		return mymessage
