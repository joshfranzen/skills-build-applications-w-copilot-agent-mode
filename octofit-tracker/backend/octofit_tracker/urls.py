from django.conf import settings
from django.urls import path, reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import views


def api_base_url(request):
    if settings.CODESPACE_BACKEND_HOST:
        return f'https://{settings.CODESPACE_BACKEND_HOST}'

    return request.build_absolute_uri('/').rstrip('/')


@api_view(['GET'])
def api_root(request):
    base_url = api_base_url(request)
    return Response(
        {
            'users': f'{base_url}{reverse("users")}',
            'teams': f'{base_url}{reverse("teams")}',
            'activities': f'{base_url}{reverse("activities")}',
            'leaderboard': f'{base_url}{reverse("leaderboard")}',
            'workouts': f'{base_url}{reverse("workouts")}',
        }
    )


views.api_root = api_root

urlpatterns = [
    path('', views.api_root, name='api_root'),
    path('api/', views.api_root, name='api'),
    path('api/users/', views.users, name='users'),
    path('api/teams/', views.teams, name='teams'),
    path('api/activities/', views.activities, name='activities'),
    path('api/leaderboard/', views.leaderboard, name='leaderboard'),
    path('api/workouts/', views.workouts, name='workouts'),
]