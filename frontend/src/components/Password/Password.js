import React, {Component} from 'react';
import './password.css';

import Helmet from 'react-helmet';
import PageTitle from './../../containers/PageTitle';
import {removeCurrentError, changePassValidationForm} from '../../utils/index';
import {authorizationCheck} from "../../redux/actions/authenticationActions";
import {changePassword} from "../../redux/actions/changePasswordActions";
import {connect} from "react-redux";

class Password extends Component {

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

    handleSubmitForm(event) {
        event.preventDefault();

        let validationPass = changePassValidationForm.apply(this, [event]);

        if (validationPass) {

            let newPassword = this.state.newPassword,
                retypePassword = this.state.retypePassword;

            let formData = {
                password: newPassword,
                password_confirmation: retypePassword
            };

            let {dispatch} = this.props;
            dispatch(authorizationCheck());
            dispatch(changePassword(formData)).then(() => {
                this.setState({
                    newPassword: '',
                    retypePassword: ''
                });
            });

        }
    }

    render() {

        return (
            <div className="bcgr">
                <Helmet>
                    <title>Change password</title>
                </Helmet>
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle="Change password"
                            showBackBtn={false}
                            showButton={false}
                            titleForButton=""
                            linkForButton=""/>
                    </div>
                </div>
                <div className="row sameheight-container">
                    <div className="col-md-6">
                        <form className="custom-form" onSubmit={(event) => this.handleSubmitForm(event)}>

                            <div className="form-group">
                                <label className="control-label form-label">New password <span
                                    className="required-field">*</span></label>
                                <input
                                    id="new-password"
                                    type="password"
                                    name="new-password"
                                    placeholder='Input new password'
                                    className="form-control boxed"
                                    maxLength="20"
                                    ref="newPassword"
                                    value={this.state.newPassword}
                                    onChange={(event) => this.handleNewPasswordChanges(event)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="control-label form-label">Re-type new password <span
                                    className="required-field">*</span></label>
                                <input
                                    id="retype-password"
                                    type="password"
                                    name="user-retype-password"
                                    placeholder='Re-type new password'
                                    className="form-control boxed"
                                    maxLength="20"
                                    ref="retypePassword"
                                    value={this.state.retypePassword}
                                    onChange={(event) => this.handleRepeatNewPassChanges(event)}
                                />
                            </div>

                            <div className="form-group custom-btn-group">
                                <button
                                    id="create-vacancy-submitBtn"
                                    type="submit"
                                    className="btn btn-primary"
                                >Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Password);