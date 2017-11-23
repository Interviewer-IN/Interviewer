import React, {Component} from 'react';
import './setNewPassword.css';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import {removeCurrentError, changePassValidationForm} from '../../utils/index';
import {authorizationCheck} from "../../redux/actions/authenticationActions";
import {changePassword} from "../../redux/actions/changePasswordActions";
import {connect} from "react-redux";

class SetNewPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            retypePassword: ''
        };
    }

    handleNewPasswordChanges(event) {
        this.setState({newPassword: event.target.value.trim()});
        removeCurrentError(event);
    }

    handleRepeatNewPassChanges(event) {
        this.setState({retypePassword: event.target.value.trim()});
        removeCurrentError(event);
    }


    handleSubmitBtn(event) {
        event.preventDefault();

        let validationPass = changePassValidationForm.apply(this, [event]);

        if (validationPass) {

            let newPassword = this.state.newPassword,
                retypePassword = this.state.retypePassword;

            let formData = {
                password: newPassword,
                password_confirmation: retypePassword
            };

            console.log(formData);

            let {dispatch} = this.props;
            // dispatch(authorizationCheck());
            // dispatch(changePassword(formData)).then(() => {
            //     this.setState({
            //         newPassword: '',
            //         retypePassword: ''
            //     });
            // });

        }


    }

    render() {
        return (
            <div className="main-wrapper">
                <Helmet>
                    <title>Set New Password</title>
                </Helmet>
                <div className="app" id="app">
                    <div className="auth">
                        <div className="auth-container">
                            <div className="card">
                                <header className="auth-header">
                                    <div className="custom-logo"/>
                                </header>
                                <div className="auth-content">
                                    <p className="text-center">SET NEW PASSWORD</p>
                                    <form id="reset-form" onSubmit={(event) => this.handleSubmitBtn(event)}>
                                        <div className="form-group ">
                                            <label htmlFor="new password">New password</label>
                                            <input id="new-password"
                                                   className="form-control underlined"
                                                   type="password"
                                                   name="new password"
                                                   placeholder="Input new password"
                                                   maxLength="20"
                                                   ref="newPassword"
                                                   value={this.state.newPassword}
                                                   onChange={(event) => this.handleNewPasswordChanges(event)}
                                            />
                                        </div>
                                        <div className="form-group ">
                                            <label htmlFor="re-type password">Re-type new password</label>
                                            <input id="re-type-password"
                                                   className="form-control underlined"
                                                   type="password"
                                                   name="re-type password"
                                                   placeholder="Re-type new password"
                                                   maxLength="20"
                                                   ref="retypePassword"
                                                   value={this.state.retypePassword}
                                                   onChange={(event) => this.handleRepeatNewPassChanges(event)}
                                            />
                                        </div>
                                        <div className="form-group submit-btn">
                                            <button id="setNewPassSubmit" type="submit" className="btn btn-block btn-primary">Save</button>
                                        </div>
                                        <div className="form-group">
                                            <Link id="backToLogin"
                                                  className="text-center"
                                                  to="/login">back to Login</Link>
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




function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(SetNewPassword);

