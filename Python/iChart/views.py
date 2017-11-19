from django.shortcuts import render
from django.http import HttpResponse
from iChart.models import User, Sheet
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
import xlrd
import pandas as pd
import os
# Create your views here.
#------------------------------------------------Main Part------------------------------------------------#

#保存上传文件
def upload_file(request):
    result = Result()
    if not (request.method == "POST"):
        result.state('Wrong Method')
        return HttpResponse(result.finish())

    #获取文件
    myFile = request.FILES.get("file", None)
    if not myFile:
        result.state('Upload Fail')
        return HttpResponse(result.finish())

    #类型判断
    file_name = str(myFile.name)

    #return HttpResponse(str(type(myFile.name)) + myFile.name)
    ext = file_name[file_name.find('.')+1:]
    types = ['xls','xlsx','csv']
    if not ext in types:
        result.state('Wrong File Type')
        return HttpResponse(result.finish())

    #判重
    user_id = request.session['user_id']
    old_file = Sheet.objects.filter(filename=file_name,userid=user_id)
    new_name = file_name
    if len(old_file) :#有重复
        old_name = file_name
        old_name = old_name[:old_name.rfind('.')]
        #非首个重复名
        short_name = old_name
        if old_name[-1]== ')' and  '(' in old_name:
            number =  old_name[old_name.rfind('(')+1:-1]
            if number.isdigit():
                short_name = old_name[:old_name.rfind('(')]
        i = 1
        while 1 :
            new_name = short_name + '(%d).' % i + ext
            same_file = Sheet.objects.filter(filename = new_name,userid=user_id)
            #找到合适的名字
            if not len(same_file):
                break
            i = i + 1

    #分类保存处理
    if ext == 'xls' or ext == 'xlsx':
        _save_excel(request,myFile,new_name)
    else:
        _save_csv(request,myFile,new_name)

    result.succeed();
    return HttpResponse(result.finish())

#用于存储返回值
class Result:
    result = {}
    def state(self,s):
        self.result['state'] = s

    def set(self,name,value):
        self.result[name] = value

    def finish(self):
        return json.dumps(self.result)

    def succeed(self):
        self.result['state'] = 'Succeed'

    def fail(self):
        self.result['state'] = 'Fail'



#------------------------------------------------Main Part------------------------------------------------#


#------------------------------------------------SubFunc Part---------------------------------------------#

#保存excel文件
def _save_excel(request,file,name):
    user_id = request.session['user_id']
    user_path = os.path.join(settings.SAVED_FILE_PATH,str(user_id))
    #建立用户目录
    if not os.path.exists( user_path ):
        os.mkdir(user_path)
    #建立文件目录
    file_dir_path = os.path.join(user_path,name)
    os.mkdir(file_dir_path)
    #保存总文件
    file_path = os.path.join(file_dir_path,name)
    destination = open(file_path , 'wb+')
    for chunk in file.chunks():
        destination.write(chunk)
    destination.close()
    #分表记录
    book = xlrd.open_workbook(file_path)
    excel = pd.ExcelFile(file_path)
    sheet_names = book.sheet_names()
    for sheet_name in sheet_names:#遍历判空
        sheet = excel.parse(sheet_name)
        if not sheet.empty:
        #不为空保存
            file_type = name[name.rfind('.')+1:]
            newSheet = Sheet(userid=user_id,type=file_type,filename=name,sheetname=sheet_name)
            newSheet.save()
            #保存sheet
            file_sheet_name = name[:name.rfind('.')]+'_'+sheet_name+'.'+file_type
            sheet_path = os.path.join(file_dir_path,file_sheet_name)
            sheet.to_excel(sheet_path,sheet_name=sheet_name,index=True,header=True)
    return
#保存csv文件
def _save_csv(request,file,name):
    return




#------------------------------------------------SubFunc Part---------------------------------------------#


#--------------------------------------------------Test Part----------------------------------------------#
#用于生成测试用例
@csrf_exempt
def _new_user(request):
    account = request.POST.get('account')
    password = request.POST.get('password')
    new_user = User(account=account,password=password)
    new_user.save()
    return HttpResponse('success')

#用于登录到测试用例
@csrf_exempt
def _log_in(request):
    id = request.POST.get('id')
    request.session['user_id']=int(id)
    return HttpResponse('success')

#用于测试post
@csrf_exempt
def post_test(request):
    data = request.POST.get('test')
    return HttpResponse(data)

def test(request):
    return render(request,"test.html")
#--------------------------------------------------Test Part----------------------------------------------#

