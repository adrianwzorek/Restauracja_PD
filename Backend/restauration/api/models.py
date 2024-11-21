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
    cost = models.DecimalField(max_digits=5, decimal_places=2)
    portion_weight = models.IntegerField()
    special = models.BooleanField(default=False)
    has_allergen = models.ManyToManyField(Allergen, related_name='allergens', blank=True)
    def __str__(self):
        return f'{self.title}'
    class Meta:
        verbose_name_plural = "Dishes"

# Drink model
class Drink(models.Model):
    class TYPE(models.IntegerChoices):
        Normal = 0, "No Alcohol"
        Alcohol = 1, "Alcohol"
    id_drink = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    type = models.PositiveSmallIntegerField(choices=TYPE, default=TYPE.Normal)
    description = models.TextField(max_length=255)
    cost = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.ImageField(blank=True, null=True, upload_to="drink_pic/")
    weight = models.IntegerField()
    special = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.name}'


# All possibility menu from Restoration 
class Menu(models.Model):
    id_menu = models.AutoField(primary_key=True, unique=True)
    name = models.TextField(max_length=50, blank=False)
    date_of_change = models.DateField(auto_now=True)
    dishes = models.ManyToManyField(Dish, related_name='dishes')
    drinks = models.ManyToManyField(Drink, related_name='drinks')
    active = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name}'
    
    def save(self,*args,**kwargs):
        if self.active:
            old_menu = Menu.objects.filter(active=True).exclude(pk=self.pk).first()
            if old_menu:
                old_menu.active = False
                old_menu.save()
                
            from .models import Table
            tables = Table.objects.all()
            for table in tables:
                table.menu = self
                table.save()

        super().save(*args, **kwargs)   
    
    class Meta:
        ordering = ['-date_of_change']
    

# Tables for one Restoration
class Table(models.Model):
    id_table = models.AutoField(primary_key=True, unique=True)
    menu = models.ForeignKey(Menu, on_delete=models.SET_NULL, null=True, blank=True)
    qr_code = models.ImageField(blank=True, upload_to='qr_codes')

    def __str__(self):
        return f'Table - {self.id_table}'
    
    def save(self, *args, **kwargs):
        if not self.menu:
            self.menu = Menu.objects.get(active = True)
            super().save(*args, **kwargs)

# Waiter models
class Waiter(models.Model):
    id_waiter = models.AutoField(primary_key=True,null=False)
    name = models.CharField(max_length=255)
    surname= models.CharField(max_length=255)
    phone_num = models.IntegerField()
    work_start = models.DateField(default=date.today)
    has_table = models.ManyToManyField(Table, related_name='tables') 

    def __str__(self):
        return f'{self.name} {self.surname}'