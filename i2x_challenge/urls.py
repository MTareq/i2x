from django.conf.urls import include, url
from django.views.generic import TemplateView
from rest_framework import routers
from main import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)

urlpatterns = [
        url(r'api', include(router.urls)),
        url(r'^', TemplateView.as_view(template_name='index.html'))
        ]

