import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link, IndexRoute} from 'react-router';


class App extends React.Component{
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
                    </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

class Landing extends React.Component{
    render(){
        return(
            <div>Hello Landing</div>
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
                        <IndexRoute component={Landing}></IndexRoute>
                        <Route path="user" component={User}></Route>
                        <Route path="team" component={Team}></Route>
                        <Route path="new" component={NewUser}></Route>
                    </Route>
                </Router>, root);
