import React from 'react';
import { Router, Route, hashHistory, Link, IndexRoute} from 'react-router';
import AlertContainer from 'react-alert';
import utils from './utils.jsx';

export default class User extends React.Component{
    constructor(props) {
        super(props);
        this.state = {currentUser: {}}
        utils.getCurrentUser((data)=> {
                this.setState({currentUser: data})
        })
    }
    verify(e){
		e.preventDefault()
        let data = {method: 'get',  
                    headers: {"Authorization": "Token "+localStorage.token },  
        }
        fetch('/api/verifyme/?code='+this.refs.code.value, data)
            .then(utils.handleErrors)
            .then((res)=>res.json())
            .then((updatedUser)=> {this.setState({currentUser:updatedUser})
                                   this.forceUpdate()})
            .catch((error)=>{this.msg.error('Code is not right')})
    }
    sendVerify(e){
		e.preventDefault()
        let url = 'verifymail/?username='+this.state.currentUser.username
        window.open(url, '_blank')
        this.msg.success('An email has been sent with the Verification Code!')

    }
    handleLogout(e){
        utils.logout();
        hashHistory.push('/home');
    }
    createTeam(e){
		e.preventDefault()
        let data = {method: 'post',  
                    headers: {"Authorization": "Token " + localStorage.token,
                              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},  
                    body:'name='+this.refs.teamName.value 
        }
        console.log(data)
        fetch('/api/teams/', data)
            .then(utils.handleErrors)
            .then((res)=>res.json())
            .then((team)=> {this.state.currentUser.team = team
                            this.forceUpdate()
            })
            .catch((error)=>{this.msg.error('Code is not right')})
    }
    invite(e){
		e.preventDefault()
        let url = 'invite/?mail='+this.refs.friendMail.value+'&username='+this.state.currentUser.username
        window.open(url, '_blank')
        this.msg.success('An Invitation email has been sent to you friend at'+ this.refs.friendMail.value)
        utils.logout(); // for testing puroses
    }
    showActions(){
        if(this.state.currentUser.verified && !this.state.currentUser.team){
            return (
                <div class="row">
                    <button class="btn btn-success" disabled="true">You are verified</button>
                    <form onSubmit={this.createTeam.bind(this)}>
                        <div class="form-group">
                        <input type="text" placeholder="Team Name" ref="teamName" class="form-control"/>
                        </div>
                        <div class="form-group">
                        <button class="btn btn-info" type="submit">Create a Team</button>
                        </div>
                    </form>
                </div>
            );
        }else if(this.state.currentUser.verified && this.state.currentUser.team){
            return (
                <div class="row">
                    <button class="btn btn-success" disabled="true">You are verified</button>
                    <form onSubmit={this.invite.bind(this)}>
                        <div class="form-group">
                        <input required type="email" placeholder="Friend Mail" ref="friendMail" class="form-control"/>
                        </div>
                        <div class="form-group">
                        <button class="btn btn-info" type="submit">invite a Friend</button>
                        </div>
                    </form>
                </div>
            );
        }else{
            return (
                <div class="row">
                    <button onClick={this.sendVerify.bind(this)} class="btn btn-danger">Send Verification Email</button>
                    <form onSubmit={this.verify.bind(this)} class=".col-md-3 .col-md-offset-3">
                            <div class="form-group">
                            <input type="text" placeholder="verify me" ref="code" class="form-control"/>
                            </div>
                            <div class="form-group">
                            <button class="btn btn-primary" type="submit">Submit</button>
                            </div>
                    </form>
                </div>
            );
        }
    }
    render(){
        return(
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertOptions} />
                <div class="container container-fluid">
                    {this.showActions()}
                </div>
                <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th><label>User Name</label></th>
                                <th><label>Email</label></th>
                                <th><label>First Name</label></th>
                                <th><label>Last Name</label> </th>
                                <th><label>Current Team</label></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Name name={this.state.currentUser.username} /></td>
                                <td><Email email={this.state.currentUser.email} /></td>
                                <td><Name name={this.state.currentUser.first_name} /></td>
                                <td><Name name={this.state.currentUser.last_name} /></td>
                                <td><Team team={this.state.currentUser.team} /></td>
                            </tr>
                        </tbody>
                </table>
                <button class="btn btn-danger" onClick={this.handleLogout}>Log out</button>
            </div>
        )
    }
}
class Email extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div><p>{this.props.email}</p></div>
        )
    }
}
class Name extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div><p>{this.props.name}</p></div>
        )
    }
}
class Team extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div><p>{this.props.team? this.props.team.name: ''}</p></div>
        )
    }
}
