import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link, IndexRoute} from 'react-router';
import utils from './utils.jsx';
import User from './user.jsx';
import Login from './login.jsx';
import Register from './register.jsx';
import ResetForm from './reset.jsx';


class App extends React.Component{
    
    constructor(props) {
    super(props);
    }
    render(){
        return(
            <div class="container-fluid">
                <div class="col-lg-12">
                    {this.props.children}
                </div>
            </div>
        )
    };
}

class Home extends React.Component{
    constructor(props) {
		super(props);
    }
    render(){
        return (
            <div class="container row">
                <div class="col-md-4">
                <Login />
                </div>
                <div class="col-md-4">
                <ResetForm />
                </div>
                <div class="col-md-4">
                <Register />
                </div>
            </div>
        )
    }
}

const root = document.getElementById('root');

function requireAuth(nextState, replace) {
  if (!utils.loggedIn()) {
    replace({
      pathname: '/home',
      state: { nextPathname: 'user' }
    })
  }
}

ReactDOM.render(<Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home}></IndexRoute>
                        <Route path="home" component={Home}></Route>
                        <Route path="signup/:teamid" component={Register}></Route>
                        <Route path="user" component={User} onEnter={requireAuth}></Route>
                    </Route>
                </Router>, root);
