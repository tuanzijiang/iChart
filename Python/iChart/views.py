from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def post_test(request):
    data = request.POST.get('test')
    return HttpResponse(data)