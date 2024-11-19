from django.contrib import admin
from .models import Bill, Guest
# Register your models here.

admin.site.register([Bill,Guest])