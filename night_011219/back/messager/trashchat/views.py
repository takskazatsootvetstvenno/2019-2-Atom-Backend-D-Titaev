from django.shortcuts import render
from django.http import JsonResponse
from trashchat.forms import CheckNewMessagesForm
from trashchat.forms import CheckSendMessagesForm
from trashchat.models import trashchat
import datetime

def messages_list(request):
	if request.method != 'GET':
		print("Not GET!")
		return JsonResponse({'Eror': 'not get request'})
	mylist=[]
	for curmessage in trashchat.objects.order_by('added_at'):
		mylist.append({
				'content': curmessage.content,
			 	'user': curmessage.user,
			 	'added_at': curmessage.added_at,
			 	'mes_index': curmessage.id,
		})
	return JsonResponse({'answer': mylist})

def new_messages(request):
	if request.method != 'GET':
		print("Not GET!")
		return JsonResponse({'Eror': 'not get request'})
	mylist=[]
	print('new_messages')

	form = CheckNewMessagesForm(request.GET)
	if form.is_valid():
		ye = request.GET.get('ye')
		mo = request.GET.get('mo')
		da = request.GET.get('da')
		ho = request.GET.get('ho')
		mi = request.GET.get('mi')
		sec = request.GET.get('sec')
		micsec = request.GET.get('micsec')
		try:
			first_date = datetime.datetime(int(ye),int(mo),int(da),int(ho),int(mi),int(sec),int(micsec))
		except Exception:
			return JsonResponse({'answer': 'wrong datetime'})

		for curmessage in trashchat.objects.filter(added_at__range=(first_date,datetime.datetime.now())).order_by('added_at'):
			mylist.append({
					'content': curmessage.content,
				 	'user': curmessage.user,
				 	'added_at': curmessage.added_at,
				 	'mes_index': curmessage.id,
			})
	else:
		return JsonResponse({'error': form.errors}, status=400)
	return JsonResponse({'answer': mylist})

def send_message(request):
	if request.method != 'POST':
		print("Not POST!")
		return JsonResponse({'Eror': 'not post request'})

	form = CheckSendMessagesForm(request.POST)
	print(request.POST.get('content'))
	print(request.POST.get('user'))
	if form.is_valid():
		curmessage = form.save()
		mylist={
				'content': curmessage.content,
			 	'user': curmessage.user,
			 	'added_at': curmessage.added_at,
			 	'mes_index': curmessage.id,
			}
	else:
		return JsonResponse({'error': form.errors}, status=400)
	return JsonResponse({'answer': mylist})