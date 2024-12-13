from api.models import Dish
from .models import BillDish, BillDrink, Guest, Bill
from rest_framework import serializers

from api.serializers import DishSerializer, DrinkSerializer

class BillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bill
        fields = ['id', 'table', 'full_cost', 'date','done','abandoned']
        extra_kwargs = {
            "full_cost" : {'read_only':True},
            "date": {'read_only':True},
        }

    def update(self, instance, validated_data):
        instance.save()
        done = validated_data.pop('done',None)
        abandoned = validated_data.pop('abandoned',None)
        if done and abandoned:
            done = False
            abandoned = False
        if done == True:
            abandoned = False
        if abandoned == True:
            done = False
        instance.abandoned = abandoned
        instance.done = done
        instance.calculate_cost()
        instance.save()
        return instance

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ['id','table','bill','date_came']


class BillDishSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillDish
        fields = ['id','id_dish','id_bill','number']
        
    def validate_number(self, value):
        if value <= 0:
            raise serializers.ValidationError('Number need to be positive')
        return value

    def create(self, validated_data):
        # Create a new BillDish
        bill_dish = BillDish.objects.create(**validated_data)
        # Update the associated bill's cost
        bill = bill_dish.id_bill
        bill.calculate_cost()
        return bill_dish

    def update(self, instance, validated_data):
        # Calculate the old cost
        old_cost = instance.cost()

        # Update instance fields
        instance.number = validated_data.get('number', instance.number)
        instance.save()

        # Update the associated bill's cost
        bill = instance.id_bill
        bill.calculate_cost()

        return instance


class BillDrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillDrink
        fields = ['id','id_drink','id_bill','number']

    def validate_number(self, value):
        if value <=0:
            raise serializers.ValidationError('Number need to be positive')
        return value
    
    def create(self, validated_data):
        bill_drink = BillDrink.objects.create(**validated_data)
        bill = bill_drink.id_bill
        bill.calculate_cost()
        return bill_drink

    def update(self, instance, validated_data):
        old_cost = instance.cost()
        instance.number = validated_data.get('number', instance.number)
        instance.save()
        bill = instance.id_bill
        bill.calculate_cost()
        return instance