from datetime import date
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Allergen, Dish, Drink, Menu, Table, Waiter

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
    # id_dish = serializers.HyperlinkedRelatedField(view_name='dish', read_only=True)
    has_allergen = serializers.HyperlinkedRelatedField(many=True, view_name='allergens', read_only=True)
    class Meta:
        model = Dish
        fields = ['id_dish','title','description','ingredients','image','cost',
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
        fields = ['id_menu','name','date_of_change','dishes','drinks','active']        

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id_table','menu']


class WaiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waiter
        fields = ['id_waiter','name','surname','phone_num','work_start','has_table']

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

