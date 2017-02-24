import React from 'react';
import { Router, Route, hashHistory, Link, IndexRoute} from 'react-router';
import AlertContainer from 'react-alert';
import utils from './utils.jsx';

export default class Login extends React.Component{
    constructor(props) {
		super(props);
    }

    handleLogin(e){
		e.preventDefault()

        var username = this.refs.username.value
        var pass = this.refs.pass.value

        utils.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                hashHistory.push('/user');
            }
        })
        this.msg.error('Wrong Username or Password');
    }
    render(){
        return (
            <div>
                <h3>Log In </h3>
                <AlertContainer ref={a => this.msg = a} {...utils.alertOptions} />
                <form onSubmit={this.handleLogin.bind(this)}>
                    <div class="form-group">
                    <input type="text" placeholder="username" ref="username" class="form-control"/>
                    </div>
                    <div class="form-group">
                    <input type="password" placeholder="password" ref="pass" class="form-control" />
                    </div>
                    <div class="form-group">
                    <button class="btn btn-primary" type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }


}

