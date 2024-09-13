from rest_framework import serializers
from .models import Reservation, User, Product, Category
from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['name', 'phone']

    def validate_phone_number(self, value):
        # Пример валидации: номер телефона должен содержать только цифры
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits.")
        return value

class UserRegistrationSerializer(serializers.ModelSerializer):
       class Meta:
           model = User
           fields = ['username', 'email', 'password']

       def create(self, validated_data):
           user = User(**validated_data)
           user.set_password(validated_data['password'])
           user.save()
           return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user is None:
            raise serializers.ValidationError('Invalid credentials')
        return user
    
    
class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField()  # Принимаем строку

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'image', 'category']

    def create(self, validated_data):
        category_name = validated_data.pop('category')
        category, created = Category.objects.get_or_create(name=category_name)  # Получаем или создаем категорию
        product = Product.objects.create(category=category, **validated_data)
        return product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
            model = Category
            fields = ['name']



    