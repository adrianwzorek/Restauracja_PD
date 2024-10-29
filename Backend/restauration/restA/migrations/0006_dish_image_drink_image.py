# Generated by Django 5.1.2 on 2024-10-29 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restA', '0005_table_menu_id_menu'),
    ]

    operations = [
        migrations.AddField(
            model_name='dish',
            name='Image',
            field=models.ImageField(blank=True, upload_to='dish_pic/'),
        ),
        migrations.AddField(
            model_name='drink',
            name='Image',
            field=models.ImageField(blank=True, null=True, upload_to='drink_pic/'),
        ),
    ]
