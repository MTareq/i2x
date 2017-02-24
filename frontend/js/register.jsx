import React from 'react';
import { Router, Route, hashHistory, Link, IndexRoute} from 'react-router';
import AlertContainer from 'react-alert';
import utils from './utils.jsx';

export default class Register extends React.Component{
    constructor(props) {
        super(props);
    }
    handleNew(e){
		e.preventDefault()
        let data = {
            method: 'post',  
            headers: {  
                      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
            },  
            body: utils.encodeObject({
                username:this.refs.username.value,
                password:this.refs.pass.value, 
                email:this.refs.email.value,
                first_name:this.refs.firstName.value,
                last_name: this.refs.lastName.value,
                team_id: this.props.params ? this.props.params.teamid: 0
            })
          }
        fetch('/api/users/', data)
            .then(utils.handleErrors)
            .then((res)=>res.json())
            .then((user)=>{ utils.login(this.refs.username.value, this.refs.pass.value, (loggedIn) => { if (loggedIn) { hashHistory.push('/user') } }) })
            .catch((errors)=> { console.log('errror')});
    }
    render(){
        return (
            <div>
                <h3> Register</h3>
                <AlertContainer ref={a => this.msg = a} {...utils.alertOptions} />
                <form onSubmit={this.handleNew.bind(this)}>
                    <div class="form-group">
                    <input required type="text" placeholder="username" ref="username" class="form-control"/>
                    </div>
                    <div class="form-group">
                    <input required type="password" placeholder="password" ref="pass" class="form-control"/>
                    </div>
                    <div class="form-group">
                    <input required type="email" placeholder="email" ref="email" class="form-control"/>
                    </div>
                    <div class="form-group">
                    <input required type="text" placeholder="first name" ref="firstName" class="form-control"/>
                    </div>
                    <div class="form-group">
                    <input required type="text" placeholder="Last name" ref="lastName" class="form-control"/>
                    </div>
                    <div class="form-group">
                    <button class="btn btn-primary" type="submit">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

