from django.contrib import admin
from .models import Menu, Table, Waiter, Waiter_has_table,Bill, Guest
# Register your models here.

admin.site.register(Menu)
admin.site.register(Table)
admin.site.register(Waiter)
admin.site.register(Waiter_has_table)
admin.site.register(Bill)
admin.site.register(Guest)