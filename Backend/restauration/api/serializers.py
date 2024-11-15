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
    
class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

    def validate_full_cost(self, value):
        if value >= 0:
            raise serializers.ValidationError('Sum need to be positive')
        return value
    # TODO
    # def validate_date(self, value):

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = '__all__'