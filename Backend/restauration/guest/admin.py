from django.contrib import admin
from .models import Bill, Guest,BillDish,BillDrink
# Register your models here.

admin.site.register([Bill,Guest,BillDish,BillDrink])