from django.db import models
from rest_framework.permissions import BasePermission
from api.models import Table, Dish, Drink
from django.contrib.auth.models import User
# Create your models here.

class IsOwnerOfOrder(BasePermission):
    def has_object_permission(self, request, view, obj):
        guest = getattr(request,'guest',None)
        return obj.guest == guest
    
# The Bill from one Table
class Bill(models.Model):
    id_bill = models.AutoField(primary_key=True, unique=True)
    table = models.ForeignKey(Table,on_delete=models.CASCADE)
    full_cost = models.FloatField(default=0)
    date = models.DateField(auto_now=True)
    dishes = models.ManyToManyField(Dish, related_name='buy_dishes', blank=True)
    drinks = models.ManyToManyField(Drink, related_name='buy_drinks', blank=True)

    def __str__(self):
        return f'Bill - {self.id_bill} | {self.full_cost}zł'
    
# Guest who came to the Restaurant and take a seat in one Table
class Guest(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    id_guest = models.AutoField(primary_key=True)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, blank=True, null=True)
    def __str__(self):
        return f'Guest - {self.id_guest} seating at table {self.table}'
        
    def save(self,*args, **kwargs):
            if not self.bill:
                new_bill = Bill.objects.create(table = self.table)
                self.bill = new_bill
            return super().save(*args,**kwargs)
