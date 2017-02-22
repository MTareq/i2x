import React from 'react';
import ReactDOM from 'react-dom';
import auth from './auth.jsx';
import { Router, Route, hashHistory, Link, IndexRoute} from 'react-router';


class App extends React.Component{
    
    constructor(props) {
    super(props);
        this.state = {
            loggedIn: false
        }
    }
    handleLogout(e){
        auth.logout();
        hashHistory.push('/home');
    }
    render(){
        return(
            <div class="container-fluid">
                <div class="navbar navbar-default">
                    <Link class="btn btn-default" to="/">Home</Link>
                    <Link class="btn btn-default" to="user">User</Link>
                    <Link class="btn btn-default" to="team">Team</Link>
                    <button class="btn btn-danger" onClick={this.handleLogout}>Log out</button>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
                    </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    };
}

class Home extends React.Component{
    constructor(props) {
		super(props);
        this.state={username:'', pass:'', email:'', firstname:'', lastname:''}
    }

    render(){
        return (
            <div>
                <Login />
                <Register />
            </div>
        )
    }
}

class Register extends React.Component{
    handleNew(e){
        let data = {
            method: 'post',  
            headers: {  
                      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
            },  
            body: encodeObject({
                username:this.refs.username.value,
                password:this.refs.pass.value, 
                email:this.refs.email.value,
                firstname:this.refs.firstName.value,
                lastname: this.refs.lastName.value
            })
          }
        console.log(data)

        fetch('/api/users/', data)
            .then((res)=> {
                            if(res.status !== 200){
                                console.log(res.json())
                            }else{
                                auth.login(this.refs.username.value, this.refs.pass.value, (loggedIn) => {
                                    if (loggedIn) {
                                        hashHistory.push('/user')
                                    }
                                })
                            }
            })
            .catch(function (error) {  console.log('Request failed', error);  });
    }
    render(){
        return (
                <form onSubmit={this.handleNew.bind(this)}>
                    <ul>
                        <li><input type="text" placeholder="username" ref="username"/></li>
                        <li><input type="password" placeholder="password" ref="pass"/></li>
                        <li><input type="email" placeholder="email" ref="email"/></li>
                        <li><input type="text" placeholder="first name" ref="firstName"/></li>
                        <li><input type="text" placeholder="Last name" ref="lastName"/></li>
                       <button class="btn btn-primary" type="submit">Register</button>
                    </ul>
                </form>
        )
    }
}

class Login extends React.Component{
    constructor(props) {
		super(props);
        this.state={username:'', pass:''}
    }

    handleLogin(e){
		e.preventDefault()

        var username = this.refs.username.value
        var pass = this.refs.pass.value

        auth.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                hashHistory.push('/user')
            }
        })
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleLogin.bind(this)}>
                    <ul>
                        <li><input type="text" placeholder="username" ref="username" /></li>
                        <li><input type="password" placeholder="password" ref="pass" /></li>
                    <button class="btn btn-primary" type="submit">Login</button>
                    </ul>
                </form>
            </div>
        )
    }


}

class User extends React.Component{
    constructor(props) {
    super(props);
    }
    render(){
        return(
            <div>Hello user</div>
        )
    }
}
class Team extends React.Component{
    constructor(props) {
    super(props);
    }
    render(){
        return(
            <div>Hello team</div>
        )
    }
}

const root = document.getElementById('root');

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/home',
      state: { nextPathname: 'user' }
    })
      alert('You are not logged in')

  }
}

function encodeObject(params){
    return Object.keys(params).map((key) => { return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]); }).join('&');
}


ReactDOM.render(<Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home}></IndexRoute>
                        <Route path="home" component={Home}></Route>
                        <Route path="user" component={User} onEnter={requireAuth}></Route>
                        <Route path="team" component={Team} onEnter={requireAuth}></Route>
                    </Route>
                </Router>, root);
