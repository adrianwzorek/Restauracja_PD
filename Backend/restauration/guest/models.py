from django.db import models
from api.models import Table, Dish, Drink
    
# ? The Bill from one Table

class Bill(models.Model):
    id = models.AutoField(primary_key=True)
    table = models.ForeignKey(Table,on_delete=models.CASCADE)
    full_cost = models.DecimalField(default=0,decimal_places=2, max_digits=10)
    date = models.DateField(auto_now=True)
    done = models.BooleanField(default=False)
    abandoned = models.BooleanField(default=False) 
    
    def __str__(self):
        return f'Bill - {self.id} | {self.full_cost}zł'

    def calculate_cost(self):
        self.full_cost = (
            sum(item.cost() for item in self.bill_dish.all()) +
            sum(item.cost() for item in self.bill_drink.all())
        )
        self.save()

    def check_items(self, *args,**kwargs):
        if all(bill_dish.out for bill_dish in self.bill_dish.all()) and all(bill_drink.out for bill_drink in self.bill_drink.all()):
            if not self.abandoned:
               self.done = True
        super().save(*args,**kwargs)
    

# ? Guest who came to the Restaurant and take a seat in one Table
class Guest(models.Model):
    id = models.AutoField(primary_key=True)
    table = models.ForeignKey(Table, on_delete=models.CASCADE,related_name='guest')
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, blank=True, null=True)
    date_came = models.DateField(auto_now=True)
    wait = models.BooleanField(default=False)
    def __str__(self):
        return f'Guest - {self.id} seating at table {self.table}'
        
    def save(self,*args, **kwargs):
            if not self.bill:
                new_bill = Bill.objects.create(table = self.table)
                self.bill = new_bill
            return super().save(*args,**kwargs)

# ? Number of Dish in Bill  

class BillDish(models.Model):
    id = models.AutoField(primary_key=True)
    id_dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    id_bill = models.ForeignKey(Bill,related_name='bill_dish', on_delete=models.CASCADE)
    number = models.IntegerField(default=1)
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE)
    isReady = models.BooleanField()
    
    def __str__(self):
        return f'{self.id_bill} num - {self.id_dish.cost*self.number}' 

    def cost(self):
        return self.id_dish.cost * self.number

# ? Number of Drinks in Bill

class BillDrink(models.Model):
    id = models.AutoField(primary_key=True)
    id_drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    id_bill = models.ForeignKey(Bill,related_name='bill_drink' ,on_delete=models.CASCADE)
    number = models.IntegerField(default=1)
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE)
    isReady = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.id_bill} - {self.id_drink.cost*self.number}' 
    
    def cost(self):
        return self.id_drink.cost*self.number
