from django.conf.urls import include, url
from django.views.generic import TemplateView
from rest_framework.authtoken import views as rest_views
from main import views


urlpatterns = [
        url(r'^api/users/$', views.UserDetails.as_view()),
        url(r'^api/users/(?P<pk>[a-z0-9]+)/$', views.UserDetails.as_view()),
        url(r'^api/teams/$', views.TeamDetails.as_view()),
        url(r'^api/teams/(?P<pk>[0-9]+)/$', views.TeamDetails.as_view()),
        url(r'^api/verifyme/$', views.verify_me),
        url(r'verifymail/$', views.verify_mail),
        url(r'invite/$', views.invite_mail),
        url(r'login/$', rest_views.obtain_auth_token),
        url(r'^$', TemplateView.as_view(template_name='index.html'))
        ]


