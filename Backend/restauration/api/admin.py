from django.contrib import admin
from .models import Menu, Table, Waiter, Dish, Drink, Allergen
# Register your models here.

class TableAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return request.user.is_superuser
        
class MenuAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return request.user.is_superuser
        
class WaiterAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return request.user.is_superuser

class DrinkAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return request.user.is_superuser

class DishAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return request.user.is_superuser
    
class AllergenAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return request.user.is_superuser
    
admin.site.register(Table,TableAdmin)
admin.site.register(Waiter,WaiterAdmin)
admin.site.register(Menu,MenuAdmin)
admin.site.register(Dish,DishAdmin)
admin.site.register(Drink,DrinkAdmin)
admin.site.register(Allergen,AllergenAdmin)