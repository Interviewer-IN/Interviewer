import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Header from "./../Header";
import SideMenu from "./../SideMenu";
import Interviewers from "./../Interviewers";
import InterviewsUpcoming from "../InterviewsUpcoming";
import InterviewsCompleted from "../InterviewsCompleted";
import Candidates from "./../Candidates";
import VacanciesOpen from "./../VacanciesOpen";
import VacanciesClosed from "./../VacanciesClosed";
import CreateVacancy from "./../CreateVacancy";
import CreateProject from "./../CreateProject";
import ProjectsList from "./../ProjectsList";
import ProjectDetails from "./../ProjectDetails";
import ProjectEdit from "./../ProjectEdit";
import Username from "./../Username";
import Password from "./../Password";
import {makeNote} from "../../redux/actions/notificationActions";
import {authorizationCheck} from "../../redux/actions/authenticationActions";
import {showSideBar} from '../../redux/actions/sideBarActions';
import {connect} from "react-redux";


class Main extends Component {

    componentWillMount() {
        this.checkUserStatus();
    }

    componentDidUpdate() {

        //-- CHECKING STATUS OF SIDEBAR ----------------

        let sideBarStatus = this.props.sideBar,
            app = document.getElementById('app');

        if (app !== null) {
            if (sideBarStatus) {
                app.classList.add('sidebar-open');
            } else {
                app.classList.remove('sidebar-open');
            }
        }

        //-- END CHECKING STATUS OF SIDEBAR ----------------

        this.checkUserStatus();
    }

    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(showSideBar(false));
    }

    //-- CHECKING IS USER LOGGED ----------------

    checkUserStatus() {
        const {dispatch} = this.props;
        dispatch(authorizationCheck());
    }

//--  END CHECKING IS USER LOGGED ----------------

    // -- CHECKING USER'S ROLE ----------------

    checkUserRole() {
        let user = this.getCookies();
        if (user.uid != "user@user.com") {
            this.props.history.push('/interviews-upcoming');
        }
    }

    getCookies() {
        let cookies = {};
        for (let cookie of document.cookie.split('; ')) {
            let [name, value] = cookie.split("=");
            cookies[name] = decodeURIComponent(value);
        }
        return cookies;
    }
//--  END CHECKING USER'S ROLE  ----------------

    handleMakeNote(status, text, hide) {
        const {dispatch} = this.props;
        dispatch(makeNote({status: status, text: text, hide: hide}));
    }

    render() {

        let isLoggedIn = () => this.props.loggedUser;

        return (
            <div className="main-wrapper">
                <div className="app" id="app">
                    <Header/>
                    <SideMenu/>
                    <article className="content dashboard-page">

                        <Switch>
                            <Route
                                exact path="/interviews-upcoming"
                                name="InterviewsUpcoming"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<InterviewsUpcoming {...props}
                                                             callMakeNote={(status, text, hide) =>
                                                                 this.handleMakeNote(status, text, hide)}
                                        />) :
                                        (<Redirect to="/login"/>)

                                )}
                            />
                            <Route
                                exact path="/interviews-completed"
                                name="InterviewsCompleted"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<InterviewsCompleted {...props}
                                                              callMakeNote={(status, text, hide) =>
                                                                  this.handleMakeNote(status, text, hide)}
                                        />) :
                                        (<Redirect to="/login"/>)

                                )}
                            />
                            <Route
                                exact path="/interviewers"
                                name="Interviewers"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<Interviewers {...props}
                                                       callMakeNote={(status, text, hide) =>
                                                           this.handleMakeNote(status, text, hide)}
                                                       onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)

                                )}
                            />
                            <Route
                                exact path="/candidates"
                                name="Candidates"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<Candidates {...props}
                                                     callMakeNote={(status, text, hide) =>
                                                         this.handleMakeNote(status, text, hide)}
                                                     onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)

                                )}
                            />
                            <Route
                                exact path="/vacancies-open"
                                name="VacanciesOpen"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<VacanciesOpen {...props}
                                                        callMakeNote={(status, text, hide) =>
                                                            this.handleMakeNote(status, text, hide)}
                                                        onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)
                                )}
                            />
                            <Route
                                exact path="/vacancies-closed"
                                name="VacanciesClosed"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<VacanciesClosed {...props}
                                                          callMakeNote={(status, text, hide) =>
                                                              this.handleMakeNote(status, text, hide)}
                                                          onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)
                                )}
                            />
                            <Route
                                exact path="/vacancies-open/create-vacancy"
                                name="CreateVacancy"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<CreateVacancy {...props}
                                                        callMakeNote={(status, text, hide) =>
                                                            this.handleMakeNote(status, text, hide)}
                                                        onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)
                                )}
                            />
                            <Route
                                exact path="/vacancies-closed/create-vacancy"
                                name="CreateVacancy"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<CreateVacancy {...props}
                                                        callMakeNote={(status, text, hide) =>
                                                            this.handleMakeNote(status, text, hide)}
                                                        onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)
                                )}
                            />
                            <Route
                                exact path="/projects"
                                name="Projects List"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<ProjectsList {...props}
                                                       callMakeNote={(status, text, hide) =>
                                                           this.handleMakeNote(status, text, hide)}
                                                       onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)
                                )}
                            />
                            <Route
                                exact path="/projects/create-project"
                                name="Create project"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<CreateProject {...props}
                                                        callMakeNote={(status, text, hide) =>
                                                            this.handleMakeNote(status, text, hide)}
                                                        onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)
                                )}
                            />
                            <Route
                                exact path="/projects/project/:id"
                                name="Project Details"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<ProjectDetails {...props}
                                                         callMakeNote={(status, text, hide) =>
                                                             this.handleMakeNote(status, text, hide)}
                                                         onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)
                                )}
                            />

                            <Route
                                exact path="/projects/project/:id/edit"
                                name="Project Edit"


                                render={(props) => (
                                    isLoggedIn() ?
                                        (<ProjectEdit {...props}
                                                      callMakeNote={(status, text, hide) =>
                                                          this.handleMakeNote(status, text, hide)}
                                                      onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)
                                )}
                            />
                            <Route
                                exact path="/username"
                                name="Username"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<Username {...props}
                                                   callMakeNote={(status, text, hide) =>
                                                       this.handleMakeNote(status, text, hide)}
                                                   onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)
                                )}
                            />
                            <Route
                                exact path="/password"
                                name="Password"
                                render={(props) => (
                                    isLoggedIn() ?
                                        (<Password {...props}
                                                   callMakeNote={(status, text, hide) =>
                                                       this.handleMakeNote(status, text, hide)}
                                                   onCheckUserRole={() => this.checkUserRole()}
                                        />) :
                                        (<Redirect to="/login"/>)
                                )}
                            />
                            <Redirect from="/" to="/interviews-upcoming"/>
                        </Switch>
                    </article>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        sideBar: state.sideBar.status,
        notifications: state.notifications,
        loggedUser: state.authentication.loggedUser,
        userData: state.authentication.userData,
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         pageActions: bindActionCreators(pageActions, dispatch)
//     }
// }

export default connect(mapStateToProps)(Main)
