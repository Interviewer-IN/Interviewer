import React, {Component} from 'react';
import './createCandidate.css';

import PageTitle from '../../containers/PageTitle';
import TextareaAutosize from 'react-autosize-textarea';
import {Modal, Button} from "react-bootstrap";
import {fieldCharRegex, LETTERS_ONLY} from "../../config";
import {connect} from 'react-redux';
import {getPositions} from "../../redux/actions/positionActions";
import {getLevels} from "../../redux/actions/levelsActions";
import {getValueFromArr} from '../../utils/index';
import {createCandidate} from "../../redux/actions/candidatesActions";

class CreateCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalConfirm: false,
            nameVal: '',
            surnameVal: '',
            positionVal: '',
            levelVal: '',
            experienceVal: '',
            contactVal: '',
            notesVal: '',
            cvUploadVal: ''
        };
    }


    componentWillMount() {
        this.props.onCheckUserRole();
        const {dispatch} = this.props;
        dispatch(getPositions());
        dispatch(getLevels());

    }


    isFieldsNotEmpty() {
        if (this.state.nameVal || this.state.surnameVal || this.state.positionVal || this.state.levelVal || this.state.experienceVal || this.state.contactVal || this.state.notesVal || this.state.cvUploadVal) {
            this.openModalConfirm();
        } else {
            this.props.history.goBack();
        }
    }

    removeCurrentError(event) {
        if (event.target.nextSibling !== null) {
            event.target.parentNode.classList.remove('has-error');
            event.target.nextSibling.remove();
        }
    }

    handleNameChanges(event) {
        this.setState({nameVal: event.target.value.trim()});
        this.removeCurrentError(event);

    }

    handleSurnameChanges(event) {
        this.setState({surnameVal: event.target.value.trim()});
        this.removeCurrentError(event);
    }

    handlePositionChanges(event) {
        this.setState({positionVal: event.target.value});
        this.removeCurrentError(event);
    }

    handleLevelChanges(event) {
        this.setState({levelVal: event.target.value});
        this.removeCurrentError(event);
    }

    handleExperienceChanges(event) {
        this.setState({experienceVal: event.target.value});
        this.removeCurrentError(event);
    }

    handleContactChanges(event) {
        this.setState({contactVal: event.target.value});
        this.removeCurrentError(event);
    }

    handleUploadFile(event) {

        let parentWrapper = event.target.parentNode.parentNode,
            resultUploadBlock = parentWrapper.querySelector('.upload-file__result'),
            hasErrorBlock = parentWrapper.querySelector('.has-error');

        if (hasErrorBlock) {
            parentWrapper.classList.remove('has-error');
            hasErrorBlock.remove();
        }

        if (event.target.files.length) {
            this.setState({cvUploadVal: event.target.files[0].name});
            resultUploadBlock.innerHTML = event.target.files[0].name;
        } else {
            this.setState({cvUploadVal: ''});
            resultUploadBlock.innerHTML = '';
        }
    }

    handleNotesChanges(event) {
        this.setState({notesVal: event.target.value});
        this.removeCurrentError(event);
    }

    handleSubmitForm(event) {
        event.preventDefault();

        this.setState({
            nameVal : this.state.nameVal.trim(),
            surnameVal: this.state.surnameVal.trim(),
            experienceVal: this.state.experienceVal.trim(),
            contactVal: this.state.contactVal.trim(),
            notesVal: this.state.notesVal.trim(),
        });

        let currentForm = event.target,
            nameElem = this.refs.candidateName,
            nameVal = this.state.nameVal,
            namePass = false,
            surnameElem = this.refs.candidateSurname,
            surnameVal = this.state.surnameVal,
            surnamePass = false,
            positionElem = this.refs.candidatePosition,
            positionVal = this.state.positionVal,
            positionIndex = this.refs.candidatePosition.options.selectedIndex,
            positionPass = false,
            positionsList = this.props.positions,
            levelElem = this.refs.candidateLevel,
            levelVal = this.state.levelVal,
            levelIndex = this.refs.candidateLevel.options.selectedIndex,
            levelPass = false,
            levelsList = this.props.levels,
            experienceElem = document.getElementById('candidate-work-experience'),
            experienceVal = this.state.experienceVal,
            experiencePass = false,
            contactElem = document.getElementById('candidate-contact-info'),
            contactVal = this.state.contactVal,
            contactPass = false,
            uploadElem = this.refs.candidateCV,
            uploadVal = this.state.cvUploadVal,
            uploadPass = false,
            notesElem = document.getElementById('candidate-additional-notes'),
            notesVal = this.state.notesVal,
            notesPass = false;


        //--  VALIDATION FORM  -------------

        let candidateValidationSettings = {
            rules: {
                name: {
                    required: true,
                    pattern: LETTERS_ONLY,
                    minLength: 2
                },
                surname: {
                    required: true,
                    pattern: LETTERS_ONLY,
                    minLength: 2
                },
                position: {
                    required: true
                },
                level: {
                    required: true
                },
                experience: {
                    required: false,
                    pattern: fieldCharRegex
                },
                contactInfo: {
                    required: true,
                    pattern: fieldCharRegex
                },
                uploadCV: {
                    required: false
                },
                additionalNotes: {
                    required: false,
                    pattern: fieldCharRegex
                }
            },
            messages: {
                name: {
                    required: "Please enter name",
                    format: "Please use only latin letters",
                    minLength: "Name should contain minimum 2 characters"
                },
                surname: {
                    required: "Please enter surname",
                    format: "Please use only latin letters",
                    minLength: "Surname should contain minimum 2 characters"
                },
                position: {
                    required: "Please select position"
                },
                level: {
                    required: "Please select level"
                },
                experience: {
                    required: "Please enter experience",
                    format: "Please use only latin letters, numbers and special symbols"
                },
                contactInfo: {
                    required: "Please enter contact info",
                    format: "Please use only latin letters, numbers and special symbols"
                },
                uploadCV: {
                    required: "Please upload CV"
                },
                additionalNotes: {
                    required: "Please enter additional notes",
                    format: "Please use only latin letters, numbers and special symbols"
                }
            }
        };

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

        let createErrorElem = (element, errorMessage) => {
            element.parentNode.classList.add('has-error');
            let errorElem = document.createElement('span');
            errorElem.innerHTML = errorMessage;
            errorElem.classList.add('has-error');
            errorElem.classList.add('custom-error');

            return errorElem;
        };


        removeAllErrorMessage(currentForm);

        if (candidateValidationSettings.rules.name.required || nameVal) {
            if (nameVal) {
                if (nameVal.length >= candidateValidationSettings.rules.name.minLength){
                    if (nameVal.match(candidateValidationSettings.rules.name.pattern)) {
                        namePass = true;
                    } else {
                        nameElem.parentNode.appendChild(createErrorElem(nameElem, candidateValidationSettings.messages.name.format));
                        namePass = false;
                    }
                } else {
                    namePass = false;
                    nameElem.parentNode.appendChild(createErrorElem(nameElem, candidateValidationSettings.messages.name.minLength));
                }

            } else {
                nameElem.parentNode.appendChild(createErrorElem(nameElem, candidateValidationSettings.messages.name.required));
                namePass = false;
            }
        } else {
            namePass = true;
        }

        if (candidateValidationSettings.rules.surname.required || surnameVal) {
            if (surnameVal) {
                if (surnameVal.length >= candidateValidationSettings.rules.surname.minLength){
                    if (surnameVal.match(candidateValidationSettings.rules.surname.pattern)) {
                        surnamePass = true;
                    } else {
                        surnameElem.parentNode.appendChild(createErrorElem(surnameElem, candidateValidationSettings.messages.surname.format));
                        surnamePass = false;
                    }
                } else {
                    surnameElem.parentNode.appendChild(createErrorElem(surnameElem, candidateValidationSettings.messages.surname.minLength));
                    surnamePass = false;
                }



            } else {
                surnameElem.parentNode.appendChild(createErrorElem(surnameElem, candidateValidationSettings.messages.surname.required));
                surnamePass = false;
            }
        } else {
            surnamePass = true;
        }


        if (candidateValidationSettings.rules.position.required) {
            if (!positionIndex) {
                positionElem.parentNode.appendChild(createErrorElem(positionElem, candidateValidationSettings.messages.position.required));
                positionPass = false;
            } else {
                positionPass = true;
            }
        } else {
            positionPass = true;
        }

        if (candidateValidationSettings.rules.level.required) {
            if (!levelIndex) {
                levelElem.parentNode.appendChild(createErrorElem(levelElem, candidateValidationSettings.messages.level.required));
                levelPass = false;
            } else {
                levelPass = true;
            }
        } else {
            levelPass = true;
        }

        if (candidateValidationSettings.rules.experience.required || experienceVal) {
            if (experienceVal) {
                if (experienceVal.match(candidateValidationSettings.rules.experience.pattern)) {
                    experiencePass = true;
                } else {
                    experienceElem.parentNode.appendChild(createErrorElem(experienceElem, candidateValidationSettings.messages.experience.format));
                    experiencePass = false;
                }

            } else {
                experienceElem.parentNode.appendChild(createErrorElem(experienceElem, candidateValidationSettings.messages.experience.required));
                experiencePass = false;
            }
        } else {
            experiencePass = true;
        }

        if (candidateValidationSettings.rules.contactInfo.required || contactVal) {
            if (contactVal) {
                if (contactVal.match(candidateValidationSettings.rules.contactInfo.pattern)) {
                    contactPass = true;
                } else {
                    contactElem.parentNode.appendChild(createErrorElem(contactElem, candidateValidationSettings.messages.contactInfo.format));
                    contactPass = false;
                }

            } else {
                contactElem.parentNode.appendChild(createErrorElem(contactElem, candidateValidationSettings.messages.contactInfo.required));
                contactPass = false;
            }
        } else {
            contactPass = true;
        }

        if (candidateValidationSettings.rules.uploadCV.required) {
            if (uploadVal) {
                uploadPass = true;
            } else {
                uploadElem.parentNode.parentNode.appendChild(createErrorElem(uploadElem.parentNode, candidateValidationSettings.messages.uploadCV.required));
                uploadPass = false;
            }
        } else {
            uploadPass = true;
        }

        if (candidateValidationSettings.rules.additionalNotes.required || notesVal) {
            if (notesVal) {
                if (notesVal.match(candidateValidationSettings.rules.additionalNotes.pattern)) {
                    notesPass = true;
                } else {
                    notesElem.parentNode.appendChild(createErrorElem(notesElem, candidateValidationSettings.messages.additionalNotes.format));
                    notesPass = false;
                }

            } else {
                notesElem.parentNode.appendChild(createErrorElem(notesElem, candidateValidationSettings.messages.additionalNotes.required));
                notesPass = false;
            }
        } else {
            notesPass = true;
        }

        if (namePass && surnamePass && positionPass && levelPass && experiencePass && contactPass && uploadPass && notesPass) {
            console.log('validation pass');

            let positionId = getValueFromArr(positionsList, positionVal, 'name'),
                levelId = getValueFromArr(levelsList, levelVal, 'name');


            let formData = {};

            nameVal ? formData.name = nameVal : false;
            surnameVal ? formData.surname = surnameVal : false;
            positionId ? formData.position_id = positionId : false;
            levelId ? formData.level_id = levelId : false;
            experienceVal ? formData.experience = experienceVal : false;
            contactVal ? formData.contacts = contactVal : false;
            notesVal? formData.notes = notesVal : false;
            uploadVal ? formData.cv = uploadVal: false;

            console.log(formData);

            let {dispatch} = this.props,
                pathName = window.location.hash,
                backPath = '#/' + pathName.split('/')[1];

            dispatch(createCandidate(formData, null, backPath));


        } else {
            console.log('validation fail');
        }

        //--  END VALIDATION FORM  ---------


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
        // this.resetFormFields();
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

        console.log('Candidate ', this);
        return (
            <div className="bcgr">
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
                        <form onSubmit={(event) => this.handleSubmitForm(event)}>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label form-label">Name</label>
                                    <p className="form-sublabel">
                                        <small>Maximum 60 characters</small>
                                    </p>
                                    <input
                                        id="candidate-name"
                                        type="text"
                                        name="candidate-name"
                                        placeholder='Input name'
                                        className="form-control boxed"
                                        maxLength="60"
                                        ref="candidateName"
                                        value={this.state.nameVal}
                                        autoFocus
                                        onChange={(event) => this.handleNameChanges(event)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label form-label">Surname</label>
                                    <p className="form-sublabel">
                                        <small>Maximum 60 characters</small>
                                    </p>
                                    <input
                                        id="candidate-name"
                                        type="text"
                                        name="candidate-surname"
                                        placeholder='Input surname'
                                        className="form-control boxed"
                                        maxLength="60"
                                        ref="candidateSurname"
                                        value={this.state.surnameVal}
                                        onChange={(event) => this.handleSurnameChanges(event)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-filter-block__title">Desired position</label>
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
                                    <label className="form-filter-block__title">Level</label>
                                    <select id="candidate-level"
                                            className="form-control form-control-sm custom-mode"
                                            ref="candidateLevel"
                                            value={this.state.levelVal}
                                            onChange={(event) => this.handleLevelChanges(event)}>
                                        <option>Select level</option>
                                        {showLevelsList()}
                                    </select>
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
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label form-label">Contact info</label>
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

                                <div className="form-group upload-file">
                                    <label htmlFor="candidate-upload-file" id="candidate-uploadCV"
                                           className="upload-file__custom-btn btn btn-primary btn-sm"> Upload CV
                                        <input id="candidate-upload-file"
                                               className="form-control upload-file__input"
                                               type="file"
                                               accept=".pdf,.doc,.docx"
                                               ref="candidateCV"
                                               onChange={(event) => this.handleUploadFile(event)}/>
                                    </label>
                                    <span className="upload-file__result"/>
                                </div>
                            </div>
                            <div className="col-md-12">
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
                                <p>Are you sure you want to cancel without saving changes?</p>
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