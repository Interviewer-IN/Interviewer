//Remove the error for the current input field


export function removeCurrentError(event) {
    if (event.target.nextSibling !== null) {
        event.target.parentNode.classList.remove('has-error');
        event.target.nextSibling.remove();
    }
}