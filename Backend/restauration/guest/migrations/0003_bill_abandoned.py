# Generated by Django 5.1.4 on 2024-12-07 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guest', '0002_bill_done'),
    ]

    operations = [
        migrations.AddField(
            model_name='bill',
            name='abandoned',
            field=models.BooleanField(default=False),
        ),
    ]