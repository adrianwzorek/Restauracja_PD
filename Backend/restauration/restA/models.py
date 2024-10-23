from django.db import models
from datetime import date
# Create your models here.

# Restoration 
class Restoration(models.Model):
    id_Restoration = models.AutoField(primary_key=True, unique=True)
    Name = models.CharField(max_length=255)
    Number_of_tables = models.IntegerField()

# Tables for one Restoration
class Table(models.Model):
    id_table = models.AutoField(primary_key=True, unique=True)
    Number_of_seats = models.IntegerField()
    Restoration_idRestoration = models.ForeignKey(Restoration, on_delete=models.CASCADE)
    # Menu_Id_Menu = models.ForeignKey(on_delete=models.CASCADE)

# All possibility menu from Restoration 
class Menu(models.Model):
    Id_Menu = models.AutoField(primary_key=True, unique=True)
    Date_of_change = models.DateField(auto_now=True)
    Restoration_idRestoration = models.ForeignKey(Restoration, on_delete=models.CASCADE)

# All waiters who work in this Restoration
class Waiter(models.Model):
    Id_waiter = models.AutoField(primary_key=True,null=False)
    Name = models.TextField(max_length=255)
    Surname= models.TextField(max_length=255)
    Phone_num = models.IntegerField()
    Work_start = models.DateField(default=date.today)
    Restoration_idRestoration = models.ForeignKey(Restoration, on_delete=models.CASCADE)
