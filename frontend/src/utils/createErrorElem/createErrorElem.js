export function createErrorElem(element, errorMessage){
    element.parentNode.classList.add('has-error');
    let errorElem = document.createElement('span');
    errorElem.innerHTML = errorMessage;
    errorElem.classList.add('has-error');
    errorElem.classList.add('custom-error');

    return errorElem;
}
