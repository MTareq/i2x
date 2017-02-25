###Requirements

- Python (2.7.x, 3.x), 
- python-pip 
- virtualenv 
- node
- npm

###Development Packages used

1. Django 1.10 (https://docs.djangoproject.com/en/1.10/)
2. Django Rest Framework 3.5 (http://www.django-rest-framework.org/)
3. ReactJS
4. React-Router
5. webpack

###Installation

- Create a virtual enviroment 

``` bash
$ virtualenv env 
$ source env/bin/activate
```

- Install the required packages as such:

``` bash
$ pip install -r requirements.txt
$ npm install
$ ./node_modules/webpack/bin/webpack.js -p --config ./webpack.config.js --progress
```

###Project Structure

- The project Consists of three Modules

#####i2x_challenge

- The  project module, responible for Project settings, url Routing & wsgi interface 

#####main

- The backend interface for the application.

#####frontend

- The frontend interface for the app, Which uses Vanilla react(no stores or reducers) & react-router


###Web API Referance

``` bash
$ POST login/ --Data{username, password}
```

-  Returns the auth token corresponding to the user given a matching username & password 

``` bash
$ GET api/users/
```

- Return a list of all users

``` bash
$ GET api/users/{ID}
```

- Returns User with the matching ID

``` bash
$ GET api/users/i --Header {"Authorization": "Token {AUTH_TOKEN}"}
```

- Returns Current User data Providing the authtoken.

``` bash
$ POST api/users/ --Data {...userdata} 
```

- Creates a new user and generates an Auth token for said User

``` bash
$ GET api/teams/
```

- Return a list of all Teams

``` bash
$ GET api/teams/{ID}
```

- Returns Team with the matching ID

``` bash
$ POST api/teams/ --Data {...teamdata} 
```

- Creates a new team.

``` bash
$ GET api/verifyme/{code}  --Header {"Authorization": "Token {AUTH_TOKEN}"}
```

- Verifies the code against the user verification_code if it matches, set the user verified and generates a new verification_code.

``` bash
$ GET api/verifyme/{code, newpass, user}
```

- Verifies the code against the user verification_code if it matches, set the user new password and generates a new verification_code.
   

###Heroku Deployment

#####Python Requirement

- White Noise 3.3 (http://www.django-rest-framework.org/)
- Gunicorn 19.6
- dj-database-url 0.4
- psycopg2 2.6.2

#####Database

- Single Postgres add-on(the free tier will do)

#####Build Packes

- Make sure the heroku instance uses both NodeJS & Python BuildPacks.

#####Migrations

- Migrate the database after a successful build:
``` bash
$ heroku run bash --app {appName}
$ python manage.py migrate
```
