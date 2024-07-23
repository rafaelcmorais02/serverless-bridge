from django.urls import path
from domains import views

urlpatterns = [
    path('', views.ExampleView.as_view()),
]
