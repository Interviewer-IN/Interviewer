//Remove all error messages on the form

export function removeAllErrorMessages (currentForm){
    let allErrorMessages = currentForm.querySelectorAll('span.has-error'),
        allErrorTitles = currentForm.querySelectorAll('div.has-error');

    for (let i = 0; i < allErrorTitles.length; i++) {
        allErrorTitles[i].classList.remove('has-error');
    }

    for (let i = 0; i < allErrorMessages.length; i++) {
        allErrorMessages[i].remove();
    }
}