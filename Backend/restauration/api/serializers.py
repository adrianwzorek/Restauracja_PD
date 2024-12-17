from datetime import date
from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Allergen, Dish, Drink, Menu, Table, Waiter

# Models serializers

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    surname = serializers.CharField(write_only=True)
    phone_num = serializers.IntegerField(write_only=True)
    class Meta: 
        model = User
        fields =['username','password','email','name','surname','phone_num']
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        waiter_data = {
            'name':validated_data.pop('name'),
            'surname':validated_data.pop('surname'),
            'phone_num':validated_data.pop('phone_num')
        }
        user = User.objects.create_user(
            username=validated_data['username'],
            email= validated_data['email'],
            password= validated_data['password'],
            is_staff = True
        )
        Waiter.objects.create(user=user, **waiter_data)
        return user
    
class AllergenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergen
        fields = ['id','name']
    
class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['id','title','description','ingredients','image','cost',
                'portion_weight','special','has_allergen']

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
        fields = ['id','name','type','description','cost','image','weight','special']
    
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
        fields = ['id','name','date_of_change','dishes','drinks','active']        

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id']


class WaiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waiter
        fields = ['id','name','surname','phone_num','work_start','has_table']

    def validate_phone_num(self, value):
        if len(str(value))!=9:
            raise serializers.ValidationError('Phone number need to have 9 digits')
        return value
    
    def validate_work_start(self, value):
        if value < date(2000,1,1):
            raise serializers.ValidationError("Date need to be after 2000|1|1")
        if value > date.today():
            raise serializers.ValidationError("Date can't be in the future")
        return value
