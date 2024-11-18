from datetime import date
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Allergen, Dish, Drink, Menu, Table, Waiter, Bill, Guest

# Models serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields =['id','username','password']
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class AllergenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergen
        fields = ['id_allergen','name']
    
class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

    def validate_weight(self, value):
        if value <=0:
            raise serializers.ValidationError('Weight need to be positive')
        return value
    
    def validate_cost(self, value):
        if value <= 0:
            raise serializers.ValidationError('Cost need to be positive')
        return value

class DrinkSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Drink
        fields = '__all__'
    
    def validate_cost(self, value):
        if value <= 0:
            raise serializers.ValidationError('Cost need to be positive')
        return value
    
    def validate_weight(self, value):
        if value <=0:
            raise serializers.ValidationError('Weight need to be positive')
        return value

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id_table','menu']

class WaiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waiter
        fields = '__all__'

    def validate_phone_num(self, value):
        if len(value)!=9:
            raise serializers.ValidationError('Phone number need to have 9 digits')
        return value
    
    def validate_work_start(self, value):
        if value < date(2000,1,1):
            raise serializers.ValidationError("Date need to be after 2000|1|1")
        if value > date.today():
            raise serializers.ValidationError("Date can't be in the future")
        return value

    
class BillSerializer(serializers.ModelSerializer):
    dishes = serializers.PrimaryKeyRelatedField(
        queryset = Dish.objects.all(),
        many = True,
        required = False
    )
    drinks = serializers.PrimaryKeyRelatedField(
        queryset = Drink.objects.all(),
        many = True,
        required = False
    )
    class Meta:
        model = Bill
        fields = ['id_bill', 'table', 'full_cost', 'date', 'dishes', 'drinks']

    def update(self, instance, validated_data):
        dishes = validated_data.pop('dishes',[])
        drinks = validated_data.pop('drinks', [])
        instance.dishes.add(*dishes)
        instance.drinks.add(*drinks)
        instance.full_cost = sum(d.cost for d in instance.dishes.all()) + sum(d.cost for d in instance.drinks.all())
        instance.save()
        return instance


class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = '__all__'