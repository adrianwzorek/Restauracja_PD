from django.contrib import admin
from .models import Bill, Guest,BillDish,BillDrink
# Register your models here.

# admin.site.register([Bill,Guest,BillDish,BillDrink])
# from .models import Bill, BillDish, BillDrink, Guest

@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    list_display = ('id', 'table', 'full_cost', 'done', 'abandoned', 'date')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        obj.calculate_cost()  

@admin.register(BillDish)
class BillDishAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_dish', 'id_bill', 'number')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)  
        obj.id_bill.calculate_cost()  

@admin.register(BillDrink)
class BillDrinkAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_drink', 'id_bill', 'number')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)  
        obj.id_bill.calculate_cost()  

@admin.register(Guest)
class GuestAdmin(admin.ModelAdmin):
    list_display = ('id', 'table', 'bill', 'date_came')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)  
        if obj.bill:
            obj.bill.calculate_cost()  