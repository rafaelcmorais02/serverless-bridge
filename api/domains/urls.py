from django.urls import path
from domains import views

urlpatterns = [
    path('', views.TestView.as_view()),
]
