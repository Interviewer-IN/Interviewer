import {removeAllErrorMessages} from './../../removeAllErrorMessages/removeAllErrorMessages'
import {createErrorElem} from './../../createErrorElem/createErrorElem';
import {fieldCharRegex, LETTERS_ONLY} from "../../../config";

export function candidatesValidationFrom(event){

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

    removeAllErrorMessages(currentForm);

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
        return true;

    } else {
        return false;
    }


}