======Requirements=====

- Python (2.7.x, 3.x), 
- python-pip 
- virtualenv 
- node
- npm

======Development Packages used======

1- Django 1.10 (https://docs.djangoproject.com/en/1.10/)
2- Django Rest Framework 3.5 (http://www.django-rest-framework.org/)
3- ReactJS
4- React-Router
5- webpack

======Installation=====

--Create a virtual enviroment 

$ virtualenv env 
$ source env/bin/activate

--Install the required packages as such:

$ pip install -r requirements.txt
$ npm install
$ ./node_modules/webpack/bin/webpack.js -p --config ./webpack.config.js --progress

======Project Structure====

--The project Consists of three Modules

===i2x_challenge===

--The  project module, responible for Project settings, url Routing & wsgi interface 

===main===

--The backend interface for the application.

===frontend===

--The frontend interface for the app, Which uses Vanilla react(no stores or reducers) & react-router


======Web API Referance=====

$ POST login/ --Data{username, password}

-- Returns the auth token corresponding to the user given a matching username & password 

$ GET api/users/

--Return a list of all users

$ GET api/users/{ID}

--Returns User with the matching ID

$ GET api/users/i --Header {"Authorization": "Token {AUTH_TOKEN}"}

--Returns Current User data Providing the authtoken.

$ POST api/users/ --Data {...userdata} 

--Creates a new user and generates an Auth token for said User

$ GET api/teams/

--Return a list of all Teams

$ GET api/teams/{ID}

--Returns Team with the matching ID

$ POST api/teams/ --Data {...teamdata} 

--Creates a new team.

$ GET api/verifyme/{code}  --Header {"Authorization": "Token {AUTH_TOKEN}"}

--Verifies the code against the user verification_code if it matches, set the user verified and generates a new verification_code.

$ GET api/verifyme/{code, newpass, user}

--Verifies the code against the user verification_code if it matches, set the user new password and generates a new verification_code.
   

======Heroku Deployment======

===Python Requirement===

1- White Noise 3.3 (http://www.django-rest-framework.org/)
2- Gunicorn 19.6
3- dj-database-url 0.4
4- psycopg2 2.6.2

===Database===

- Single Postgres add-on(the free tier will do)

===Build Packes===

- Make sure the heroku instance uses both NodeJS & Python BuildPacks.

===Migrations===

--Migrate the database after a successful build:

$ heroku run bash --app {appName}
$ python manage.py migrate
