import {removeAllErrorMessages} from './../../removeAllErrorMessages/removeAllErrorMessages'
import {createErrorElem} from './../../createErrorElem/createErrorElem';
import {fieldCharRegex, LETTERS_ONLY, EMAIL_VALIDATION} from "../../../config";

export function userInfoValidationForm(event){

    let currentForm = event.target,
        nameElem = this.refs.userName,
        nameVal = this.state.nameVal,
        namePass = false,
        surnameElem = this.refs.userSurname,
        surnameVal = this.state.surnameVal,
        surnamePass = false,
        userEmailElem = this.refs.userEmail,
        userEmailVal = this.state.userEmailVal,
        userEmailPass = false,
        passwordElem = this.refs.userPassword,
        passwordVal = this.state.userPasswordVal,
        passwordPass = false;



    //--  VALIDATION FORM  -------------

    let userInfoValidationSettings = {
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
                pattern: EMAIL_VALIDATION
            },
            password: {
                required: false,
                minLength: {
                    checkMinLength: true,
                    minLengthVal: 6
                }
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
            email: {
                required: "Please enter email",
                format: "Please enter a valid email address"
            },
            password: {
                required: "Please enter password",
                minLength: "Password should contain minimum 6 characters"
            }

        }
    };

    removeAllErrorMessages(currentForm);

    if (userInfoValidationSettings.rules.name.required || nameVal) {
        if (nameVal) {
            if (nameVal.length >= userInfoValidationSettings.rules.name.minLength){
                if (nameVal.match(userInfoValidationSettings.rules.name.pattern)) {
                    namePass = true;
                } else {
                    nameElem.parentNode.appendChild(createErrorElem(nameElem, userInfoValidationSettings.messages.name.format));
                    namePass = false;
                }
            } else {
                namePass = false;
                nameElem.parentNode.appendChild(createErrorElem(nameElem, userInfoValidationSettings.messages.name.minLength));
            }

        } else {
            nameElem.parentNode.appendChild(createErrorElem(nameElem, userInfoValidationSettings.messages.name.required));
            namePass = false;
        }
    } else {
        namePass = true;
    }

    if (userInfoValidationSettings.rules.surname.required || surnameVal) {
        if (surnameVal) {
            if (surnameVal.length >= userInfoValidationSettings.rules.surname.minLength){
                if (surnameVal.match(userInfoValidationSettings.rules.surname.pattern)) {
                    surnamePass = true;
                } else {
                    surnameElem.parentNode.appendChild(createErrorElem(surnameElem, userInfoValidationSettings.messages.surname.format));
                    surnamePass = false;
                }
            } else {
                surnameElem.parentNode.appendChild(createErrorElem(surnameElem, userInfoValidationSettings.messages.surname.minLength));
                surnamePass = false;
            }

        } else {
            surnameElem.parentNode.appendChild(createErrorElem(surnameElem, userInfoValidationSettings.messages.surname.required));
            surnamePass = false;
        }
    } else {
        surnamePass = true;
    }


    if (userInfoValidationSettings.rules.email.required || userEmailVal) {
        if (userEmailVal) {
            if (userEmailVal.match(userInfoValidationSettings.rules.email.pattern)) {
                userEmailPass = true;
            } else {
                userEmailElem.parentNode.appendChild(createErrorElem(userEmailElem, userInfoValidationSettings.messages.email.format));
                userEmailPass = false;
            }

        } else {
            userEmailElem.parentNode.appendChild(createErrorElem(userEmailElem, userInfoValidationSettings.messages.email.required));
            userEmailPass = false;
        }
    } else {
        userEmailPass = true;
    }

    if (userInfoValidationSettings.rules.password.required || passwordVal){
        if (userInfoValidationSettings.rules.password.minLength.checkMinLength) {
            if (passwordVal.length < userInfoValidationSettings.rules.password.minLength.minLengthVal) {

                passwordElem.parentNode.appendChild(createErrorElem(passwordElem, userInfoValidationSettings.messages.password.minLength));
                passwordPass = false;
            } else {
                passwordPass = true;
            }

        } else {
            passwordPass = true;
        }
    } else {
        passwordPass = true;
    }





    if (namePass && surnamePass && userEmailPass && passwordPass) {
        return true;

    } else {
        return false;
    }


}