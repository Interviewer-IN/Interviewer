import React, {Component} from 'react';
import './createCandidate.css';

import PageTitle from '../../containers/PageTitle';
import TextareaAutosize from 'react-autosize-textarea';
import {Modal, Button} from "react-bootstrap";
import {fieldCharRegex} from "../../config"

class CreateCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalConfirm: false,
            nameVal: '',
            positionVal: '',
            experienceVal: '',
            contactVal: '',
            notesVal: '',
            cvUploadVal: ''
        };
    }


    isFieldsNotEmpty() {
        if (this.state.nameVal || this.state.positionVal || this.state.experienceVal || this.state.contactVal || this.state.notesVal || this.state.cvUploadVal){
            this.openModalConfirm();
        } else {
            this.props.history.goBack();
        }
    }

    removeCurrentError(event){
        if (event.target.nextSibling !== null){
            event.target.parentNode.classList.remove('has-error');
            event.target.nextSibling.remove();
        }
    }

    handleNameChanges(event) {
        this.setState({nameVal: event.target.value.trim()});
        this.removeCurrentError(event);

    }

    handlePositionChanges(event) {
        this.setState({positionVal: event.target.value});
        this.removeCurrentError(event);
    }

    handleExperienceChanges(event) {
        this.setState({experienceVal: event.target.value.trim()});
        this.removeCurrentError(event);
    }

    handleContactChanges(event) {
        this.setState({contactVal: event.target.value.trim()});
        this.removeCurrentError(event);
    }

    handleUploadFile(event) {

        let parentWrapper = event.target.parentNode.parentNode,
            resultUploadBlock = parentWrapper.querySelector('.upload-file__result'),
            hasErrorBlock = parentWrapper.querySelector('.has-error');

        if (hasErrorBlock){
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
        this.setState({notesVal: event.target.value.trim()});
        this.removeCurrentError(event);
    }

    handleSubmitForm(event) {
        event.preventDefault();

        let currentForm = event.target,
            nameElem = this.refs.candidateName,
            nameVal = this.state.nameVal,
            namePass = false,
            positionElem = this.refs.candidatePosition,
            positionVal = this.state.positionVal,
            positionIndex = this.refs.candidatePosition.options.selectedIndex,
            positionPass = false,
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
                    pattern: fieldCharRegex
                },
                position: {
                    required: true
                },
                experience: {
                    required: true,
                    pattern: fieldCharRegex
                },
                contactInfo: {
                    required: true,
                    pattern: fieldCharRegex
                },
                uploadCV: {
                    required: true
                },
                additionalNotes: {
                    required: true,
                    pattern: fieldCharRegex
                }
            },
            messages: {
                name: {
                    required: "Please enter name",
                    format: "Please use only latin letters, numbers and special symbols"
                },
                position: {
                    required: "Please select position"
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

        if (candidateValidationSettings.rules.name.required) {
            if (nameVal) {
                if (nameVal.match(candidateValidationSettings.rules.name.pattern)) {
                    namePass = true;
                } else {
                    nameElem.parentNode.appendChild(createErrorElem(nameElem, candidateValidationSettings.messages.name.format));
                    namePass = false;
                }

            } else {
                nameElem.parentNode.appendChild(createErrorElem(nameElem, candidateValidationSettings.messages.name.required));
                namePass = false;
            }
        } else {
            namePass = true;
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

        if (candidateValidationSettings.rules.experience.required) {
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

        if (candidateValidationSettings.rules.contactInfo.required) {
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

        if (candidateValidationSettings.rules.additionalNotes.required) {
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

        if (namePass && positionPass && experiencePass && contactPass && uploadPass && notesPass) {
            this.props.history.push('/candidates');
            console.log('validation pass');
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
                        <div className="col-md-12">
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
                                        <label className="form-filter-block__title">Desired position</label>
                                        <select id="candidate-position"
                                                className="form-control form-control-sm custom-mode"
                                                ref="candidatePosition"
                                                value={this.state.positionVal}
                                                onChange={(event) => this.handlePositionChanges(event)}>
                                            <option>Select position</option>
                                            <option>QA</option>
                                            <option>Frontend</option>
                                            <option>Backend</option>
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
                    </div>
                </section>
            </div>
        );
    }
}

export default CreateCandidate;