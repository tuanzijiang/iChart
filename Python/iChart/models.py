from django.db import models

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True,unique=True)
    account = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

class Sheet(models.Model):
    id = models.AutoField(primary_key=True,unique=True)
    userid = models.IntegerField()
    type = models.CharField(max_length=20)
    filename = models.CharField(max_length=255)
    sheetname = models.CharField(max_length=255)
    column_types = models.TextField(max_length=65535,default="{}")

class Chart(models.Model):
    id = models.AutoField(primary_key=True,unique=True)
    name = models.CharField(max_length=255)
    sheet_id = models.IntegerField()
    type = models.CharField(max_length=255)
    info = models.TextField(max_length=65535,default="{}")
    content = models.TextField(max_length=65535,default="{}")
