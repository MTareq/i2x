import pytest
from mixer.backend.django import mixer
pytestmark = pytest.mark.django_db

class TestUser:
    def test_model(self):
        user = mixer.blend('main.User')
        assert user.pk == 1, 'Initial user should be created and have 1 as id'
