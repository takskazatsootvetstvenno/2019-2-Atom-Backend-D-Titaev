from django.shortcuts import render
from django.http import JsonResponse
from user.models import myuser
from dialog.models import dialog
from member.models import member
from user.forms import CheckUserNameForm
from user.forms import CheckUserIdForm

def user(request):
	if request.method != 'GET':
		print("Not GET!")
		return JsonResponse({'Eror': 'not get request'})
	mylist = []
	form = CheckUserNameForm(request.GET)
	if form.is_valid():
		users = myuser.objects.filter(nick = request.GET.get('nick'))
		for curuser in users:
			mylist.append({
			 	'id': curuser.id,
			 	'nick': curuser.nick,
			 	'avatar': curuser.avatar,
			})
	else:
		return JsonResponse({'error': form.errors}, status=400)
	return JsonResponse({'answer': mylist})

def finduser(request):
	if request.method != 'GET':
		print("Not GET!")
		return JsonResponse({'Eror': 'not get request'})
		
	mylist = []
	form = CheckUserIdForm(request.GET)

	if form.is_valid():
		user = myuser.objects.get(id = request.GET.get('id'))
		mylist.append({
		 	'id': user.id,
		 	'nick': user.nick,
		 	'avatar': user.avatar,
		})
	else:
		return JsonResponse({'error': form.errors}, status=400)
	return JsonResponse({'answer': mylist})