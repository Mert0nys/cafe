from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser, User
from django.db import models

class User(AbstractUser):
       is_verified = models.BooleanField(default=False)
     
class Reservation(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)  # Для удобной URL-структуры

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/')  # Папка для хранения изображений
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Token(models.Model):
       key = models.CharField(_('Key'), max_length=40, primary_key=True)
       user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
       created = models.DateTimeField(auto_now_add=True)

       def save(self, *args, **kwargs):
           if not self.key:
               self.key = self.generate_key()
           return super(Token, self).save(*args, **kwargs)

       def generate_key(self):
           return 
    
class Activation(models.Model):
       user = models.OneToOneField(User, on_delete=models.CASCADE)
       token = models.CharField(max_length=64)
       is_active = models.BooleanField(default=False)