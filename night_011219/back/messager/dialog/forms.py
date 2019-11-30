from django import forms
from dialog.models import dialog

class PostCreateChatForm(forms.ModelForm):
	class Meta:
		model = dialog
		fields = ['topic', 'is_group_chat', 'last_message']
	def clean_topic(self):
		topic = self.cleaned_data['topic']
		if len(topic) < 2:
			self.add_error("topic", 'topic len must be greater than 1')
		return topic
	def clean_last_message(self):
		last_message = self.cleaned_data['last_message']
		print (last_message)
		if len(last_message) < 1:
			self.add_error("last_message", 'last_message len must be greater than 0')
		return last_message
