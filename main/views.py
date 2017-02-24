from django.http import Http404
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from .models import User, Team
from .serializers import UserSerializer, TeamSerializer

class UserList(APIView):


    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetails(APIView):

    
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        """
            retrieve a single user providing id 
            when id == 'i' returns current user data

        """
        if pk == 'i':
            if request.user.is_anonymous():
                return Response(['Anon'], status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(UserSerializer(request.user,
                                                context={'request': request}).data)

        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
           create new user 
        """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None): 
        """
           update existing user 
        """
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeamList(APIView):


    def get(self, request, format=None):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeamDetails(APIView):
    

    def get_object(self, pk):
        try:
            return Team.objects.get(pk=pk)
        except Team.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        """
            retrieve a single Team
        """
        team = self.get_object(pk)
        serializer = TeamSerializer(team)
        return Respon(serializer.data)

    def post(self, request, format=None):
        """
            create new Team
        """

        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def verify_me(request):
    user = request.user
    code = request.GET['code'] or None
    if code and code == str(user.verification_code)[:8]:
        data = {'verified': True}
        user = UserSerializer(user, data=data)
        ipdb.set_trace()          ############################## Breakpoint ##############################
        if user.is_valid():
            return Response(user.data)


def verify_mail(request):
    """
        this view acts as an email for the user for prototypeing porposes
    """
    if request.method == 'GET':
        username = request.GET['username']
        user = User.objects.get(username=username)
        code = str(user.verification_code)[:8]
        messege = """
                <html>
                    <body>
                        <h2> Hello, %s .</h2>
                        <h3> This is a verification messege from i2x challenge for email: %s</h3>
                        <h3> insert this code %s in the verifyme box and submit </h3>
                    </body>
                </html>

               """%(username, user.email, code)
        return HttpResponse(messege)
        
        
    pass
