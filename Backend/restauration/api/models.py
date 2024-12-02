from datetime import date
import os
from django.db import models,transaction
from django.urls import reverse
import qrcode
from io import BytesIO
from django.core.files.base import ContentFile

from restauration import settings
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
    name = models.CharField(max_length=50, blank=False)
    date_of_change = models.DateField(auto_now=True)
    dishes = models.ManyToManyField(Dish, related_name='dishes')
    drinks = models.ManyToManyField(Drink, related_name='drinks')
    active = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name}'
    
    def save(self,*args,**kwargs):
        with transaction.atomic():
            if self.active:
                old_menu = Menu.objects.filter(active=True).exclude(pk=self.pk).first()
                if old_menu:
                    old_menu.active = False
                    old_menu.save()


        super().save(*args, **kwargs)

    
    class Meta:
        ordering = ['-date_of_change']
    

# Tables for one Restoration
class Table(models.Model):
    id_table = models.AutoField(primary_key=True, unique=True)
    qr_code = models.ImageField(blank=True, upload_to='qr_codes')

    def __str__(self):
        return f'Table - {self.id_table}'
    
    def save(self, *args, **kwargs):
        
        super().save(*args, **kwargs)
        
        # Generuj URL dla tabeli
        table_url = settings.FRONT_URL + '/'+ str(self.id_table) +'/'

        # Tworzenie kodu QR
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(table_url)
        qr.make(fit=True)

        # Tworzenie obrazu
        img = qr.make_image(fill_color="black", back_color="white")

        # Zapisz obraz w polu `qr_code`
        buffer = BytesIO()
        img.save(buffer)
        file_name = f"qr_code_table_{self.id_table}.png"
        self.qr_code.save(file_name, ContentFile(buffer.getvalue()), save=False)
        buffer.close()

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.qr_code:
            if os.path.isfile(self.qr_code.path):  
                os.remove(self.qr_code.path)  
        
        super().delete(*args, **kwargs)

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