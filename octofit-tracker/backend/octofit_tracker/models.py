from django.conf import settings
from pymongo import MongoClient


class OctofitCollection:
    USERS = 'users'
    TEAMS = 'teams'
    ACTIVITIES = 'activities'
    LEADERBOARD = 'leaderboards'
    WORKOUTS = 'workouts'


def get_database():
    client = MongoClient(settings.MONGODB_URI)
    return client[settings.MONGODB_DB_NAME]


def get_collection(collection_name):
    return get_database()[collection_name]