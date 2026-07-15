from bson import ObjectId
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import OctofitCollection, get_collection
from .serializers import (
    ActivitySerializer,
    LeaderboardSerializer,
    TeamSerializer,
    UserSerializer,
    WorkoutSerializer,
)


def normalize_document(document):
    normalized = dict(document)
    normalized['id'] = str(normalized.pop('_id'))
    for key, value in list(normalized.items()):
        if isinstance(value, ObjectId):
            normalized[key] = str(value)
    return normalized


def list_collection(collection_name, serializer_class, sort_field):
    documents = [
        normalize_document(document)
        for document in get_collection(collection_name).find().sort(sort_field, 1)
    ]
    serializer = serializer_class(documents, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_root(request):
    return Response(
        {
            'users': request.build_absolute_uri(reverse('users')),
            'teams': request.build_absolute_uri(reverse('teams')),
            'activities': request.build_absolute_uri(reverse('activities')),
            'leaderboard': request.build_absolute_uri(reverse('leaderboard')),
            'workouts': request.build_absolute_uri(reverse('workouts')),
        }
    )


@api_view(['GET'])
def users(request):
    return list_collection(OctofitCollection.USERS, UserSerializer, 'username')


@api_view(['GET'])
def teams(request):
    return list_collection(OctofitCollection.TEAMS, TeamSerializer, 'name')


@api_view(['GET'])
def activities(request):
    return list_collection(OctofitCollection.ACTIVITIES, ActivitySerializer, 'activityDate')


@api_view(['GET'])
def leaderboard(request):
    return list_collection(OctofitCollection.LEADERBOARD, LeaderboardSerializer, 'rank')


@api_view(['GET'])
def workouts(request):
    return list_collection(OctofitCollection.WORKOUTS, WorkoutSerializer, 'name')