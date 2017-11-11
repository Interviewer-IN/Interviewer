import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";


function addVacancies(data) {
    return {
        type: 'ADD_VACANCIES',
        payload: data.data
    }
}

export function addIndexExpandedElement(data) {
    return {
        type: 'INDEX_ELEMENT',
        payload: data

    }
}

export function getVacancies(indexExpandedElement = false) {
    return (dispatch) => new Promise((resolve) =>{

        fetch('/api/v1/vacancies',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                switch (response.status) {
                    case 200:
                    case 201:
                        return response.json();

                    default:
                        return {data: []}
                }
            })
            .then(data => {
                dispatch(addIndexExpandedElement(indexExpandedElement));
                dispatch(addVacancies(data));
                resolve(data.data);
            })
            .catch((error) => {
                dispatch(makeNote({
                    status: 'danger',
                    text: 'Error: ' + error,
                    hide: false
                }));
                resolve(error);
            })
    })
}

function addVacancy(data) {
    return {
        type: 'ADD_VACANCY',
        payload: data.data

    }
}

export function getVacancy(vacancyId) {
    return (dispatch) => new Promise((resolve) => {
        fetch('/api/v1/vacancies/' + vacancyId)
            .then(response => {
                switch (response.status) {
                    case 200:
                    case 201:
                        return response.json();

                    default:
                        return {data: []}
                }
            })
            .then(data => {
                dispatch(addVacancy(data));
                resolve(data.data);
            })
            .catch((error) => {
                dispatch(makeNote({
                    status: 'danger',
                    text: 'Error: ' + error,
                    hide: false
                }));
                resolve();
            })
    });
}


function addNewVacancy(data) {
    return {
        type: 'CREATE_VACANCY',
        payload: data.data
    }
}


export function createVacancy(data, message, backPath, openPanelIndex = 0) {
    let successMessage = message || 'Vacancy was created';
    return (dispatch) => {
        fetch('/api/v1/vacancies',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                switch (response.status) {
                    case 200:
                    case 201:
                        return response.json();
                    default:
                        return {data: []}
                }
            })
            .then(data => {
                dispatch(addNewVacancy(data));
                dispatch(getVacancies(openPanelIndex));
                dispatch(makeNote(
                    {
                        status: "success",
                        text: successMessage,
                        hide: true
                    }
                ));
                if (backPath) {
                    window.location.replace(backPath);
                }

            })
            .catch((error) => {
                dispatch(makeNote({
                    status: 'danger',
                    text: 'Error: ' + error,
                    hide: false
                }))
            })
    }
}

export function updateVacancy(data, message, backPath) {
    let successMessage = message || 'vacancy was updated';
    return (dispatch) => {
        fetch('/api/v1/vacancies/' + data.id,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                switch (response.status) {
                    case 200:
                    case 201:
                        return response.json();
                    default:
                        return {data: []}
                }
            })
            .then(data => {
                dispatch(getVacancies());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: successMessage,
                        hide: true
                    }
                ));

                if (backPath !== undefined) {
                    window.location.replace(backPath);
                }
            })
            .catch((error) => {
                dispatch(makeNote({
                    status: 'danger',
                    text: 'Error: ' + error,
                    hide: false
                }))
            })
    }
}

export function deleteVacancy(id) {
    return (dispatch) => {
        fetch('/api/v1/vacancies/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                switch (response.status) {
                    case 200:
                    case 201:
                        return response.json();
                    case 500:
                        return {data: 500};
                    default:
                        return {data: []}
                }
            })
            .then(data => {
                switch (data.data) {
                    case 500:
                        dispatch(makeNote({
                            status: 'warning',
                            text: 'Error: You have an associated entity with this vacancy',
                            hide: true
                        }));
                        return;
                    case undefined:
                        let error = data.error;

                        dispatch(makeNote({
                            status: 'danger',
                            text: 'Error: ' + error,
                            hide: false
                        }));
                        return;
                    default:
                        dispatch(getVacancies());
                        dispatch(makeNote(
                            {
                                status: "success",
                                text: "Vacancy was deleted",
                                hide: true
                            }
                        ));
                        return;
                }
            })
            .catch((error) => {
                dispatch(makeNote({
                    status: 'danger',
                    text: 'Error: ' + error,
                    hide: false
                }))
            })
    }
}

