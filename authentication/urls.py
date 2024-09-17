from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt import views as jwt_views
from .views import *
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r'reservations', ReservationViewSet)



urlpatterns = [
    path('api/home/',HomeView.as_view(), name='home'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/bron/', include(router.urls)),
    path('api/register/', UserRegistrationView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('activate/<str:token>/', ActivateView.as_view(), name='activate'),
    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)