import React, {Component} from 'react';
import './password.css';

import Helmet from 'react-helmet';
import {Modal, Button} from 'react-bootstrap';
import PageTitle from './../../containers/PageTitle';
import {CONFIRM_TEXT} from "../../config";
import {removeCurrentError, createErrorElem, changePassValidationForm} from '../../utils/index';

class Password extends Component{

    constructor(props) {
        super(props);
        this.state = {
            confirmText: CONFIRM_TEXT,
            showModalConfirm: false,
            oldPassword: '',
            newPassword: '',
            retypePassword: ''
        };
    }

    componentWillMount() {
        this.props.onCheckUserRole();
        const {dispatch} = this.props;
    }

    handleOldPasswordChanges(event) {
        this.setState({oldPassword: event.target.value.trim()});
        removeCurrentError(event);

    }

    handleNewPasswordChanges(event) {
        this.setState({newPassword: event.target.value.trim()});
        removeCurrentError(event);
    }

    handleRepeatNewPassChanges(event){
        this.setState({retypePassword: event.target.value.trim()});
        removeCurrentError(event);
    }

    handleSubmitForm(event){
        event.preventDefault();

        let validationPass = changePassValidationForm.apply(this, [event]);

        if (validationPass) {

            let oldPassword = this.state.oldPassword,
                newPassword = this.state.newPassword,
                retypePassword = this.state.retypePassword;

            let formData = {
                oldPassword: oldPassword,
                newPassword: newPassword,
                retypePassword: retypePassword
            };

            console.log(formData);
        }
    }

    render(){
        return (
            <div className="bcgr">
                <Helmet>
                    Password
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
                                <label className="control-label form-label">Old password <span className="required-field">*</span></label>
                                <input
                                    id="old-password"
                                    type="password"
                                    name="old-password"
                                    placeholder='Input old password'
                                    className="form-control boxed"
                                    maxLength="20"
                                    ref="oldPassword"
                                    value={this.state.nameVal}
                                    autoFocus
                                    onChange={(event) => this.handleOldPasswordChanges(event)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="control-label form-label">New password <span className="required-field">*</span></label>
                                <input
                                    id="new-password"
                                    type="password"
                                    name="new-password"
                                    placeholder='Input new password'
                                    className="form-control boxed"
                                    maxLength="20"
                                    ref="newPassword"
                                    value={this.state.surnameVal}
                                    onChange={(event) => this.handleNewPasswordChanges(event)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="control-label form-label">Re-type new password <span className="required-field">*</span></label>
                                <input
                                    id="retype-password"
                                    type="password"
                                    name="user-retype-password"
                                    placeholder='Re-type new password'
                                    className="form-control boxed"
                                    ref="retypePassword"
                                    value={this.state.userEmailVal}
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

export default Password;