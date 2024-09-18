from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated 
from rest_framework import status 
from django.views.generic import TemplateView 
from rest_framework import permissions, generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from django.shortcuts import render
from django.utils.http import urlsafe_base64_decode
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework.decorators import api_view
from .models import Product,User, Reservation, Category, Activation
from .serializers import ProductSerializer, LoginSerializer, ReservationSerializer, UserRegistrationSerializer, CategorySerializer
from django.http import JsonResponse
import secrets
from django.http import HttpResponseRedirect

#register(Регистрация)
class Registration(TemplateView):
    def get(self, request): 
        return render(request, 'index.html')
    
class UserRegistrationView(generics.CreateAPIView):
       serializer_class = UserRegistrationSerializer
       def perform_create(self, serializer):
           user = serializer.save()
           token = secrets.token_urlsafe(32)
           Activation.objects.create(user=user, token=token)
           send_mail(
               'Activate your account',
               f'Activate your account by clicking this link: https://mert0nys-cafe-c2cd.twc1.net/activate/{token}/',
               'from@example.com',
               [user.email],
               fail_silently=False,
           )

#login(Вход)
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    
class Login(TemplateView):
    def get(self, request): 
        return render(request, 'index.html')

#Activate(Активация)
class ActivateView(APIView): 
    def get(self, request, token): 
        try: 
            activation = Activation.objects.get(token=token) 
            activation.is_active = True 
            activation.user.is_active = True 
            activation.user.save() 
            activation.save()
            return HttpResponseRedirect('https://mert0nys-cafe-c2cd.twc1.net/')
        except Activation.DoesNotExist: 
            return Response({"error": "Invalid token!"}, status=status.HTTP_400_BAD_REQUEST)

User = get_user_model()

#Menu(Меню)
class Menu(TemplateView):
     def get(self, request): 
        return render(request, 'index.html')
     
class MenuView(APIView):
    def get(self, request):
        menu_items = Product.objects.all()
        serializer = ProductSerializer(menu_items, many=True)
        return Response(serializer.data) # Передаем данные в шаблон

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({"message": "Successfully logged out."}, status=204)
        except Exception as e:
            print(f"Error during logout: {e}")
            return Response({"error": "Logout failed."}, status=400)

class HomeView(TemplateView): 
    template_name = 'index.html'
    def get(self, request):
         return render(request, self.template_name)  # Убедитесь, что файл index.html существует в вашем шаблоне

#Phone(Бронирование)
class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer



class CategoryViewSet(viewsets.ModelViewSet):
        queryset = Category.objects.all()
        serializer_class = CategorySerializer