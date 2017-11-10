import React, {Component} from 'react';
import './username.css';

import Helmet from 'react-helmet';
import PageTitle from './../../containers/PageTitle';
import {UPDATE_USER_INFO} from "../../config";
import {removeCurrentError, userInfoValidationForm} from '../../utils/index';
import {updateInterviewer} from "../../redux/actions/interviewersActions";
import {connect} from 'react-redux';

class Username extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showModalConfirm: false,
            currentUserId: '',
            nameVal: '',
            surnameVal: '',
            userEmailVal: '',
            userPasswordVal: ''
        };
    }

    componentWillMount() {
        this.props.onCheckUserRole();
        const {dispatch} = this.props;

        let userData = JSON.parse(localStorage.getItem('userData'));
        console.log(userData);

        this.setState({
            currentUserId: userData.id,
            nameVal: userData.name,
            surnameVal: userData.surname,
            userEmailVal: userData.email
        });
    }


    handleNameChanges(event) {
        this.setState({nameVal: event.target.value.trim()});
        removeCurrentError(event);

    }

    handleSurnameChanges(event) {
        this.setState({surnameVal: event.target.value.trim()});
        removeCurrentError(event);
    }

    handleUserEmailChanges(event){
        this.setState({userEmailVal: event.target.value});
        removeCurrentError(event);
    }

    handleUserPasswordChanges(event){
        this.setState({userPasswordVal: event.target.value});
        removeCurrentError(event);
    }

    handleSubmitForm(event){
        event.preventDefault();

        this.setState({
            nameVal: this.state.nameVal.trim(),
            surnameVal: this.state.surnameVal.trim(),
            userEmailVal: this.state.userEmailVal.trim(),
            userPasswordVal: this.state.userPasswordVal.trim()
        });

        let validationPass = userInfoValidationForm.apply(this, [event]);

        if (validationPass) {

            let currentUserId = this.state.currentUserId,
                nameVal = this.state.nameVal,
                surnameVal = this.state.surnameVal,
                userEmailVal = this.state.userEmailVal,
                userPasswordVal = this.state.userPasswordVal;


            let formData = {
                id: currentUserId,
                name: nameVal,
                surname: surnameVal,
                email: userEmailVal,
                // password: userPasswordVal
            };

            console.log(formData);

            let {dispatch} = this.props;
            dispatch(updateInterviewer(formData, UPDATE_USER_INFO)).then(() => {
               let userData = JSON.parse(localStorage.getItem('userData'));

               userData.name = formData.name;
               userData.surname = formData.surname;
               userData.email = formData.email;

               userData = JSON.stringify(userData);
               localStorage.setItem('userData', userData);
            });

        }




    }

    openModalConfirm() {
        this.setState({
            showModalConfirm: true
        });
    }

    closeModalConfirm() {
        this.setState({
            showModalConfirm: false
        });
    }

    leaveForm() {
        this.closeModalConfirm();
        this.props.history.goBack();
    }


    render(){



        return (
            <div className="bcgr">
                <Helmet>
                    <title>User Info</title>
                </Helmet>
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle="User Info"
                            showBackBtn={false}
                            showButton={false}
                            titleForButton=""
                            linkForButton=""
                        />
                    </div>
                </div>
                <div className="row sameheight-container">
                    <div className="col-md-6">
                        <form className="custom-form" onSubmit={(event) => this.handleSubmitForm(event)}>
                            <div className="form-group">
                                <label className="control-label form-label">Name <span className="required-field">*</span></label>
                                <p className="form-sublabel">
                                    <small>Maximum 20 characters</small>
                                </p>
                                <input
                                    id="user-name"
                                    type="text"
                                    name="user-name"
                                    placeholder='Input name'
                                    className="form-control boxed"
                                    maxLength="20"
                                    ref="userName"
                                    value={this.state.nameVal}
                                    onChange={(event) => this.handleNameChanges(event)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="control-label form-label">Surname <span className="required-field">*</span></label>
                                <p className="form-sublabel">
                                    <small>Maximum 20 characters</small>
                                </p>
                                <input
                                    id="user-surname"
                                    type="text"
                                    name="user-surname"
                                    placeholder='Input surname'
                                    className="form-control boxed"
                                    maxLength="20"
                                    ref="userSurname"
                                    value={this.state.surnameVal}
                                    onChange={(event) => this.handleSurnameChanges(event)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="control-label form-label">Email <span className="required-field">*</span></label>
                                <input
                                    id="user-email"
                                    type="text"
                                    name="user-email"
                                    placeholder='Input email'
                                    className="form-control boxed"
                                    ref="userEmail"
                                    value={this.state.userEmailVal}
                                    onChange={(event) => this.handleUserEmailChanges(event)}
                                />
                            </div>

                            {/*<div className="form-group">*/}
                                {/*<label className="control-label form-label">Password <span className="required-field">*</span></label>*/}
                                {/*<input*/}
                                    {/*id="user-password"*/}
                                    {/*type="password"*/}
                                    {/*name="user-password"*/}
                                    {/*placeholder='Input current password'*/}
                                    {/*className="form-control boxed"*/}
                                    {/*ref="userPassword"*/}
                                    {/*value={this.state.userPasswordVal}*/}
                                    {/*onChange={(event) => this.handleUserPasswordChanges(event)}*/}
                                {/*/>*/}
                            {/*</div>*/}

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

export default connect(mapStateToProps)(Username);