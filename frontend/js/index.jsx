import React from 'react';
import ReactDOM from 'react-dom';
import {} from './auth.jsx';
import { Router, Route, hashHistory, Link, IndexRoute} from 'react-router';


function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname:'/app/login/',
            state: {nextPathname: '/app/'}
        })
    }
}


class App extends React.Component{
    
    constructor(props) {
    super(props);
    this.state = { 'user':[] };
    }

    componentDidMount() {
        this.loadUserData()
    }

    contextTypes= {router: React.PropTypes.object.isRequired}

    logoutHandler(){
        auth.logout()
        this.context.router.replace('/')
    }

    loadUserData(){
        $.ajax({
            method: 'GET',
            url: '/api/users/i/',
            datatype: 'json',
            headers: {
                'Authorization': 'Token ' + localStorage.token
            },
            success: function(res) {
                this.setState(user: res)
            }.bind(this)
        })
    }

    render(){
        return(
            <div class="container-fluid">
                <div class="navbar navbar-default">
                    <Link class="btn btn-default" to="/">home</Link>
                    <Link class="btn btn-default" to="user">User</Link>
                    <Link class="btn btn-default" to="team">Team</Link>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        {this.props.children}
                        <div>
                            <h1>You are now logged in, {this.state.user.username}</h1>
                            <button onClick={this.logoutHandler}>Log out</button>
                        </div>
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

class Login extends React.Component{
    constructor(props) {
    super(props);
        this.refs = props;
    }

    handleSubmit(e) {
        e.preventDefault()

        var username = this.refs.username.value
        var pass = this.refs.pass.value

        auth.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                this.context.router.replace('/')
            }
        })
    }

    render(){
        return ( <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="username" ref="username" />
                <input type="password" placeholder="password" ref="pass" />
                <input type="submit" />
            </form>
        )
    }
}

class User extends React.Component{
    render(){
        return(
            <div>Hello user</div>
        )
    }
}
class Team extends React.Component{
    render(){
        return(
            <div>Hello team</div>
        )
    }
}
class NewUser extends React.Component{
    render(){
        return(
            <div>Hello world</div>
        )
    }
}


const root = document.getElementById('root');

ReactDOM.render(<Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Login}></IndexRoute>
                        <Route path="user" component={User}></Route>
                        <Route path="team" component={Team}></Route>
                        <Route path="new" component={NewUser}></Route>
                    </Route>
                </Router>, root);
