import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sideBarActions from '../../redux/actions/sideBarActions';
import {logOut} from "../../redux/actions/authenticationActions";
import Notifications from '../../containers/Notifications';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }

    handleClickOutside(event) {

        let profileDropdown = document.getElementById('profile-dropdown-btn');

        if (!event.path.includes(profileDropdown)) {

            let userDropDownList = document.getElementById('dropdown-menu-list');

            if (userDropDownList.classList.contains('show')){
                userDropDownList.classList.remove('show');
            }
        }
    }

    handleMenuBthClick() {
        this.props.sideBarActions.showSideBar(true);
    }

    handleLogOut() {
        this.props.logOut();
    }

    handleClick() {
        let userDropDownList = document.getElementById('dropdown-menu-list');
        userDropDownList.classList.toggle('show');
    }


    render() {

        let toggleActiveDashboard = () => {
            let path = window.location.hash;
            if (path.indexOf('#/user-info') !== 0 && path.indexOf('#/password') !== 0) {
                return (
                    <Link to="/interviews-upcoming" id="headerDashboard" className="active dropdown-item"><i className="fa fa-dashboard"/> Dashboard</Link>
                );
            } else {
                return (
                    <Link to="/interviews-upcoming" id="headerDashboard" className="dropdown-item"><i className="fa fa-dashboard"/> Dashboard</Link>
                );
            }
        };

        let toggleActiveSettings = () => {
            let path = window.location.hash;
            if (path.indexOf('#/user-info') === 0 || path.indexOf('#/password') === 0) {
                return (
                    <Link to="/user-info" className="active dropdown-item" id="headerSettings"><i className="fa fa-gear"/> My settings</Link>
                );
            } else {
                return (
                    <Link to="/user-info" id="headerSettings" className="dropdown-item"><i className="fa fa-gear"/> My settings</Link>
                );
            }
        };

        let showUserName = () => {
            if (this.props.userData){
                let userData = JSON.parse(this.props.userData);
                return (userData.name + ' ' + userData.surname);
            }
        };


        return (
            <header className="header">
                <div className="header-block header-block-collapse hidden-lg-up">
                    <button className="collapse-btn" id="sidebar-collapse-btn"
                            onClick={() => this.handleMenuBthClick()}>
                        <i className="fa fa-bars"/>
                    </button>
                </div>
                <div className="header-block header-block-nav">
                    <ul className="nav-profile">
                        <li className="profile dropdown" id="profile-dropdown-btn" onClick={() => this.handleClick()}>
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button">
                                <span className="name">  {showUserName()} </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu__custom profile-dropdown-menu" id="dropdown-menu-list">
                                {toggleActiveDashboard()}
                                {toggleActiveSettings()}
                                <div className="dropdown-divider"/>
                                <Link to="/login" id="headerLogout" className="dropdown-item" onClick={() => this.handleLogOut()}><i className="fa fa-power-off"/> Logout</Link>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Header)