from rest_framework.views import APIView  
from rest_framework.response import Response  
from rest_framework.permissions import IsAuthenticated  
from rest_framework import status, generics, viewsets 
from rest_framework_simplejwt.tokens import RefreshToken 
from django.contrib.auth import get_user_model 
from django.core.mail import send_mail 
from django.shortcuts import render, get_object_or_404 
from django.http import HttpResponseRedirect 
from .models import Product, Reservation, Category, Activation 
from .serializers import ProductSerializer, LoginSerializer, ReservationSerializer, UserRegistrationSerializer, CategorySerializer 
import secrets 
from django.views import View
from rest_framework.permissions import AllowAny 
import logging 

# Настройка логирования
logger = logging.getLogger(__name__)

class UserRegistrationView(generics.CreateAPIView): 
    serializer_class = UserRegistrationSerializer 

    def perform_create(self, serializer): 
        user = serializer.save() 
        token = secrets.token_urlsafe(32) 
        Activation.objects.create(user=user, token=token) 
        
        try:
            send_mail( 
                'Активация вашего аккаунта', 
                f'Активируйте аккаунт перейдя по ссылке: https://mert0nys-cafe-e5e5.twc1.net/activate/{token}/', 
                'from@example.com', 
                [user.email], 
                fail_silently=False, 
            )
        except Exception as e:
            logger.error(f"Error sending activation email: {e}")

class LoginView(APIView): 
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
        activation = get_object_or_404(Activation, token=token)
        
        if activation.is_active:
            return Response({"error": "Account already activated!"}, status=status.HTTP_400_BAD_REQUEST)

        activation.is_active = True  
        activation.user.is_active = True  
        activation.user.save()  
        activation.save() 
        
        return HttpResponseRedirect('https://mert0nys-cafe-e5e5.twc1.net')  # Замените на ваш URL React приложения 

User = get_user_model() 

class HomeViews(APIView):  
    permission_classes = (IsAuthenticated,)  

    def get(self, request):  
        content = {"message": f"welcome to page {request.user}"} 
        return Response(content)  

class LogoutView(APIView): 
    permission_classes = [IsAuthenticated] 

    def post(self, request): 
        try: 
            request.user.auth_token.delete() 
            return Response({"message": "Successfully logged out."}, status=204) 
        except Exception as e: 
            logger.error(f"Error during logout: {e}") 
            return Response({"error": "Logout failed."}, status=400) 

class HomeView(View): 
    template_name = 'index.html'
    def get(self, request): 
        return render(request, self.template_name) 

class ReservationViewSet(viewsets.ModelViewSet): 
    queryset = Reservation.objects.all() 
    serializer_class = ReservationSerializer 

class ProductViewSet(viewsets.ModelViewSet): 
    queryset = Product.objects.all() 
    serializer_class = ProductSerializer 

class CategoryViewSet(viewsets.ModelViewSet): 
    queryset = Category.objects.all() 
    serializer_class = CategorySerializer
