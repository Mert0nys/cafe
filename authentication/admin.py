from django.contrib import admin
from authentication.models import User, Reservation, Product, Category, Activation

# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('category',)

class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}  # Автоматическое заполнение поля slug

class PhoneAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone')

class ActivateAdmin(admin.ModelAdmin):
    list_display = ('user', 'token')





admin.site.register(User)
admin.site.register(Reservation, PhoneAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Activation, ActivateAdmin)


