from datetime import date
from django.db import models

# Create your models here.


# All allergens 
class Allergen(models.Model):
    id_allergen = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Dish model
class Dish(models.Model):
    id_dish = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=False)
    description = models.TextField(max_length=255, blank=True)
    ingredients = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="dish_pic/", blank=True)
    cost = models.FloatField(null=False)
    portion_weight = models.IntegerField()
    special = models.BooleanField(default=False)
    has_allergen = models.ManyToManyField(Allergen, related_name='allergens', blank=True)
    def __str__(self):
        return f'{self.Title}'

# Drink model
class Drink(models.Model):
    class TYPE(models.IntegerChoices):
        Normal = 0, "No Alcohol"
        Alcohol = 1, "Alcohol"
    id_drink = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    type = models.PositiveSmallIntegerField(choices=TYPE, default=TYPE.Normal)
    description = models.TextField(max_length=255)
    cost = models.FloatField(blank=False)
    image = models.ImageField(blank=True, null=True, upload_to="drink_pic/")
    weight = models.IntegerField()
    special = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.Name}'


# All possibility menu from Restoration 
class Menu(models.Model):
    id_Menu = models.AutoField(primary_key=True, unique=True)
    name = models.TextField(max_length=50, blank=False)
    date_of_change = models.DateField(auto_now=True)
    dishes = models.ManyToManyField(Dish, related_name='dishes')
    drinks = models.ManyToManyField(Drink, related_name='drinks')
    def __str__(self):
        return f'{self.Name}'

# Tables for one Restoration
class Table(models.Model):
    id_table = models.IntegerField(primary_key=True, unique=True)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    qr_code = models.ImageField(blank=True, upload_to='qr_codes')
    def __str__(self):
        return f'Table - {self.id_table}'

# Waiter models
class Waiter(models.Model):
    id_waiter = models.AutoField(primary_key=True,null=False)
    name = models.CharField(max_length=255)
    surname= models.CharField(max_length=255)
    phone_num = models.IntegerField()
    work_start = models.DateField(default=date.today)
    has_table = models.ManyToManyField(Table, related_name='tables') 

    def __str__(self):
        return f'{self.Name} {self.Surname}'
    

# The Bill from one Table
class Bill(models.Model):
    id_bill = models.AutoField(primary_key=True, unique=True)
    table = models.ForeignKey(Table,on_delete=models.CASCADE)
    full_cost = models.FloatField(default=0)
    date = models.DateField(auto_now=True)
    dishes = models.ManyToManyField(Dish, related_name='buy_dishes', blank=True)
    drinks = models.ManyToManyField(Drink, related_name='buy_drinks', blank=True)

    def __str__(self):
        return f'Bill - {self.id_bill} | {self.full_cost}zł'
    

# Guest who came to the Restaurant and take a seat in one Table
class Guest(models.Model):
    id_guest = models.AutoField(primary_key=True)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, blank=True, null=True)
    def __str__(self):
        return f'Guest - {self.id_guest} seating at table {self.table}'
    # TODO: Why this not workin?
    def save(self,*args, **kwargs):
            if not self.Bill_id_bill:
                new_bill = Bill.objects.create(table = self.table)
                self.Bill_id_bill = new_bill
            return super().save(*args,**kwargs)
