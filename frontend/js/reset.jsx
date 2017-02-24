import React from 'react';
import { Router, Route, hashHistory, Link, IndexRoute} from 'react-router';
import AlertContainer from 'react-alert';
import utils from './utils.jsx';

export default class ResetForm extends React.Component{
    constructor(props) {
		super(props);
    }

    sendReset(e){
		e.preventDefault()
        let url = 'verifymail/?username='+this.refs.username.value
        window.open(url, '_blank')
        this.msg.success('An email has been sent with the reset Code!')
    }
    resetPass(){
        fetch('/api/verifyme/?code='+this.refs.code.value+
              '&newpass='+this.refs.newpass.value+
              '&user='+this.refs.username.value)
            .then(utils.handleErrors)
            .then((res)=> this.msg.success('Your Password has been reseted'))
            .catch((error)=>{  
                this.msg.error('Wrong Code or Username');
            })
    }
    render(){
        return(
            <div>
                <h3>Reset Password</h3>
                <AlertContainer ref={a => this.msg = a} {...utils.alertOptions} />
                <form onSubmit={this.sendReset.bind(this)}  class="form-inline">
                    <div class="form-group">
                    <input type="text" placeholder="username" ref="username" class="form-control" />
                    <button class="btn btn-primary">Send Reset code to Email</button>
                    </div>
                </form>
                <br />
                <form onSubmit={this.resetPass.bind(this)} class="form-inline">
                    <div class="form-group">
                    <input type="code" placeholder="verify me" ref="code" class="form-control" />
                    <input type="password" placeholder="new password" ref="newpass" class="form-control" />
                    </div>
                    <div class="form-group">
                    <button class="btn btn-primary" type="submit">Reset Password</button>
                    </div>
                </form>
            </div>
        )
    }

}

