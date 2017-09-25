import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import Notifications from '../../containers/Notifications';
import './login.css';
import {Redirect} from 'react-router-dom';


import * as pageActions from "../../redux/actions/authenticationActions";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            emailIsEmpty: true
        };
    }

    openModal() {
        this.setState({
            showModal: true
        });
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }


    handleSubmit(event) {
        event.preventDefault();

        let currentForm = event.target,
            email = this.refs.login_email,
            password = this.refs.login_password;


        let loginValidationSettings = {
            rules: {
                email: {
                    required: true,
                    isEmail: true
                },
                password: {
                    required: true,
                    minLength: {
                        checkMinLength: true,
                        minLengthVal: 6
                    }
                }
            },
            messages: {
                email: {
                    required: "Please enter email",
                    email: "Please enter a valid email address"
                },
                password: {
                    required: "Please enter password",
                    minLength: "Password should contain minimum 6 characters"
                }
            }
        };

        //----------------------------------
        //LOGIN FORM VALIDATION
        //----------------------------------

        let validate = (loginValidationSettings, email, password, currentForm) => {

            let passCheckOnEmptyEmail = false,
                passCheckOnEmail = false,
                passCheckOnEmptyPass = false,
                passCheckOnMinPass = false;

            removeAllErrorMessage(currentForm);

            if (loginValidationSettings.rules.email.required) {
                if (email.value.trim() === '') {


                    let errorElem = document.createElement('span');
                    errorElem.innerHTML = loginValidationSettings.messages.email.required;
                    errorElem.classList.add('has-error');

                    email.parentNode.classList.add('has-error');
                    email.parentNode.appendChild(errorElem);

                    passCheckOnEmptyEmail = false;

                } else {
                    passCheckOnEmptyEmail = true;
                }
            } else {
                passCheckOnEmptyEmail = true;
            }

            if (passCheckOnEmptyEmail) {
                if (loginValidationSettings.rules.email.isEmail) {
                    let emailValue = email.value;
                    let result = emailValue.match(/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i);

                    if (!result) {

                        let errorElem = document.createElement('span');
                        errorElem.innerHTML = loginValidationSettings.messages.email.email;
                        errorElem.classList.add('has-error');

                        email.parentNode.classList.add('has-error');
                        email.parentNode.appendChild(errorElem);
                        passCheckOnEmail = false;
                    } else {
                        passCheckOnEmail = true;
                    }

                } else {
                    passCheckOnEmail = true;
                }
            }

            if (passCheckOnEmail) {
                if (loginValidationSettings.rules.password.required) {
                    if (password.value === '') {

                        let errorElem = document.createElement('span');
                        errorElem.innerHTML = loginValidationSettings.messages.password.required;
                        errorElem.classList.add('has-error');

                        password.parentNode.classList.add('has-error');
                        password.parentNode.appendChild(errorElem);
                        passCheckOnEmptyPass = false;
                    } else {
                        passCheckOnEmptyPass = true;
                    }

                } else {
                    passCheckOnEmptyPass = true;
                }
            }

            if (passCheckOnEmptyPass) {
                if (loginValidationSettings.rules.password.minLength.checkMinLength) {
                    if (password.value.length < loginValidationSettings.rules.password.minLength.minLengthVal) {

                        let errorElem = document.createElement('span');
                        errorElem.innerHTML = loginValidationSettings.messages.password.minLength;
                        errorElem.classList.add('has-error');

                        password.parentNode.classList.add('has-error');
                        password.parentNode.appendChild(errorElem);
                        passCheckOnMinPass = false;
                    } else {
                        passCheckOnMinPass = true;
                    }

                } else {
                    passCheckOnMinPass = true;
                }
            }


            if (passCheckOnEmptyEmail && passCheckOnEmail && passCheckOnEmptyPass && passCheckOnMinPass) {
                return (true);
            } else {
                return (false);
            }


        };

        //----------------------------------
        //END LOGIN FORM VALIDATION
        //----------------------------------

        if (!Element.prototype.remove) {
            Element.prototype.remove = function remove() {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            };
        }

        let removeAllErrorMessage = (currentForm) => {
            let allErrorMessages = currentForm.querySelectorAll('span.has-error'),
                allErrorTitles = currentForm.querySelectorAll('div.has-error');

            for (let i = 0; i < allErrorTitles.length; i++) {
                allErrorTitles[i].classList.remove('has-error');
            }

            for (let i = 0; i < allErrorMessages.length; i++) {
                allErrorMessages[i].remove();
            }
        };


        let isPassValidation = validate(loginValidationSettings, email, password, currentForm);

        if (isPassValidation) {

            let authData = {
                email: email.value,
                password: password.value
            };

            this.props.pageActions.doLogin(authData);
        }


    }

    onCallShowNote(status, text) {
        this.props.callShowNote(status, text)
    }

    render() {

        //-- REDIRECT LOGGED USER TO MAIN PAGE  ----------------

        let loggedUser = this.props.loggedUser;
        if (loggedUser) {
            return <Redirect to={{pathname: '/'}}/>

        }

        //-- END REDIRECT LOGGED USER TO MAIN PAGE  ---------


        return (
            <div className="main-wrapper">
                <div className="app" id="app">
                    <div className="auth">
                        <Modal show={this.state.showModal} onHide={() => this.closeModal()} id="noAccountModal">
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <p>In order to get access to Interviewer app please contact your system administrator or
                                    HR
                                    department</p>
                            </Modal.Body>
                        </Modal>
                        <Notifications/>
                        <div className="auth-container">
                            <div className="card">
                                <header className="auth-header">
                                    <h1 className="auth-title">
                                        Interviewer Logo
                                    </h1>
                                </header>
                                <div className="auth-content">
                                    <p className="text-xs-center">LOGIN TO CONTINUE</p>
                                    <form id="login-form" onSubmit={(event) => this.handleSubmit(event)}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control underlined required" name="email"
                                                   id="username" placeholder="Your email address" maxLength='60'
                                                   ref='login_email'/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control underlined required"
                                                   name="password"
                                                   id="password" placeholder="Your password" maxLength='30'
                                                   ref="login_password"/>
                                        </div>
                                        <div className="form-group submit-btn">
                                            <button type="submit" id="loginSubmit"
                                                    className="btn btn-block btn-primary">Login
                                            </button>
                                        </div>
                                        <div className="form-group forgot-pass">
                                            <Link to="/forgotpassword" className="forgot-btn" id="forgotPassBtn">Forgot
                                                password?</Link>
                                        </div>
                                        <div className="form-group no-account">
                                            <p className="text-xs-center" id="noAccount"
                                               onClick={() => this.openModal()}>Do not have an
                                                account? Click here</p>
                                        </div>
                                    </form>

                                    <ul className="copyright">
                                        <li>
                                            (C) Interviewer, 2017
                                        </li>
                                        <li>
                                            <Link to="#" id="termsService">Terms of service</Link>
                                        </li>
                                        <li>
                                            <Link to="#" id="helpCenter">Help Center</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


function mapStateToProps(state) {

    return {
        userData: state.authentication.userData,
        loggedUser: state.authentication.loggedUser
    }

}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);