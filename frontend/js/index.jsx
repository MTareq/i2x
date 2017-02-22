import React from 'react';
import ReactDOM from 'react-dom';
import auth from './auth.jsx';
import { Router, Route, hashHistory, Link, IndexRoute} from 'react-router';


function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/home',
      state: { nextPathname: 'user' }
    })
  }
}


class App extends React.Component{
    
    constructor(props) {
    super(props);
        this.state = {
            loggedIn: false
        }
    }
    handleLogout(e){
        auth.logout();
        this.context.router.replace('/home');
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
		let contextTypes = { router: React.PropTypes.object.isRequired };
    }

    handleLogin(e){
		e.preventDefault()

        var username = this.refs.username.value
        var pass = this.refs.pass.value
		console.log(this);

        auth.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                this.context.router.replace('/user')
            }
        })
    }
    handleNew(e){
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
                <form onSubmit={this.props.handleNew}>
                    <ul>
                        <li><input type="text" placeholder="username" ref="username"/></li>
                        <li><input type="password" placeholder="password" ref="pass"/></li>
                        <li><input type="email" placeholder="email" ref="email"/></li>
                        <li><input type="text" placeholder="first name" ref="firstName"/></li>
                        <li><input type="text" placeholder="Last name" ref="lastName"/></li>
                       <button class="btn btn-primary" type="submit">Register</button>
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

ReactDOM.render(<Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home}></IndexRoute>
                        <Route path="user" component={User} onEntre={requireAuth}></Route>
                        <Route path="team" component={Team} onEntre={requireAuth}></Route>
                    </Route>
                </Router>, root);
