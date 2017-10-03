import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './header.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sideBarActions from '../../redux/actions/sideBarActions';
import {logOut} from "../../redux/actions/authenticationActions";
import Notifications from '../../containers/Notifications';


class Header extends Component {

    componentDidUpdate(){

    }

    handleMenuBthClick() {
        this.props.sideBarActions.showSideBar(true);
    }

    handleLogOut(){
        this.props.logOut();
    }


    render() {

        let toggleActiveDashboard = () => {
            let path = window.location.hash;
            if (path.indexOf('#/username') !== 0 && path.indexOf('#/password') !== 0) {
                return (
                    <Link to="/interviews-upcoming" id="headerDashboard" className="active">Dashboard</Link>
                );
            } else {
                return (
                    <Link to="/interviews-upcoming" id="headerDashboard">Dashboard</Link>
                );
            }
        };

        let toggleActiveSettings = () => {
            let path = window.location.hash;
            if (path.indexOf('#/username') === 0 || path.indexOf('#/password') === 0) {
                return (
                    <Link to="/username" className="active" id="headerSettings">My settings</Link>
                );
            } else {
                return (
                    <Link to="/username" id="headerSettings">My settings</Link>
                );
            }
        };

        return (
            <header className="header">
                <div className="header-block header-block-collapse hidden-lg-up">
                    <button className="collapse-btn" id="sidebar-collapse-btn" onClick={() => this.handleMenuBthClick()}>
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
                <div className="header-block header-block-nav">
                    <ul className="nav-profile">
                        <li className="username">
                            Username
                        </li>
                        <li>
                            {toggleActiveDashboard()}
                        </li>
                        <li>
                            {toggleActiveSettings()}
                        </li>
                        <li>
                            <Link to="/login" id="headerLogout" onClick={() => this.handleLogOut()}>Logout</Link>
                        </li>
                    </ul>
                </div>
                <Notifications/>
            </header>
        );
    }
}


function mapStateToProps(state) {
    return {
        sideBar: state.sideBar.status,
        userData: state.authentication.userData,
        loggedUser: state.authentication.loggedUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sideBarActions: bindActionCreators(sideBarActions, dispatch),
        logOut: bindActionCreators(logOut, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header)