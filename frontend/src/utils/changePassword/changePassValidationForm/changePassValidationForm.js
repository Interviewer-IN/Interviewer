import {removeAllErrorMessages} from './../../removeAllErrorMessages/removeAllErrorMessages'
import {createErrorElem} from './../../createErrorElem/createErrorElem';


export function changePassValidationForm(event){

    let currentForm = event.target,

        oldPassElem = this.refs.oldPassword,
        oldPassVal = this.state.oldPassword,
        oldPasswordPass = false,
        newPassElem = this.refs.newPassword,
        newPassVal = this.state.newPassword,
        newPasswordPass = false,
        retypePassElem = this.refs.retypePassword,
        retypePassVal = this.state.retypePassword,
        retypePasswordPass = false,
        equalPassword = false;


    //--  VALIDATION FORM  -------------

    let changePassValidationSettings = {
        rules: {
            oldPass: {
                required: false,
                minLength: {
                    checkMinLength: true,
                    minLengthVal: 6
                }
            },
            newPass: {
                required: true,
                minLength: {
                    checkMinLength: true,
                    minLengthVal: 6
                }
            },
            retypePass: {
                required: true,
                minLength: {
                    checkMinLength: true,
                    minLengthVal: 6
                }
            },
        },
        messages: {
            general: {
                notEqual: "'Re-type new password' is not equal with the 'New password'"
            },
            oldPass: {
                required: "Please enter password",
                minLength: "Password should contain minimum 6 characters"
            },
            newPass: {
                required: "Please enter password",
                minLength: "Password should contain minimum 6 characters"
            },
            retypePass: {
                required: "Please enter password",
                minLength: "Password should contain minimum 6 characters"
            }
        }
    };

    removeAllErrorMessages(currentForm);

    if (changePassValidationSettings.rules.oldPass.required || oldPassVal){
        if (changePassValidationSettings.rules.oldPass.minLength.checkMinLength) {
            if (oldPassVal.length < changePassValidationSettings.rules.oldPass.minLength.minLengthVal) {

                oldPassElem.parentNode.appendChild(createErrorElem(oldPassElem, changePassValidationSettings.messages.oldPass.minLength));
                oldPasswordPass = false;
            } else {
                oldPasswordPass = true;
            }

        } else {
            oldPasswordPass = true;
        }
    } else {
        oldPasswordPass = true;
    }

    if (changePassValidationSettings.rules.newPass.required || newPassVal){
        if (changePassValidationSettings.rules.newPass.minLength.checkMinLength) {
            if (newPassVal.length < changePassValidationSettings.rules.newPass.minLength.minLengthVal) {

                newPassElem.parentNode.appendChild(createErrorElem(newPassElem, changePassValidationSettings.messages.newPass.minLength));
                newPasswordPass = false;
            } else {
                newPasswordPass = true;
            }

        } else {
            newPasswordPass = true;
        }
    } else {
        newPasswordPass = true;
    }

    if (changePassValidationSettings.rules.oldPass.required || retypePassVal){
        if (changePassValidationSettings.rules.retypePass.minLength.checkMinLength) {
            if (retypePassVal.length < changePassValidationSettings.rules.retypePass.minLength.minLengthVal) {

                retypePassElem.parentNode.appendChild(createErrorElem(retypePassElem, changePassValidationSettings.messages.retypePass.minLength));
                retypePasswordPass = false;
            } else {
                retypePasswordPass = true;
            }

        } else {
            retypePasswordPass = true;
        }
    } else {
        retypePasswordPass = true;
    }

    if (retypePasswordPass && newPasswordPass) {
        if (newPassVal === retypePassVal){
            equalPassword = true;
        } else {
            equalPassword = false;
            retypePassElem.parentNode.appendChild(createErrorElem(retypePassElem, changePassValidationSettings.messages.general.notEqual));
        }
    }





    if (oldPasswordPass && newPasswordPass && retypePasswordPass && equalPassword) {
        return true;

    } else {
        return false;
    }


}