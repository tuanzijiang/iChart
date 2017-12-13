"""iChart URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from iChart import views


urlpatterns = [
    url(r"^post_test$",views.post_test),
    url(r"^login$",views._log_in),
    url(r"^sign_up$", views._new_user),
    url(r"^upload$",views.upload_file),
    url(r"^test$", views.test),
    url(r"^log_in$", views.log_in),
    url(r"^sheets$",views.get_sheets_names),
    url(r"^sheet_content$",views.get_sheet_content),
    url(r"^sheet_columns$", views.get_sheet_columns),
    url(r"^save_page$", views.save_page),
    url(r"^get_page$", views.get_page),
    url(r"^get_chart_content$",views.get_chart_content),
    url(r"^get_column_content$",views.get_column_content),
    url(r"^")

]
