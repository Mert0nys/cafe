from rest_framework.views import APIView 
from rest_framework.response import Response, render
from rest_framework.permissions import IsAuthenticated 
from rest_framework import status 
from django.views.generic import TemplateView 
from rest_framework import permissions, generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
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

class ActivateView(APIView): 
    def get(self, request, token): 
        try: 
            activation = Activation.objects.get(token=token) 
            activation.is_active = True 
            activation.user.is_active = True 
            activation.user.save() 
            activation.save()
            
            # Редирект на страницу подтверждения
            return HttpResponseRedirect('https://mert0nys-cafe-c2cd.twc1.net/')  # Замените на ваш URL React приложения
            
        except Activation.DoesNotExist: 
            return Response({"error": "Invalid token!"}, status=status.HTTP_400_BAD_REQUEST)

User = get_user_model()

class HomeView(APIView): 
    permission_classes = (IsAuthenticated,) 

    def get(self, request): 
        # Исправлено форматирование строки для корректного отображения имени пользователя
        content = {"message": f"welcome to page {request.user}"}
        return Response(content) 

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({"message": "Successfully logged out."}, status=204)
        except Exception as e:
            print(f"Error during logout: {e}")
            return Response({"error": "Logout failed."}, status=400)

class HomePageView(TemplateView): 
   def my_view(request):
    if request.method == "POST":
        # Обработка данных формы
        pass
    return render(request, 'index.html')

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ProductViewSet(viewsets.ModelViewSet):
        queryset = Product.objects.all()
        serializer_class = ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
        queryset = Category.objects.all()
        serializer_class = CategorySerializer