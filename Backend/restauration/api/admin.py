from django.contrib import admin
from .models import Menu, Table, Waiter, Dish, Drink, Allergen
# Register your models here.

admin.site.register([Menu,Table,Waiter,Drink,Dish,Allergen])