from django.shortcuts import render
from django.http import JsonResponse
def main_response(request):
	if request.method!='GET':
		print("Not GET!")
		return JsonResponse({'Eror':'not get request'})
	temp_res = render(request,'chat_list.html');
	return temp_res;