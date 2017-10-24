import React, {Component} from 'react';
import './createCandidate.css';

import PageTitle from '../../containers/PageTitle';
import TextareaAutosize from 'react-autosize-textarea';
import {Modal, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {getPositions} from "../../redux/actions/positionActions";
import {getLevels} from "../../redux/actions/levelsActions";
import {getValueFromArr, removeCurrentError, candidatesValidationFrom, getBase64, createErrorElem} from '../../utils/index';
import {createCandidate} from "../../redux/actions/candidatesActions";
import {CONFIRM_TEXT, TYPE_FILES, TYPE_FILE_ERROR_TEXT} from "../../config";

class CreateCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmText: CONFIRM_TEXT,
            showModalConfirm: false,
            nameVal: '',
            surnameVal: '',
            ageVal: '',
            positionVal: '',
            levelVal: '',
            experienceVal: '',
            contactVal: '',
            notesVal: '',
            cvUploadVal: '',
            cvData: ''
        };
    }


    componentWillMount() {
        this.props.onCheckUserRole();
        const {dispatch} = this.props;
        dispatch(getPositions());
        dispatch(getLevels());

    }


    isFieldsNotEmpty() {
        if (this.state.nameVal || this.state.surnameVal || this.state.ageVal || this.state.positionVal || this.state.levelVal || this.state.experienceVal || this.state.contactVal || this.state.notesVal || this.state.cvUploadVal) {
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

    handleAgeChanges(event) {
        this.setState({ageVal: event.target.value.trim()});
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

    handleExperienceChanges(event) {
        this.setState({experienceVal: event.target.value});
        removeCurrentError(event);
    }

    handleContactChanges(event) {
        this.setState({contactVal: event.target.value});
        removeCurrentError(event);
    }

    handleUploadFile(event) {

        let parentWrapper = event.target.parentNode.parentNode,
            resultUploadBlock = parentWrapper.querySelector('.upload-file__result'),
            hasErrorBlock = parentWrapper.querySelector('.has-error');

        if (hasErrorBlock) {
            parentWrapper.classList.remove('has-error');
            hasErrorBlock.remove();
        }


        let file = event.target.files[0],
            arrExtensions = TYPE_FILES.split(','),
            searchResult = false;

        if (event.target.files.length){


            for (let i = 0; i < arrExtensions.length; i++) {
                let searchPosition = file.name.indexOf(arrExtensions[i]);
                if (searchPosition !== -1) {
                    searchResult = true;
                    break;
                }
            }

            if (searchResult){

                getBase64(file).then(data => {
                        this.setState({
                            cvData: data
                        })
                    }
                );

                this.setState({cvUploadVal: event.target.files[0].name});
                resultUploadBlock.innerHTML = event.target.files[0].name;


            } else {
                this.setState({cvUploadVal: ''});
                resultUploadBlock.innerHTML = '';
                this.setState({
                    cvData: ''
                });
                parentWrapper.appendChild(createErrorElem(event.target.parentNode, TYPE_FILE_ERROR_TEXT));
            }
        } else {
            this.setState({cvUploadVal: ''});
            resultUploadBlock.innerHTML = '';
            this.setState({
                cvData: ''
            });
        }


    }

    handleNotesChanges(event) {
        this.setState({notesVal: event.target.value});
        removeCurrentError(event);
    }

    handleSubmitForm(event) {
        event.preventDefault();

        this.setState({
            nameVal: this.state.nameVal.trim(),
            surnameVal: this.state.surnameVal.trim(),
            ageVal: this.state.ageVal.trim(),
            experienceVal: this.state.experienceVal.trim(),
            contactVal: this.state.contactVal.trim(),
            notesVal: this.state.notesVal.trim(),
        });

        let validationPass = candidatesValidationFrom.apply(this, [event]);

        if (validationPass) {
            let positionsList = this.props.positions,
                positionVal = this.state.positionVal,
                levelsList = this.props.levels,
                levelVal = this.state.levelVal,
                nameVal = this.state.nameVal,
                ageVal = this.state.ageVal,
                surnameVal = this.state.surnameVal,
                experienceVal = this.state.experienceVal,
                contactVal = this.state.contactVal,
                notesVal = this.state.notesVal,
                uploadVal = this.state.cvUploadVal,
                cvData = this.state.cvData,
                positionId = getValueFromArr(positionsList, positionVal, 'name'),
                levelId = getValueFromArr(levelsList, levelVal, 'name');


            let formData = {};

            nameVal ? formData.name = nameVal : false;
            surnameVal ? formData.surname = surnameVal : false;
            ageVal ? formData.age = ageVal : false;
            positionId ? formData.position_id = positionId : false;
            levelId ? formData.level_id = levelId : false;
            experienceVal ? formData.experience = experienceVal : false;
            contactVal ? formData.contacts = contactVal : false;
            notesVal ? formData.notes = notesVal : false;
            cvData ? formData.cv = cvData : false;


            let {dispatch} = this.props,
                pathName = window.location.hash,
                backPath = '#/' + pathName.split('/')[1];

            dispatch(createCandidate(formData, null, backPath));
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
                <Helmet>
                    <title>Add candidate</title>
                </Helmet>
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle="Add candidate"
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
                                    <label className="control-label form-label">Name <span className="required-field">*</span></label>
                                    <p className="form-sublabel">
                                        <small>Maximum 20 characters</small>
                                    </p>
                                    <input
                                        id="candidate-name"
                                        type="text"
                                        name="candidate-name"
                                        placeholder='Input name'
                                        className="form-control boxed"
                                        maxLength="20"
                                        ref="candidateName"
                                        value={this.state.nameVal}
                                        autoFocus
                                        onChange={(event) => this.handleNameChanges(event)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label form-label">Surname <span className="required-field">*</span></label>
                                    <p className="form-sublabel">
                                        <small>Maximum 20 characters</small>
                                    </p>
                                    <input
                                        id="candidate-name"
                                        type="text"
                                        name="candidate-surname"
                                        placeholder='Input surname'
                                        className="form-control boxed"
                                        maxLength="20"
                                        ref="candidateSurname"
                                        value={this.state.surnameVal}
                                        onChange={(event) => this.handleSurnameChanges(event)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label form-label">Age</label>
                                    <p className="form-sublabel">
                                        <small>Only numbers</small>
                                    </p>
                                    <input
                                        id="candidate-age"
                                        type="text"
                                        name="candidate-age"
                                        placeholder='Input age'
                                        className="form-control boxed"
                                        maxLength="3"
                                        ref="candidateAge"
                                        value={this.state.ageVal}
                                        onChange={(event) => this.handleAgeChanges(event)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Desired position <span className="required-field">*</span></label>
                                    <select id="candidate-position"
                                            className="form-control form-control-sm custom-mode"
                                            ref="candidatePosition"
                                            value={this.state.positionVal}
                                            onChange={(event) => this.handlePositionChanges(event)}>
                                        <option>Select position</option>
                                        {showPositionsList()}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Level <span className="required-field">*</span></label>
                                    <select id="candidate-level"
                                            className="form-control form-control-sm custom-mode"
                                            ref="candidateLevel"
                                            value={this.state.levelVal}
                                            onChange={(event) => this.handleLevelChanges(event)}>
                                        <option>Select level</option>
                                        {showLevelsList()}
                                    </select>
                                </div>

                                <div className="form-group upload-file">
                                    <label htmlFor="candidate-upload-file" id="candidate-uploadCV"
                                           className="upload-file__custom-btn btn btn-primary btn-sm"> Upload CV
                                        <input id="candidate-upload-file"
                                               className="form-control upload-file__input"
                                               type="file"
                                               accept={TYPE_FILES}
                                               ref="candidateCV"
                                               onChange={(event) => this.handleUploadFile(event)}/>
                                    </label>
                                    <span className="upload-file__result"/>
                                </div>
                            </div>

                            <div className="col-md-12">

                                <div className="form-group">
                                    <label className="control-label form-label">Contact info <span className="required-field">*</span></label>
                                    <p className="form-sublabel">
                                        <small>Maximum 1000 characters</small>
                                    </p>
                                    <TextareaAutosize
                                        id="candidate-contact-info"
                                        name="contact-info"
                                        placeholder="Input contact info"
                                        className="form-control boxed"
                                        maxLength="1000"
                                        rows={4}
                                        ref="candidateContactInfo"
                                        value={this.state.contactVal}
                                        onChange={(event) => this.handleContactChanges(event)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label form-label">Work experience</label>
                                    <p className="form-sublabel">
                                        <small>Maximum 1000 characters</small>
                                    </p>
                                    <TextareaAutosize
                                        id="candidate-work-experience"
                                        name="contact-info"
                                        placeholder="Input contact info"
                                        className="form-control boxed"
                                        maxLength="1000"
                                        rows={4}
                                        ref="candidateWorkExp"
                                        value={this.state.experienceVal}
                                        onChange={(event) => this.handleExperienceChanges(event)}
                                    />
                                </div>


                                <div className="form-group">
                                    <label className="control-label form-label">Additional notes</label>
                                    <p className="form-sublabel">
                                        <small>Maximum 3000 characters</small>
                                    </p>
                                    <TextareaAutosize
                                        id="candidate-additional-notes"
                                        name="additional-notes"
                                        placeholder="Input additional notes"
                                        className="form-control boxed"
                                        maxLength="3000"
                                        rows={10}
                                        ref="candidateAdditionalNotes"
                                        value={this.state.notesVal}
                                        onChange={(event) => this.handleNotesChanges(event)}
                                    />
                                </div>

                                <div className="form-group custom-btn-group">
                                    <button
                                        id="create-vacancy-submitBtn"
                                        type="submit"
                                        className="btn btn-primary"
                                    >Add
                                    </button>
                                    <button
                                        id="create-vacancy-resetBtn"
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
                                        onClick={() => this.closeModalConfirm()} bsStyle="primary">Back to Add
                                        Candidate</Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        positions: state.positions.positions,
        levels: state.levels.levels
    }
}

export default connect(mapStateToProps)(CreateCandidate);