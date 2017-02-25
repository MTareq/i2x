from django.http import Http404
from django.http import HttpResponse
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, Team
from .serializers import UserSerializer, TeamSerializer

class UserDetails(APIView):

    
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk=None, format=None):
        """
            Retrieve a single user providing id.
            When id == 'i' returns current user data
            When no ID provided returns a list of all the Users.

        """
        if pk == 'i':
            if request.user.is_anonymous():
                return Response(['Anon, i Dont know you'], status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(UserSerializer(request.user, context={'request': request}).data)
        elif pk:
            user = self.get_object(pk)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        """
           Creates new user.
        """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeamDetails(APIView):
    

    def get_object(self, pk):
        try:
            return Team.objects.get(pk=pk)
        except Team.DoesNotExist:
            raise Http404

    def get(self, request, pk=None, format=None):
        """
            Retrieves a single Team providing id
            When no id is provided returns a list of all the Teams.
        """
        if pk:
            team = self.get_object(pk)
            serializer = TeamSerializer(team)
            return Response(serializer.data)
        else:
            teams = Team.objects.all()
            serializer = TeamSerializer(teams, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        """
            Create new Team.
        """
        user = request.user
        name = request.data['name']
        data = {'name':name,
                'members':[user.id]}
        serializer = TeamSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def verify_me(request):
    """
        This view matches the entered verification_code to the users code and re generate a new one for other purposes,
        acts as Double usage view for password reset and email verification.
        If it recieves a newpass it will change the user password otherwise it will verify the email
    """

    user = request.user
    if user.is_anonymous:
        username = request.GET.get('user', None)
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error':'Username is not correct'}, status=status.HTTP_404_NOT_FOUND )
    code = request.GET.get('code', None)
    newpass = request.GET.get('newpass', None)
    if code and code == str(user.verification_code)[:8]:
        data = {'username':user.username, 
                'password':newpass or user.password}
        if not newpass:
            data['verified'] = True
        ser = UserSerializer(user, data=data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)


def verify_mail(request):
    """
        This view acts as an email sent for the user for prototypeing purposes.
        in Real world scenario it would return send_mail() instead of HttpResponse.
    """

    if request.method == 'GET':
        username = request.GET['username']
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise Http404
        code = str(user.verification_code)[:8]
        messege = """
                <html>
                    <body>
                        <h2> Recipient: %s, </h2>
                        <h3> Hello, %s</h3>
                        <h3> This is a verification messege from i2x challenge.</h3>
                        <h3> insert this code <span style='color:blue'>%s</span> in the verifyme box and submit </h3>
                    </body>
                </html>

               """%(user.email, user.get_full_name(), code)
        return HttpResponse(messege)

        
def invite_mail(request):
    """
        This view acts as an email sent from the user for prototypeing purposes.
        in Real world scenario it would return send_mail() instead of HttpResponse and would be authenticate the caller.
    """

    if request.method == 'GET':
        username = request.GET.get('username', None)
        email = request.GET.get('mail', None)
        user = User.objects.get(username=username)
        url = request.build_absolute_uri().replace(request.get_full_path(), '') + '/#/signup/%d'%user.team.id
        if not (user or email):
            raise Http404
        messege = """
                <html>
                    <body>
                        <h2> Recipient: %s, </h2>
                        <h3> Hello from i2x_challenge platfrom, </h3>
                        <h3> Your friend, %s has  invited you to join him in Team %s. </h3>
                        <h3> Click the link below to join him </h3>
                        <h3> <a href='%s'>Sign up<a/> </h3>
                    </body>
                </html>

               """%(email, user.get_full_name(), user.team.name, url)
        return HttpResponse(messege)
