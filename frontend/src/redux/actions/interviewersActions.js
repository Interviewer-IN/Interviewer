import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";

function addInterviewers(data) {
    return {
        type: 'ADD_INTERVIEWERS',
        payload: data.data

    }
}

export function getInterviewers (){
    return (dispatch) => new Promise(resolve => {
        fetch('/api/v1/users',
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
                dispatch(addInterviewers(data));
                resolve(data.data);
            })
            .catch(error => {
                dispatch(makeNote({
                    status: 'danger',
                    text: 'Error: ' + error,
                    hide: false
                }));
                resolve(error);
            })
    })
}

function addInterviewer(data) {
    return {
        type: 'CURRENT_INTERVIEWER',
        payload: data.data

    }
}

export function getInterviewer(interviewerId) {
    return (dispatch) => new Promise((resolve) => {
        fetch('/api/v1/users/' + interviewerId)
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
                dispatch(addInterviewer(data));
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


function addNewInterviewer(data) {
    return {
        type: 'ADD_INTERVIEWER',
        payload: data.data
    }
}

export function createInterviewer(data, message, backPath) {
    let successMessage = message || 'Interviewer was added';
    return (dispatch) => {
        fetch('/api/v1/users',
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
                dispatch(addNewInterviewer(data));
                dispatch(getInterviewers());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: successMessage,
                        hide: true
                    }
                ));
                if (backPath){
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

export function updateInterviewer(data, message, backPath) {
    let successMessage = message || 'Interviewer was updated';
    return (dispatch) => {
        fetch('/api/v1/users/' + data.id,
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
                dispatch(getInterviewers());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: successMessage,
                        hide: true
                    }
                ));

                if (backPath !== undefined){
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

export function deleteInterviewer(id) {
    return (dispatch) => {
        fetch('/api/v1/users/' + id,
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
                        return response.json();

                    default:
                        return {data: []}
                }
            })
            .then(data => {
                if (data.data === undefined) {
                    let error = data.error;

                    dispatch(makeNote({
                        status: 'danger',
                        text: 'Error: ' + error,
                        hide: false
                    }));
                } else {
                    dispatch(getInterviewers());
                    dispatch(makeNote(
                        {
                            status: "success",
                            text: "Interviewer was deleted",
                            hide: true
                        }
                    ));
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