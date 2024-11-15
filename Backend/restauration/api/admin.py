from django.contrib import admin
from .models import Menu, Table, Waiter,Bill, Guest, Dish, Drink, Allergen
# Register your models here.

admin.site.register(Menu)
admin.site.register(Table)
admin.site.register(Waiter)
admin.site.register(Bill)
admin.site.register(Guest)
admin.site.register(Drink)
admin.site.register(Dish)
admin.site.register(Allergen)