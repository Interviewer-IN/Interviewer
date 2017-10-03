import React, {Component} from 'react';
import {Route, Switch, BrowserRouter, HashRouter, Redirect} from 'react-router-dom';
import Login from './components/Login';
import RecoveryPassword from './components/RecoveryPassword';
import Main from './components/Main';
import {makeNote} from "./redux/actions/notificationActions";
import {authorizationCheck} from "./redux/actions/authenticationActions";
import {connect} from "react-redux";

class Routes extends Component {

    handleMakeNote(status, text, hide) {
        const {dispatch} = this.props;
        dispatch(makeNote({status: status, text: text, hide: hide}));
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(authorizationCheck());
    }

    render() {

        let isLoggedIn = () => this.props.loggedUser;

        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/login' name="Login page"
                           render={(props) => (
                               isLoggedIn() ?
                                   (<Redirect to="/"/>):
                                   (<Login {...props}
                                           callMakeNote={(status, text, hide) =>
                                               this.handleMakeNote(status, text, hide)}/>)
                           )}
                    />
                    <Route exact path='/recovery_password' name="RecoveryPassword page"
                           render={(props) => (
                               isLoggedIn() ?
                                   (<Redirect to="/"/>):
                                   (<RecoveryPassword {...props}
                                                      callMakeNote={(status, text, hide) =>
                                                          this.handleMakeNote(status, text, hide)}/>)
                           )}
                    />
                    <Route path='/' name="Home"
                           render={(props) =>
                               <Main {...props}
                                     callMakeNote={(status, text, hide) =>
                                         this.handleMakeNote(status, text, hide)}/>}
                    />
                </Switch>
            </HashRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notifications,
        loggedUser: state.authentication.loggedUser,
    }
}


export default connect(mapStateToProps)(Routes)
