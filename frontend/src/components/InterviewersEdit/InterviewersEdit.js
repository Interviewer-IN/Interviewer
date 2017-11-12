import React, {Component} from 'react';
import './interviewersEdit.css';

import Helmet from 'react-helmet';
import PageTitle from '../../containers/PageTitle';
import {connect} from 'react-redux';
import TextareaAutosize from 'react-autosize-textarea';
import {Modal, Button} from "react-bootstrap";

import {getPositions} from "../../redux/actions/positionActions";
import {getLevels} from "../../redux/actions/levelsActions";
import {getInterviewer, updateInterviewer} from '../../redux/actions/interviewersActions';
import {getValueFromArr, removeCurrentError, interviewersValidationForm} from '../../utils/index';
import {setUserData} from "../../redux/actions/authenticationActions";
import {CONFIRM_TEXT} from "../../config";

class InterviewersEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmText: CONFIRM_TEXT,
            showModalConfirm: false,
            currentInterviewer: {},
            nameVal: '',
            surnameVal: '',
            emailVal: '',
            levelVal: '',
            positionVal: '',
            // isHr: '',
            descriptionVal: ''
        };
    }

    componentWillMount() {

        this.props.onCheckUserRole();
        const {dispatch} = this.props;

        if (this.props.interviewers.length || this.props.positions.length || this.props.levels.length) {
            let interviewersList = this.props.interviewers,
                currentInterviewerId = this.props.match.params.id,
                positions = this.props.positions,
                levels = this.props.levels,
                currentInterviewer = interviewersList.find((currentItem) => {
                    return (
                        currentItem.id === +currentInterviewerId
                    )
                });


            this.updateState(currentInterviewer, positions, levels);
        } else {
            dispatch(getInterviewer(this.props.match.params.id)).then(() => {
                let currentInterviewer = this.props.currentInterviewer;
                dispatch(getPositions()).then(() => {
                    let positions = this.props.positions;
                    dispatch(getLevels()).then(() => {
                        let levels = this.props.levels;
                        this.updateState(currentInterviewer, positions, levels);
                    });
                });


            })
        }


    }

    updateState(currentInterviewer, positions, levels) {

        let positionValue = getValueFromArr(positions, currentInterviewer.position_id, 'name');
        let levelValue = getValueFromArr(levels, currentInterviewer.level_id, 'name');




        this.setState({
            nameVal: currentInterviewer.name,
            surnameVal: currentInterviewer.surname,
            emailVal: currentInterviewer.email,
            positionVal: positionValue,
            levelVal: levelValue,
            // descriptionVal: currentInterviewer.description

        });

        // if (currentInterviewer.is_hr){
        //     this.setState({
        //         isHr: 'checked'
        //     });
        // } else {
        //     this.setState({
        //         isHr: ''
        //     });
        // }
    }

    handleSubmitForm(event) {
        event.preventDefault();

        this.setState({
            nameVal: this.state.nameVal.trim(),
            surnameVal: this.state.surnameVal.trim(),
            emailVal: this.state.emailVal.trim(),
            descriptionVal: this.state.descriptionVal.trim(),
        });


        let validationPass = interviewersValidationForm.apply(this, [event]);

        if (validationPass) {
            let editedUserId = Number(this.props.match.params.id),
                positionsList = this.props.positions,
                positionVal = this.state.positionVal,
                levelsList = this.props.levels,
                levelVal = this.state.levelVal,
                nameVal = this.state.nameVal,
                surnameVal = this.state.surnameVal,
                emailVal = this.state.emailVal,
                // isHr = this.refs.interviewerIsHR.checked,
                descriptionVal = this.state.descriptionVal,
                positionId = getValueFromArr(positionsList, positionVal, 'name'),
                levelId = getValueFromArr(levelsList, levelVal, 'name');

            let formData ={
                id: editedUserId,
                name: nameVal,
                surname: surnameVal,
                email: emailVal,
                position_id: positionId,
                level_id: levelId,
                // is_hr: isHr,
                description: descriptionVal,
                // nickname: surnameVal + ' ' + nameVal
            };

            let {dispatch} = this.props,
                pathName = window.location.hash,
                backPath = '#/' + pathName.split('/')[1];

            if (this.props.userData){
                let userData = JSON.parse(this.props.userData),
                    loggedUserId = userData.id;

                if (loggedUserId === editedUserId){
                    userData.name = formData.name;
                    userData.surname = formData.surname;
                    userData.email = formData.email;

                    userData = JSON.stringify(userData);
                    dispatch(setUserData(userData));
                    localStorage.setItem('userData', userData);
                }

            }

            dispatch(updateInterviewer(formData, null, backPath));


        }

    }

    isFieldsNotEmpty() {
        if (this.state.emailVal || this.state.descriptionVal || this.state.positionVal || this.state.levelVal) {
            this.openModalConfirm();
        } else {
            this.props.history.goBack();
        }
    }

    handleNameChanges(event) {
        this.setState({nameVal: event.target.value.trim()});
        removeCurrentError(event);
    }

    handleSurnameChanges(event) {
        this.setState({surnameVal: event.target.value.trim()});
        removeCurrentError(event);
    }

    handleEmailChanges(event) {
        this.setState({emailVal: event.target.value});
        removeCurrentError(event);
    }

    handlePositionChanges(event) {
        this.setState({positionVal: event.target.value});
        removeCurrentError(event);
    }

    handleLevelChanges(event) {
        this.setState({levelVal: event.target.value});
        removeCurrentError(event);
    }

    handleDescriptionChanges(event) {
        this.setState({descriptionVal: event.target.value});
        removeCurrentError(event);
    }

    // handleChangeRole(event) {
    //
    //     if (this.refs.interviewerIsHR.checked){
    //         this.setState({
    //             isHr: 'checked'
    //         });
    //     } else {
    //         this.setState({
    //             isHr: ''
    //         });
    //     }
    //
    //
    // }


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

    render() {

        let showPositionsList = () => {
            let positionsList = this.props.positions,
                options = [];

            if (positionsList.length) {
                options = positionsList.map((value, index) => <option key={index}>{value.name}</option>);
            }
            return options;

        };

        let showLevelsList = () => {
            let levelsList = this.props.levels,
                options = [];

            if (levelsList.length) {
                options = levelsList.map((value, index) => <option key={index}>{value.name}</option>);
            }
            return options;

        };

        return (
            <div className="bcgr">
                <Helmet>Edit Interviewer</Helmet>
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <PageTitle pageTitle="Edit Interviewer"
                                   showBackBtn={true}
                                   showButton={false}
                                   titleForButton=""
                                   linkForButton=""
                        />
                    </div>
                </div>
                <section>
                    <div className="row sameheight-container">
                        <form className="custom-form" onSubmit={(event) => this.handleSubmitForm(event)}>
                            <div className="col-md-6">

                                <div className="form-group">
                                    <label className="control-label form-label">Name <span
                                        className="required-field">*</span></label>
                                    <input
                                        type="text"
                                        id="interviewer-name"
                                        name="interviewer-name"
                                        placeholder="Input name"
                                        className="form-control boxed"
                                        maxLength="60"
                                        ref="interviewerName"
                                        value={this.state.nameVal}
                                        autoFocus
                                        onChange={(event) => this.handleNameChanges(event)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label form-label">Surname <span
                                        className="required-field">*</span></label>
                                    <input
                                        type="text"
                                        id="interviewer-surname"
                                        name="interviewer-surname"
                                        placeholder="Input surname"
                                        className="form-control boxed"
                                        maxLength="60"
                                        ref="interviewerSurname"
                                        value={this.state.surnameVal}
                                        onChange={(event) => this.handleSurnameChanges(event)}

                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label form-label">Email <span
                                        className="required-field">*</span></label>
                                    <input
                                        type="text"
                                        id="interviewer-email"
                                        name="interviewer-email"
                                        placeholder="Input email"
                                        className="form-control boxed"
                                        maxLength="60"
                                        ref="interviewerEmail"
                                        value={this.state.emailVal}
                                        autoFocus
                                        onChange={(event) => this.handleEmailChanges(event)}

                                    />
                                </div>

                                <div className="form-group">
                                    <label>Level <span className="required-field">*</span></label>
                                    <select id="interviewer-level"
                                            className="form-control form-control-sm custom-mode"
                                            ref="interviewerLevel"
                                            value={this.state.levelVal}
                                            onChange={(event) => this.handleLevelChanges(event)}>
                                        <option>Select level</option>
                                        {showLevelsList()}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Position <span className="required-field">*</span></label>
                                    <select id="interviewer-position"
                                            className="form-control form-control-sm custom-mode"
                                            ref="interviewerPosition"
                                            value={this.state.positionVal}
                                            onChange={(event) => this.handlePositionChanges(event)}>
                                        <option>Select position</option>
                                        {showPositionsList()}
                                    </select>
                                </div>

                                {/*<div className="form-group">*/}
                                    {/*<label>*/}
                                        {/*<input className="checkbox"*/}
                                               {/*type="checkbox"*/}
                                               {/*id="interviewer-isHr"*/}
                                               {/*name="interviewer-isHr"*/}
                                               {/*ref="interviewerIsHR"*/}
                                               {/*checked={this.state.isHr}*/}
                                               {/*onChange={event => this.handleChangeRole(event)}*/}
                                        {/*/>*/}
                                        {/*<span>is HR</span>*/}
                                    {/*</label>*/}
                                {/*</div>*/}

                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="control-label form-label">Descriptions</label>
                                    <p className="form-sublabel">
                                        <small>Maximum 3000 characters</small>
                                    </p>
                                    <TextareaAutosize
                                        id="interviewer-description"
                                        name="interviewer-description"
                                        placeholder="Input interviewer description"
                                        className="form-control boxed"
                                        maxLength="3000"
                                        rows={10}
                                        ref="interviewerDescription"
                                        value={this.state.descriptionVal}
                                        onChange={(event) => this.handleDescriptionChanges(event)}
                                    />
                                </div>

                                <div className="form-group custom-btn-group">
                                    <button
                                        id="create-interviewer-submitBtn"
                                        type="submit"
                                        className="btn btn-primary"
                                    >Save
                                    </button>
                                    <button
                                        id="create-interviewer-resetBtn"
                                        type="reset"
                                        className="btn btn-danger"
                                        onClick={() => this.isFieldsNotEmpty()}
                                    >Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                        <Modal show={this.state.showModalConfirm} onHide={() => this.closeModalConfirm()}>
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <p>{this.state.confirmText}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="custom-btn-group">
                                    <Button
                                        id="modal-confirm-cancel"
                                        className="btn-danger"
                                        onClick={() => this.leaveForm()}>Cancel</Button>
                                    <Button
                                        id="modal-confirm-back"
                                        onClick={() => this.closeModalConfirm()} bsStyle="primary">Back to Create
                                        Interviewer</Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentInterviewer: state.interviewers.currentInterviewer,
        interviewers: state.interviewers.interviewers,
        positions: state.positions.positions,
        levels: state.levels.levels,
        userData: state.authentication.userData
    }
}

export default connect(mapStateToProps)(InterviewersEdit);


