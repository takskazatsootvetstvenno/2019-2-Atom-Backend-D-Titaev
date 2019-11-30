from django.shortcuts import render
from django.http import JsonResponse
from user.models import myuser
from dialog.models import dialog
from member.models import member
from user.forms import CheckUserNameForm
from user.forms import CheckUserIdForm
from django.contrib.auth.decorators import login_required

@login_required
def allinformation(request):
	if request.method != 'GET':
		print("Not GET!")
		return JsonResponse({'Eror': 'not get request'})
	userobj = {
		'id': request.user.id,
		'nick': request.user.nick,
		'avatar': request.user.avatar,
		'usernameback': request.user.username,
		'first': request.user.first_name,
		'last': request.user.last_name,
	}
	return JsonResponse({'answer': userobj})
@login_required
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
	
@login_required
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