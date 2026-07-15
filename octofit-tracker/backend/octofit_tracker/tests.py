from django.test import SimpleTestCase
from django.urls import resolve, reverse

from . import views


class OctofitUrlTests(SimpleTestCase):
    def test_root_points_to_api_root(self):
        resolver_match = resolve('/')

        self.assertEqual(resolver_match.func, views.api_root)

    def test_api_root_route_is_present(self):
        self.assertEqual(reverse('api_root'), '/')

    def test_collection_routes_are_present(self):
        expected_routes = {
            'users': '/api/users/',
            'teams': '/api/teams/',
            'activities': '/api/activities/',
            'leaderboard': '/api/leaderboard/',
            'workouts': '/api/workouts/',
        }

        for route_name, route_path in expected_routes.items():
            with self.subTest(route_name=route_name):
                self.assertEqual(reverse(route_name), route_path)