from django.shortcuts import render
from django.http import JsonResponse
from attachment.forms import CheckUploadFileForm
from attachment.forms import CheckDownloadForm
from message.models import message
from member.models import member
from user.models import myuser
from attachment.models import attachment

def upload_file(request):
	if request.method != 'POST':
		print("Not POST!")
		return JsonResponse({'Eror': 'not POST request'})
	form = CheckUploadFileForm(request.POST, request.FILES)
	if form.is_valid():
		print(request.FILES.get('document'))
		print(request.FILES.get('audio'))
		print(request.FILES.get('image'))
		if request.FILES.get('document')==request.FILES.get('audio')==request.FILES.get('image')==None:
			return JsonResponse({'answer': 'Null files'})
		myattachment = form.save()
		mylist={
				'attachment_id': myattachment.id,
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
			try:
				mylist={
				'document': myattachment.document.url,
			}
			except ValueError:
				return JsonResponse({'answer': 'File with document type does not exist'})
			
		if request.GET.get('attype') == 'audio':
			myattachment = attachment.objects.get(id = request.GET.get('attachment'))
			try:
				mylist={
					'audio': myattachment.audio.url,
				}
			except ValueError:
				return JsonResponse({'answer': 'File with audio type does not exist'})


		if request.GET.get('attype') == 'image':
			myattachment = attachment.objects.get(id = request.GET.get('attachment'))
			try:
				mylist={
					'image': myattachment.image.url,
				}
			except ValueError:
				return JsonResponse({'answer': 'File with image type does not exist'})
		
		return JsonResponse({'answer': mylist})
	else:
		return JsonResponse({'error': form.errors}, status=400)
