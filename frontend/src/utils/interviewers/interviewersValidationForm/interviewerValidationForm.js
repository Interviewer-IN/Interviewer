import {removeAllErrorMessages} from './../../removeAllErrorMessages/removeAllErrorMessages';
import {createErrorElem} from './../../createErrorElem/createErrorElem';
import {FIELD_CHAR_REGEX, LETTERS_ONLY, EMAIL_VALIDATION} from "../../../config";

export function interviewersValidationForm(event) {
    let currentForm = event.target,
        nameElem = this.refs.interviewerName,
        nameVal = this.state.nameVal,
        namePass = false,
        surnameElem = this.refs.interviewerSurname,
        surnameVal = this.state.surnameVal,
        surnamePass = false,
        emailElem = this.refs.interviewerEmail,
        emailVal = this.state.emailVal,
        emailPass = false,
        levelElem = this.refs.interviewerLevel,
        levelVal = this.state.levelVal,
        levelIndex = this.refs.interviewerLevel.options.selectedIndex,
        levelPass = false,
        positionElem = this.refs.interviewerPosition,
        positionVal = this.state.positionVal,
        positionIndex = this.refs.interviewerPosition.options.selectedIndex,
        positionPass = false,
        descriptionElem = document.getElementById('interviewer-description'),
        descriptionVal = this.state.descriptionVal,
        descriptionPass = false;

    let interviewerValidationSettings = {
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
            email: {
                required: true,
                pattern: EMAIL_VALIDATION,
                minLength: 2
            },

            position: {
                required: true
            },
            level: {
                required: true
            },
            description: {
                required: false,
                pattern: FIELD_CHAR_REGEX
            },

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
            email: {
                required: "Please enter email",
                format: "Please enter a valid email address",
                minLength: "Name should contain minimum 2 characters"
            },
            position: {
                required: "Please select position"
            },
            level: {
                required: "Please select level"
            },
            description: {
                required: "Please enter description",
                format: "Please use only latin letters, numbers and special symbols"
            }
        }
    };

    removeAllErrorMessages(currentForm);

    if (interviewerValidationSettings.rules.name.required || nameVal) {
        if (nameVal) {
            if (nameVal.length >= interviewerValidationSettings.rules.name.minLength){
                if (nameVal.match(interviewerValidationSettings.rules.name.pattern)) {
                    namePass = true;
                } else {
                    nameElem.parentNode.appendChild(createErrorElem(nameElem, interviewerValidationSettings.messages.name.format));
                    namePass = false;
                }
            } else {
                namePass = false;
                nameElem.parentNode.appendChild(createErrorElem(nameElem, interviewerValidationSettings.messages.name.minLength));
            }

        } else {
            nameElem.parentNode.appendChild(createErrorElem(nameElem, interviewerValidationSettings.messages.name.required));
            namePass = false;
        }
    } else {
        namePass = true;
    }

    if (interviewerValidationSettings.rules.surname.required || surnameVal) {
        if (surnameVal) {
            if (surnameVal.length >= interviewerValidationSettings.rules.surname.minLength){
                if (surnameVal.match(interviewerValidationSettings.rules.surname.pattern)) {
                    surnamePass = true;
                } else {
                    surnameElem.parentNode.appendChild(createErrorElem(surnameElem, interviewerValidationSettings.messages.surname.format));
                    surnamePass = false;
                }
            } else {
                surnameElem.parentNode.appendChild(createErrorElem(surnameElem, interviewerValidationSettings.messages.surname.minLength));
                surnamePass = false;
            }

        } else {
            surnameElem.parentNode.appendChild(createErrorElem(surnameElem, interviewerValidationSettings.messages.surname.required));
            surnamePass = false;
        }
    } else {
        surnamePass = true;
    }

    if (interviewerValidationSettings.rules.email.required || emailVal) {
        if (emailVal) {
            if (emailVal.match(interviewerValidationSettings.rules.email.pattern)) {
                emailPass = true;
            } else {
                emailElem.parentNode.appendChild(createErrorElem(emailElem, interviewerValidationSettings.messages.email.format));
                emailPass = false;
            }
        } else {
            emailElem.parentNode.appendChild(createErrorElem(emailElem, interviewerValidationSettings.messages.email.required));
            emailPass = false;
        }
    } else {
        emailPass = true;
    }

    if (interviewerValidationSettings.rules.position.required) {
        if (!positionIndex) {
            positionElem.parentNode.appendChild(createErrorElem(positionElem, interviewerValidationSettings.messages.position.required));
            positionPass = false;
        } else {
            positionPass = true;
        }
    } else {
        positionPass = true;
    }

    if (interviewerValidationSettings.rules.level.required) {
        if (!levelIndex) {
            levelElem.parentNode.appendChild(createErrorElem(levelElem, interviewerValidationSettings.messages.level.required));
            levelPass = false;
        } else {
            levelPass = true;
        }
    } else {
        levelPass = true;
    }

    if (interviewerValidationSettings.rules.description.required || descriptionVal) {
        if (descriptionVal) {
            if (descriptionVal.match(interviewerValidationSettings.rules.description.pattern)) {
                descriptionPass = true;
            } else {
                descriptionElem.parentNode.appendChild(createErrorElem(descriptionElem, interviewerValidationSettings.messages.description.format));
                descriptionPass = false;
            }

        } else {
            descriptionElem.parentNode.appendChild(createErrorElem(descriptionElem, interviewerValidationSettings.messages.description.required));
            descriptionPass = false;
        }
    } else {
        descriptionPass = true;
    }

    if (namePass && surnamePass && emailPass && positionPass && levelPass && descriptionPass){
        return true;
    } else {
        return false;
    }

}