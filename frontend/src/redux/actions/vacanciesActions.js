import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";


function addVacancies(data) {
    return {
        type: 'ADD_VACANCIES',
        payload: data.data

    }
}

export function getVacancies() {
    return (dispatch) => {
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
                console.log('DATA: ', data);
                dispatch(addVacancies(data));
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
                console.log('DATA: ', data);
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


export function createVacancy(data, backPath) {
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
                dispatch(getVacancies());
                dispatch(addNewVacancy(data));
                dispatch(makeNote(
                    {
                        status: "success",
                        text: "Vacancy was created successfully!",
                        hide: true
                    }
                ));
                window.location.replace(backPath);

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

export function updateVacancy(data, backPath) {
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
                        text: "Vacancy was updated successfully!",
                        hide: true
                    }
                ));

                window.location.replace(backPath);
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
                    default:
                        return {data: []}
                }
            })
            .then(data => {
                dispatch(getVacancies());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: "Vacancy was deleted successfully!",
                        hide: true
                    }
                ));
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

