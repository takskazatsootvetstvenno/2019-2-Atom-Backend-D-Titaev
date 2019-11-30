from django.shortcuts import render
from django.http import JsonResponse
from message.forms import CheckMessageIdForm
from message.forms import CheckReadedMessageForm
from message.forms import CheckChatMessageForm
from message.forms import CheckSendMessageForm
from message.models import message
from member.models import member
from django.contrib.auth.decorators import login_required

@login_required
def read_message(request):
	if request.method != 'GET':
		print("Not GET!")
		return JsonResponse({'Eror': 'not get request'})

	form = CheckMessageIdForm(request.GET)
	if form.is_valid():
		curmessage = message.objects.get(id = request.GET.get('id'))
		mylist={
				'chat': curmessage.chat.id,
			 	'user': curmessage.user.id,
			 	'content': curmessage.content,
			 	'added_at': curmessage.added_at,
			}
		return JsonResponse({'answer': mylist})
	else:
		return JsonResponse({'error': form.errors}, status=400)

@login_required
def send_message(request):
	if request.method != 'POST':
		print("Not POST!")
		return JsonResponse({'Eror': 'not POST request'})
	form = CheckSendMessageForm(request.POST, request.user)
	if form.is_valid():
		mymessage = form.save()
		mylist={
				'chat': mymessage.chat.id,
			 	'user': mymessage.user.id,
			 	'content': mymessage.content,
			 	'added_at': mymessage.added_at,
			}
		print('valid')
		return JsonResponse({'answer': mylist})
	else:
		return JsonResponse({'error': form.errors}, status=400)

@login_required
def readed_message(request):
	if request.method != 'POST':
		print("Not POST!")
		return JsonResponse({'Eror': 'not get request'})

	form = CheckReadedMessageForm(request.POST)
	
	if form.is_valid():
		mymember = member.objects.get(id = request.POST['member'])	 
		mylist=[]
		messages=message.objects.filter(chat_id = mymember.chat.id)
		mymesess=messages.latest('added_at')
		mymember.last_read_messages=mymesess
		mymember.save()
		mylist.append({
					'chat': mymesess.chat.id,
				 	'user': mymesess.user.id,
				 	'content': mymesess.content,
				 	'added_at': mymesess.added_at,
				})
		return JsonResponse({'answer': mylist})
	else:
		return JsonResponse({'error': form.errors}, status=400)
		
@login_required
def chat_messages(request):
	if request.method != 'GET':
		print("Not GET!")
		return JsonResponse({'Eror': 'not GET request'})

	form = CheckChatMessageForm(request.GET)
	if form.is_valid():
		mylist=[]
		#mychat = dialog.objects.get(id = request.GET.get('id'))	 
		chat_id = request.GET.get('id')
		messages=message.objects.filter(chat_id = chat_id)
		for mymessage in messages:
			mylist.append({
					'message_id': mymessage.id,
					'chat': mymessage.chat.id,
				 	'user': mymessage.user.id,
				 	'content': mymessage.content,
				 	'added_at': mymessage.added_at,
				})
		print('valid')
		return JsonResponse({'answer': mylist})
	else:
		return JsonResponse({'error': form.errors}, status=400)