from rest_framework import serializers


class MongoDocumentSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)


class UserSerializer(MongoDocumentSerializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    displayName = serializers.CharField()
    age = serializers.IntegerField()
    fitnessGoal = serializers.CharField()
    team = serializers.CharField()


class TeamSerializer(MongoDocumentSerializer):
    name = serializers.CharField()
    mascot = serializers.CharField()
    coach = serializers.CharField()
    members = serializers.ListField(child=serializers.CharField())
    weeklyGoalMinutes = serializers.IntegerField()


class ActivitySerializer(MongoDocumentSerializer):
    username = serializers.CharField()
    activityType = serializers.CharField()
    durationMinutes = serializers.IntegerField()
    caloriesBurned = serializers.IntegerField()
    activityDate = serializers.DateTimeField()
    notes = serializers.CharField()


class LeaderboardSerializer(MongoDocumentSerializer):
    username = serializers.CharField()
    team = serializers.CharField()
    rank = serializers.IntegerField()
    totalMinutes = serializers.IntegerField()
    totalCalories = serializers.IntegerField()
    points = serializers.IntegerField()


class WorkoutSerializer(MongoDocumentSerializer):
    name = serializers.CharField()
    category = serializers.CharField()
    difficulty = serializers.CharField()
    durationMinutes = serializers.IntegerField()
    targetMuscles = serializers.ListField(child=serializers.CharField())
    instructions = serializers.CharField()