# Generated by Django 5.1.4 on 2024-12-21 10:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guest', '0003_rename_out_billdish_isready_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='billdish',
            name='guest',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='guest.guest'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='billdrink',
            name='guest',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='guest.guest'),
            preserve_default=False,
        ),
    ]