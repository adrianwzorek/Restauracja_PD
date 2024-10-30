from django.contrib import admin
from .models import Restoration, Menu, Table, Waiter, Waiter_has_Table, Bill, Guest, Dish, Drink, Bill_has_Dish, Bill_has_Drink

# Register your models here.
allModels = [Restoration,Menu, Table, Waiter, Waiter_has_Table, Bill, Dish, Drink, Guest, Bill_has_Dish, Bill_has_Drink]

for model in allModels:
    admin.site.register(model)
