from django import forms
from trashchat.models import trashchat
import datetime

class CheckNewMessagesForm(forms.Form):
	ye = forms.IntegerField(required = True)
	mo = forms.IntegerField(required = True)
	da = forms.IntegerField(required = True)
	ho = forms.IntegerField(required = True)
	mi = forms.IntegerField(required = True)
	sec = forms.IntegerField(required = True)
	micsec = forms.IntegerField(required = True)
	def	clean_ye(self):
		ye = self.cleaned_data['ye']
		if ye<100 or ye > 3000:
			self.add_error("ye", 'wrong year')
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

class CheckSendMessagesForm(forms.Form):
	user= forms.CharField(max_length=16, required = True)
	content = forms.CharField(max_length=512, required = True)

	def save(self):
		data = self.cleaned_data
		user = data['user']
		content = data['content']
		mytrashchat = trashchat.objects.create(user=user,
								content=content,
								added_at=datetime.datetime.now())
		return mytrashchat