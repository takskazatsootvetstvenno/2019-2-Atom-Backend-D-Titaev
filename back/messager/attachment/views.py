from django.shortcuts import render
from django.http import JsonResponse
from attachment.forms import CheckUploadFileForm
from attachment.forms import CheckDownloadForm
from message.models import message
from member.models import member
from user.models import myuser
from attachment.models import attachment
from django.contrib.auth.decorators import login_required

@login_required
def upload_file(request):
	if request.method != 'POST':
		print("Not POST!")
		return JsonResponse({'Eror': 'not POST request'})
	form = CheckUploadFileForm(request.POST, request.FILES)
	if form.is_valid():
		myattachment = form.save()
		mylist={
				'chat_id': myattachment.chat.id,
			 	'user_id': myattachment.user.id,
			 	'message_id': myattachment.message_id,
			 	'url': myattachment.url,
			 	'attype': myattachment.attype,
			 	'document': myattachment.document.name,
			 	'audio': myattachment.audio.name,
			 	'image': myattachment.image.name,
			}
		print('valid')
		return JsonResponse({'answer': mylist})
	else:
		return JsonResponse({'error': form.errors}, status=400)

@login_required
def download_file(request):
	if request.method != 'GET':
		print("Not GET!")
		return JsonResponse({'Eror': 'not GET request'})
	form = CheckDownloadForm(request.GET)
	if form.is_valid():
		myattachment =  attachment.objects.get(id=request.GET.get('attachment'))
		user_id = request.GET.get('user')
		if myattachment.user_id!=int(user_id):
			return JsonResponse({'answer': "you have not rights for this"})

		if request.GET.get('attype') == 'document':
			myattachment = attachment.objects.get(id = request.GET.get('attachment'))
			mylist={
				'document': myattachment.document.url,
			}
			return JsonResponse({'answer': mylist})
		if request.GET.get('attype') == 'audio':
			myattachment = attachment.objects.get(id = request.GET.get('attachment'))
			mylist={
				'audio': myattachment.audio.url,
			}
			return JsonResponse({'answer': mylist})
		if request.GET.get('attype') == 'image':
			myattachment = attachment.objects.get(id = request.GET.get('attachment'))
			mylist={
				'image': myattachment.image.url,
			}
			return JsonResponse({'answer': mylist})
		return JsonResponse({'answer': mylist})
	else:
		return JsonResponse({'error': form.errors}, status=400)
