from django.db import models

from django.dispatch import receiver

# Create your models here.

# All possibility menu from Restoration 
class Menu(models.Model):
    Id_Menu = models.AutoField(primary_key=True, unique=True)
    Name = models.TextField(max_length=50, blank=False)
    Date_of_change = models.DateField(auto_now=True)
    def __str__(self):
        return f'{self.Name}'

# Tables for one Restoration
class Table(models.Model):
    id_table = models.IntegerField(primary_key=True, unique=True)
    Menu_id_menu = models.ForeignKey(Menu, on_delete=models.CASCADE, blank=True)
    Qr_code = models.ImageField(blank=True, upload_to='qr_codes')
    def __str__(self):
        return f'Table - {self.id_table}'
    