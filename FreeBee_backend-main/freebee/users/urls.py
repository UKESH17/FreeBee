from django.urls import path

from . import views

urlpatterns = [ 
    path('login_api/', views.LoginAPI.as_view()),
    path('signup_api/', views.SignupAPI.as_view()),
]