import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "./sideMenu.css";
import {bindActionCreators} from "redux";
import * as pageActions from "../../redux/actions/sideBarActions";
import MetisMenu from "react-metismenu";
import RouterLink from "react-metismenu-router-link";

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHr: false
        }
    }

    componentDidMount() {
        let user = this.getUserData() || {};
        let HR = user.is_hr;
        this.setState({isHr: HR});
    }

    getUserData() {
        let userData = localStorage.getItem("userData"),
            data = JSON.parse(userData);
        return data;
    }


    handleCloseSideBarClick() {
        this.props.pageActions.hideSideBar(false);
    }

    handleClickLogo() {
        this.props.pageActions.hideSideBar(false);
    }

    handleMenuClick(event) {

        let clickItem = event.target;

        if (clickItem.classList.contains('metismenu-link')) {
            setTimeout(function () {
                hideMenu(clickItem);
            }, 100);

        } else {
            setTimeout(function () {
                hideMenu(clickItem.parentNode);
            }, 100);
        }

        let hideMenu = (clickItem) => {
            if (clickItem.classList.contains('active')) {
                this.props.pageActions.hideSideBar(false);
            }
        };
    }

    render() {

        let changeMenuItems = () => {

            let dashboard;

            if (this.state.isHr) {

                dashboard = [
                    {
                        name: '/interviews',
                        icon: 'handshake-o',
                        label: 'Interviews',
                        to: '/interviews-upcoming',
                        content: [
                            {
                                name: '/interviews-upcoming',
                                icon: 'square-o',
                                label: 'Upcoming',
                                to: '/interviews-upcoming',
                            },
                            {
                                name: '/interviews-completed',
                                icon: 'check-square-o',
                                label: 'Completed',
                                to: '/interviews-completed',
                            }
                        ]
                    },

                    {
                        name: '/interviewers',
                        icon: 'user-o',
                        label: 'Interviewers',
                        to: '/interviewers',
                    },

                    {
                        name: '/vacancies',
                        icon: 'binoculars',
                        label: 'Vacancies',
                        content: [
                            {
                                name: '/vacancies-open',
                                label: 'Open',
                                to: '/vacancies-open',
                            },
                            {
                                name: '/vacancies-closed',
                                label: 'Closed',
                                to: '/vacancies-closed',
                            }
                        ]
                    },
                    {
                        name: '/candidates',
                        icon: 'address-card-o',
                        label: 'Candidates',
                        to: '/candidates',
                    },
                    {
                        name: '/projects',
                        icon: 'briefcase',
                        label: 'Projects',
                        to: '/projects'
                    },
                ];

            } else {

                dashboard = [
                    {
                        name: '/interviews',
                        icon: 'handshake-o',
                        label: 'Interviews',
                        content: [
                            {
                                name: '/interviews-upcoming',
                                icon: 'square-o',
                                label: 'Upcoming',
                                to: '/interviews-upcoming',
                            },
                            {
                                name: '/interviews-completed',
                                icon: 'check-square-o',
                                label: 'Completed',
                                to: '/interviews-completed',
                            }
                        ]
                    }
                ]
            }

            let settings = [
                {
                    name: '/user-info',
                    icon: 'user-circle-o',
                    label: 'User-info',
                    to: '/user-info'
                },
                {
                    name: '/password',
                    icon: 'lock',
                    label: 'Password',
                    to: '/password',
                }
            ];


            let pathName = window.location.hash,
                items = dashboard.concat(settings);

            items.forEach(function (item) {
                if (item.content) {
                    for (let i = 0; i < item.content.length; i++) {
                        items.push(item.content[i]);
                    }
                }
            });

            let menuItem = items.find(function (item) {
                return pathName === item.name;
            });


            if (!menuItem) {
                menuItem = items.find(function (item) {
                    let itemName = pathName.split("/")[1];
                    return item.name.indexOf(itemName) !== -1;
                });
            }

            let label;
            if (menuItem) {
                label = menuItem.label;
            }

            // if (pathName.indexOf('#/user-info') === 0 || pathName.indexOf('#/password') === 0) {
                // let to;
                // if (menuItem && menuItem.label != ('Interviews' || 'Vacancies')) {
                //     to = menuItem.to;
                // }
                //
                // if(menuItem && menuItem.label === 'Interviews') {
                //     to = '/interviews-upcoming';
                // }
                //
                // if(menuItem && menuItem.label === 'Vacancies') {
                //     to = '//vacancies-open';
                // }
            // }

            if (pathName.indexOf('#/user-info') === 0 || pathName.indexOf('#/password') === 0) {
                return (
                    <MetisMenu
                        activeLinkLabel={label}
                        content={settings}
                        LinkComponent={RouterLink}
                        classNameStateIcon="arrow"
                        classNameItemActive="active"
                    />
                );
            } else {
                return (
                    <MetisMenu
                        activeLinkLabel={label}
                        content={dashboard}
                        LinkComponent={RouterLink}
                        classNameStateIcon="arrow"
                        classNameItemActive="active"
                    />
                );
            }
        };

        return (
            <div className="sidebar-section">
                <div className="sidebar">
                    <div className="sidebar-container">
                        <div className="sidebar-header">
                            <div className="brand">
                                <Link to="/" id="sideMenuLogo" onClick={() => this.handleClickLogo()}>Logo</Link>
                            </div>
                        </div>
                        <div className="sidebar-menu" id="metisMenu"
                             onClick={(event) => this.handleMenuClick(event)}>
                            {changeMenuItems()}
                        </div>
                    </div>
                </div>
                <div className="sidebar-overlay" id="sidebar-overlay"
                     onClick={() => this.handleCloseSideBarClick()}/>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        sideBar: state.sideBar.status,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SideMenu)