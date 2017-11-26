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
@csrf_exempt
def upload_file(request):
    result = Result()
    if not _session_detect(request):
        result.not_log()
        return HttpResponse(result.finish())
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
        sheet = _save_excel(request,myFile,new_name)
        if sheet != -1:
            result.set_result({'id':sheet})
            result.succeed()
        else:
            result.state('Empty File')
    else:
        _save_csv(request,myFile,new_name)

    # result.succeed();
    return HttpResponse(result.finish())

#登录
@csrf_exempt
def log_in(request):
    result = Result()
    if not _post_detect(request,['account','password']):
        result.post()
        return HttpResponse(result.finish())

    post_account = request.POST.get('account')
    post_password = request.POST.get('password')

    user = User.objects.filter(account=post_account)
    if not len(user):
        result.state('Wrong Account Or Password')
        return HttpResponse(result.finish())
    if user[0].password != post_password:
        result.state('Wrong Account Or Password')
        return HttpResponse(result.finish())

    request.session['user_id'] = user[0].id
    print(request.session['user_id'])
    result.succeed()
    return HttpResponse(result.finish())

def get_file_names(request):
    return

#获取用户保存的表格名
@csrf_exempt
def get_sheets_names(request):
    result = Result()
    if not _session_detect(request):
        result.not_log()
        return HttpResponse(result.finish())
    user_id = request.session['user_id']
    sheets = Sheet.objects.filter(userid=user_id)
    sheets_name = []
    for sheet in sheets:
        sheet_object = { 'id':sheet.id, 'sheet_name':sheet.sheetname, 'file_name':sheet.filename}
        sheets_name.append(sheet_object)
    result.set('result',sheets_name)
    result.succeed()
    result.set('user',user_id)
    return HttpResponse(result.finish())

#获取表格列名
@csrf_exempt
def get_sheet_columns(request):
    result = Result()
    if not _session_detect(request):
        result.not_log()
        return HttpResponse(result.finish())
    if not _post_detect(request,['sheet_id']):
        result.post()
        return HttpResponse(result.finish())

    sheet_id = int(request.POST.get('sheet_id'))
    user_id = int(request.session['user_id'])

    state , path = _file_detect(sheet_id ,user_id)
    if state != 'Succeed':
        result.state(state)
        return HttpResponse(result.finish())

    excel = pd.ExcelFile(path)
    sheet = excel.parse(0)
    columns = sheet.columns.tolist()

    result.set_result(columns)
    result.succeed()
    return HttpResponse(result.finish())


#获取表格内容
@csrf_exempt
def get_sheet_content(request):
    result = Result()
    if not _session_detect(request):
        result.not_log()
        return HttpResponse(result.finish())
    if not _post_detect(request,['sheet_id','start_line','lines','columns','all']):
        result.post()
        return HttpResponse(result.finish())
    sheet_id = int(request.POST.get('sheet_id'))
    start_line = int(request.POST.get('start_line'))
    lines = int(request.POST.get('lines'))
    columns_json = request.POST.get('columns')
    all = int(request.POST.get('all'))

    # return HttpResponse(columns_json)

    user_id = int(request.session['user_id'])
    #获取文件路径
    state, sheet_file_path = _file_detect(sheet_id=sheet_id,user_id=user_id)
    if state != 'Succeed':
        result.state(state)
        return HttpResponse(result.finish())

    #截取内容
    excel = pd.ExcelFile(sheet_file_path)
    sheet = excel.parse(0)
    target_sheet = sheet.iloc[start_line:start_line+lines]
    if not all:
        columns = json.loads(columns_json)
        target_sheet = target_sheet[columns]

    record = target_sheet.to_records()
    record_list = record.tolist()
    columns = columns.insert(0,"index")
    record_list = record_list.insert(0,columns)

    result.set_result(json.dumps(record_list))
    result.succeed()
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

    def post(self):
        self.result['state'] = 'Missing Argument'

    def not_log(self):
        self.result['state'] = 'Not Logged In'

    def set_result(self,s):
        self.result['result'] = s


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
    sheet_number = -1
    for sheet_name in sheet_names:#遍历判空
        sheet = excel.parse(sheet_name)
        if not sheet.empty:
        #不为空保存
            file_type = name[name.rfind('.')+1:]
            newSheet = Sheet(userid=user_id,type=file_type,filename=name,sheetname=sheet_name)
            newSheet.save()
            #记录第一个sheet
            if sheet_number == -1:
                sheet_number = newSheet.id
            #保存sheet
            file_sheet_name = name[:name.rfind('.')]+'_'+sheet_name+'.'+file_type
            sheet_path = os.path.join(file_dir_path,file_sheet_name)
            sheet.to_excel(sheet_path,sheet_name=sheet_name,index=True,header=True)
    return sheet_number

#保存csv文件
def _save_csv(request,file,name):
    return

#检测并获取文件路径
def _file_detect(sheet_id,user_id):
    state ='Succeed'
    path = ''
    sheet_info = Sheet.objects.filter(id=sheet_id)
    if not len(sheet_info):
        state ='Wrong Id'
        return state,path
    sheet_info = sheet_info[0]
    if sheet_info.userid != user_id:
        state ='Wrong Id'
        return state,path
    # 取表
    sheet_file_path = os.path.join(settings.SAVED_FILE_PATH, str(user_id), sheet_info.filename)
    if not os.path.exists(sheet_file_path):
        state ='Can\'t Find Path'
        return state,path
    sheet_file_name = sheet_info.filename[:sheet_info.filename.rfind('.')] + '_' + sheet_info.sheetname + \
                      sheet_info.filename[sheet_info.filename.rfind('.'):]
    sheet_file_path = os.path.join(sheet_file_path, sheet_file_name)
    path = sheet_file_path
    if not os.path.isfile(sheet_file_path):
        state = 'Can\'t Find File'
    return state,path




def _post_detect(request,paras):
    for item in paras:
        x = request.POST.get(item)
        print("Post Argument:")
        print(item+' ',end='')
        print(x)
        if not x:
            return False
    return True

def _session_detect(request):
    request.session['user_id']=1
    if not request.session.get('user_id'):
        return False
    return True

#------------------------------------------------SubFunc Part---------------------------------------------#


#--------------------------------------------------Test Part----------------------------------------------#
#用于生成测试用例
@csrf_exempt
def _new_user(request):
    account = request.POST.get('account')
    password = request.POST.get('password')
    # new_user = User(account=account,password=password)
    # new_user.save()
    return HttpResponse(account)

#用于登录到测试用例
@csrf_exempt
def _log_in(request):
    id = request.POST.get('id')
    request.session['user_id']=int(id)
    return HttpResponse('success')

#用于测试post
@csrf_exempt
def post_test(request):
    data = request.POST.get('a')
    print(data)
    print(request.POST)
    return HttpResponse(data)

def test(request):
    return render(request,"test.html")
#--------------------------------------------------Test Part----------------------------------------------#

