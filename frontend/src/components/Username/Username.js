import React, {Component} from 'react';
import './username.css';

import Helmet from 'react-helmet';
import {Modal, Button} from 'react-bootstrap';
import PageTitle from './../../containers/PageTitle';
import {CONFIRM_TEXT} from "../../config";
import {removeCurrentError, candidatesValidationFrom, getBase64, createErrorElem} from '../../utils/index';

class Username extends Component{

    constructor(props) {
        super(props);
        this.state = {
            confirmText: CONFIRM_TEXT,
            showModalConfirm: false,
            nameVal: '',
            surnameVal: '',
            userEmailVal: ''
        };
    }

    componentWillMount() {
        this.props.onCheckUserRole();
        const {dispatch} = this.props;
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

    handleSubmitForm(event){
        event.preventDefault();

        this.setState({
            nameVal: this.state.nameVal.trim(),
            surnameVal: this.state.surnameVal.trim(),
            userEmailVal: this.state.userEmailVal.trim()
        });

        let validationPass = candidatesValidationFrom.apply(this, [event]);



        console.log('form submit');
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
                                <label className="control-label form-label">Name</label>
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
                                    autoFocus
                                    onChange={(event) => this.handleNameChanges(event)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="control-label form-label">Surname</label>
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
                                <label className="control-label form-label">Email</label>
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

export default Username;