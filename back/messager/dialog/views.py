from django.shortcuts import render
from django.http import JsonResponse
from user.models import myuser
from dialog.models import dialog
from member.models import member
from message.models import message
from dialog.forms import PostCreateChatForm
import datetime
CURRENT_USER = 1 #от какого пользователя выполняется запрос, сейчас от первого
#

def create_chat(request):
	mylist = ['can not create new']
	if request.method == 'POST':
		form = PostCreateChatForm(request.POST)

		if form.is_valid():
			topic = request.POST.get('topic')
			last_message = request.POST.get('last_message')
			curchat = form.save()
			curuser= myuser.objects.get(id = CURRENT_USER)
			curmessage = message.objects.create(user = curuser, chat = curchat,
					content = last_message, added_at = datetime.datetime.now())
			member.objects.create(user = curuser, chat = curchat,
					 new_messages = last_message,last_read_messages = curmessage)
			mylist = ['created! for check: /chats/member_list']
			return JsonResponse({'answer': mylist})
		else:
			return JsonResponse({'error': form.errors}, status=400)

		if request.method == 'GET' and request.method == 'POST':#post только для создания
			return JsonResponse({'Eror':'not get request'})

	return JsonResponse({'answer': mylist})

def member_list(request):
	#if request.method == 'GET' and request.method == 'POST':
	if request.method != 'GET':
		return JsonResponse({'Eror':'not get request'})
	mylist = []
	curuser= myuser.objects.get(id = CURRENT_USER)
	members = member.objects.filter(user=curuser)
	for curmember in members:
		curchat = curmember.chat
		mylist.append({
				'member_info':{
					'member_id': curmember.id,
					'new_messages': curmember.new_messages,
					'last_read_messages_id': curmember.last_read_messages_id,
				},
				'chat_info':{
					'id': curchat.id,
					'topic': curchat.topic,
					'last_message': curchat.last_message,
					'is_group_chat': curchat.is_group_chat,
				}
			})
	return JsonResponse({'answer': mylist})