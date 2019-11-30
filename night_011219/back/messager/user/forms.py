from django import forms
from user.models import myuser

class CheckUserNameForm(forms.Form):
	nick = forms.CharField(max_length=128,required=True)

	def clean_nick(self):
		if len(self.cleaned_data['nick']) > 128:
			self.add_error("nick", 'name length less than 129 symbols')
		return self.cleaned_data['nick']

class CheckUserIdForm(forms.Form):
	id = forms.IntegerField(required=True)
	mylist = []
	def clean_id(self):
		try:
			user_id = int(self.cleaned_data['id'])
			myid = myuser.objects.get(id = user_id)
		except ValueError:
				self.add_error("id", 'ValueError(not a number)')
		except myuser.DoesNotExist:
				self.add_error("id", 'DoesNotExist')
		return user_id