# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-10 14:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iChart', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sheet',
            name='column_types',
            field=models.CharField(default='{}', max_length=255),
        ),
    ]
