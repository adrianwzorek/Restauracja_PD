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
        fields = ['id', 'id_dish', 'id_bill', 'number']
        
    def validate_number(self, value):
        if value <= 0:
            raise serializers.ValidationError('Number needs to be positive.')
        return value

    def create(self, validated_data):
        id_dish = validated_data.get('id_dish')
        id_bill = validated_data.get('id_bill')

        # Sprawdzenie, czy BillDish już istnieje
        bill_dish = BillDish.objects.filter(id_dish=id_dish, id_bill=id_bill).first()
        if bill_dish:
            # Jeśli istnieje, zwiększ liczbę
            bill_dish.number += validated_data.get('number', 1)
            bill_dish.save()
        else:
            # Jeśli nie istnieje, utwórz nowy obiekt
            bill_dish = BillDish.objects.create(**validated_data)

        # Zaktualizuj koszt powiązanego rachunku
        bill = bill_dish.id_bill
        bill.calculate_cost()

        return bill_dish

    def update(self, instance, validated_data):
        # Oblicz poprzedni koszt
        old_cost = instance.cost()

        # Zaktualizuj liczbę
        instance.number = validated_data.get('number', instance.number)
        instance.save()

        # Zaktualizuj koszt powiązanego rachunku
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
        id_bill = validated_data.get('id_bill')
        id_drink = validated_data.get('id_drink')
        bill_drink = BillDrink.objects.filter(id_bill=id_bill, id_drink=id_drink).first()
        if bill_drink:
            bill_drink.number+=validated_data.get('number')
            bill_drink.save()
        else:
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