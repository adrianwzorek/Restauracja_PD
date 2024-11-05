from rest_framework import serializers
from .models import Menu, Table, Waiter, Waiter_has_Table, Bill, Guest, Dish, Drink, Bill_has_Dish, Bill_has_Drink
# Models serializers

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'

class WaiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waiter
        fields = '__all__'

class Waiter_has_TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waiter_has_Table
        fields = '__all__'

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = '__all__'

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = '__all__'

class Bill_has_DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill_has_Dish
        fields = '__all__'

class Bill_has_DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill_has_Drink
        fields = '__all__'
