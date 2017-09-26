import React, {Component} from 'react';
import {Route, Switch, BrowserRouter, HashRouter} from 'react-router-dom';
import Login from './components/Login';
import RecoveryPassword from './components/RecoveryPassword';
import Main from './components/Main';
import {makeNote} from "./redux/actions/notificationActions";
import {connect} from "react-redux";

class Routes extends Component {

    handleMakeNote(status, text, hide) {
        const {dispatch} = this.props;
        dispatch(makeNote({status: status, text: text, hide: hide}));
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/login' name="Login page"
                           render={(props) =>
                               <Login {...props}
                                      callMakeNote={(status, text, hide) =>
                                          this.handleMakeNote(status, text, hide)}/>}
                    />
                    <Route exact path='/recovery_password' name="RecoveryPassword page"
                           render={(props) =>
                               <RecoveryPassword {...props}
                                      callMakeNote={(status, text, hide) =>
                                          this.handleMakeNote(status, text, hide)}/>}
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
        notifications: state.notifications
    }
}


export default connect(mapStateToProps)(Routes)
