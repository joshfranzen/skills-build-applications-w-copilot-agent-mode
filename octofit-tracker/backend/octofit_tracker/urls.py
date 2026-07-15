from django.urls import path

from . import views

urlpatterns = [
    path('', views.api_root, name='api_root'),
    path('api/', views.api_root, name='api'),
    path('api/users/', views.users, name='users'),
    path('api/teams/', views.teams, name='teams'),
    path('api/activities/', views.activities, name='activities'),
    path('api/leaderboard/', views.leaderboard, name='leaderboard'),
    path('api/workouts/', views.workouts, name='workouts'),
]