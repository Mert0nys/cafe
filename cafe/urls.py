"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from authentication.views import HomeView, ActivateView, MenuView, Menu, Registration, Login, About
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from authentication.views import  CategoryViewSet

router = DefaultRouter()
router.register(r'products', CategoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', Registration.as_view(), name='register' ),
    path('login/', Login.as_view(), name='login'),
    path('', include('authentication.urls')),
    path("",HomeView.as_view() ,name='home'),
    path('menu/products/', MenuView.as_view(), name='menu'),
    path('menu/', Menu.as_view(), name='menu'),
    path('about/', About.as_view(), name='About'),
    path('activate/<str:token>/', ActivateView.as_view(), name='activate')
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
