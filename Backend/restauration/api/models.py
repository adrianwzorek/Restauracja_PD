from datetime import date
from django.db import models, transaction
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

class Waiter(models.Model):
    Id_waiter = models.AutoField(primary_key=True,null=False)
    Name = models.TextField(max_length=255)
    Surname= models.TextField(max_length=255)
    Phone_num = models.IntegerField()
    Work_start = models.DateField(default=date.today)
    def __str__(self):
        return f'{self.Name} {self.Surname}'

# Connection from Many waiters to Many Tables
class Waiter_has_table(models.Model):
    Waiter_id_waiter = models.ForeignKey(Waiter,on_delete=models.CASCADE)
    Table_id_table = models.ForeignKey(Table, on_delete=models.Case)
    Date = models.DateField(auto_now=True)
    def __str__(self):
        return f'Waiter {self.Waiter_id_waiter} has {self.Table_id_table}'

# The Bill from one Table
class Bill(models.Model):
    Id_bill = models.IntegerField(auto_created=True, primary_key=True)
    Table_id_table = models.ForeignKey(Table,on_delete=models.CASCADE)
    Full_cost = models.FloatField(default=0)
    Split = models.BooleanField(default=False)
    Date = models.DateField(auto_now=True)
    def __str__(self):
        return f'Bill - {self.Id_bill} Cost - {self.Full_cost}'

# Guest who came to the Restaurant and take a seat in one Table
class Guest(models.Model):
    Id_guest = models.AutoField(primary_key=True)
    Table_id_table = models.ForeignKey(Table, on_delete=models.CASCADE)
    Table_menu_id_menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    Bill_id_bill = models.ForeignKey(Bill, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return f'Guest - {self.Id_guest} seating at table {self.Table_id_table}'
    # TODO: Why this not workin?
    def save(self,*args, **kwargs):
        with transaction.atomic():
            if not self.Bill_id_bill:
                new_bill = Bill.objects.create(Table_id_table= self.Table_id_table)
                self.Bill_id_bill = new_bill
            super().save(*args,**kwargs)

# Dish model
class Dish(models.Model):
    Id_dish = models.AutoField(primary_key=True)
    Title = models.TextField(max_length=50, blank=False)
    Description = models.TextField(max_length=255, blank=True)
    Ingredients = models.TextField(max_length=255, blank=True)
    Modify = models.BooleanField()
    Image = models.ImageField(upload_to="dish_pic/", blank=True)
    Menu_id_menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    Cost = models.FloatField(null=False)
    Has_Gluten = models.BooleanField(default=False)
    Has_Skorupiaki = models.BooleanField(default=False)
    Has_Jaja = models.BooleanField(default=False)
    Has_Ryby = models.BooleanField(default=False)
    Has_Orzeszki = models.BooleanField(default=False)
    Has_Soja = models.BooleanField(default=False)
    Has_Laktoza = models.BooleanField(default=False)
    Has_Seler = models.BooleanField(default=False)
    Has_Gorczyca = models.BooleanField(default=False)
    Has_Sezam = models.BooleanField(default=False)
    Has_Lubin = models.BooleanField(default=False)
    Has_Mieczaki = models.BooleanField(default=False)
    Portion_weight = models.IntegerField()
    Special = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.Title}'

# Drink model
class Drink(models.Model):
    class TYPE(models.IntegerChoices):
        Normal = 0, "No Alcohol"
        Alcohol = 1, "Alcohol"
    Id_drink = models.AutoField(primary_key=True)
    Name = models.TextField(max_length=25)
    Type = models.PositiveSmallIntegerField(choices=TYPE, default=TYPE.Normal)
    Description = models.TextField(max_length=255)
    Modify = models.BooleanField(default=False)
    Cost = models.FloatField(blank=False)
    Image = models.ImageField(blank=True, null=True, upload_to="drink_pic/")
    Weight = models.IntegerField()
    Special = models.BooleanField(default=False)
    Menu_id_menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.Name}'
    
# Connection from Bill to Dishes
class Bill_has_Dish(models.Model):
    Bill_id_bill = models.ForeignKey(Bill, on_delete=models.CASCADE)
    Dish_id_dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    def __str__(self):
        return f'Bill {self.Bill_id_bill} has {self.Dish_id_dish}'

# Connection form Bill to Drink
class Bill_has_Drink(models.Model):
    Bill_id_bill = models.ForeignKey(Bill, on_delete=models.CASCADE)
    Drink_id_drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    def __str__(self):
        return f'Bill {self.Bill_id_bill} has {self.Drink_id_drink}'
