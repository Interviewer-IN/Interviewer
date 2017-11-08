import React, {Component} from 'react';
import './recoveryPassword.css';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import Helmet from 'react-helmet';
import {EMAIL_VALIDATION} from './../../config'

class RecoveryPassword extends Component {
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

    handleSubmitBtn(event) {
        event.preventDefault();

        let currentForm = event.target,
            email = this.refs.forgotPass_email;

        let loginValidationSettings = {
            rules: {
                email: {
                    required: true,
                    isEmail: true
                },
            },
            messages: {
                email: {
                    required: "Please enter email",
                    email: "Please enter a valid email address"
                }
            }
        };


        //----------------------------------
        //  RECOVERY PASSWORD FORM VALIDATION
        //----------------------------------

        let validate = (loginValidationSettings, email, currentForm) => {

            let passCheckOnEmptyEmail = false,
                passCheckOnEmail = false;

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
                    let result = emailValue.match(EMAIL_VALIDATION);

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


            if (passCheckOnEmptyEmail && passCheckOnEmail) {
                return (true);
            } else {
                return (false);
            }

        };

        //----------------------------------
        //  END RECOVERY PASSWORD FORM VALIDATION
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


        let isPassValidation = validate(loginValidationSettings, email, currentForm);


    }

    render() {
        return (
            <div className="main-wrapper">
                <Helmet>
                    <title>Recovery Password</title>
                </Helmet>
                <div className="app" id="app">
                    <div className="auth">
                        <Modal show={this.state.showModal} onHide={() => this.closeModal()} id="recoveryPassModal">
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    If you can't recover your password using email please contact support at
                                    <a href="mailto:support@interviewer.test"> support@interviewer.test</a>
                                </p>
                            </Modal.Body>
                        </Modal>
                        <div className="auth-container">
                            <div className="card">
                                <header className="auth-header">
                                    <h1 className="auth-title">
                                        Interviewer Logo
                                    </h1>
                                </header>
                                <div className="auth-content">
                                    <p className="text-center">PASSWORD RECOVER</p>
                                    <p className="text-muted text-center">
                                        <small>Enter your email address to recover your password.</small>
                                    </p>
                                    <form id="reset-form" onSubmit={(event) => this.handleSubmitBtn(event)}>
                                        <div className="form-group ">
                                            <label htmlFor="email">Email</label>
                                            <input id="email--recovery-pass"
                                                   className="form-control underlined"
                                                   type="text"
                                                   name="email"
                                                   placeholder="Your email address"
                                                   maxLength="60"
                                                   ref="forgotPass_email"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button id="resetSubmit" type="submit" className="btn btn-block btn-primary">Reset password</button>
                                        </div>
                                        <div className="form-group">
                                            <Link id="backToLogin"
                                                  className="text-center"
                                                  to="/login">back to Login</Link>
                                        </div>
                                        <div className="form-group no-account">
                                            <p className="text-xs-center" id="noAccount"
                                               onClick={() => this.openModal()}>Need help? Click here</p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );

    }
}




export default RecoveryPassword;

