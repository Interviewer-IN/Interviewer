import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";



function addCandidates(data) {
    return {
        type: 'ADD_CANDIDATES',
        payload: data.data
    }
}

export function getCandidates() {
    return (dispatch) => new Promise((resolve) => {
        fetch('/api/v1/candidates',
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
                dispatch(addCandidates(data));
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
    });
}

function addCandidate(data) {
    return {
        type: 'CURRENT_CANDIDATE',
        payload: data.data

    }
}

export function getCandidate(candidateId) {
    return (dispatch) => new Promise((resolve) => {
        fetch('/api/v1/candidates/' + candidateId)
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
                dispatch(addCandidate(data));
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


function addNewCandidate(data) {
    return {
        type: 'ADD_CANDIDATE',
        payload: data.data
    }
}

export function createCandidate(data, message, backPath) {
    let successMessage = message || 'Candidate was added';
    return (dispatch) => {
        fetch('/api/v1/candidates',
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
                dispatch(addNewCandidate(data));
                dispatch(getCandidates());
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

export function updateCandidate(data, message, backPath) {
    let successMessage = message || 'Candidate was updated';
    return (dispatch) => {
        fetch('/api/v1/candidates/' + data.id,
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
                dispatch(getCandidates());
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

export function deleteCandidate(id) {
    return (dispatch) => {
        fetch('/api/v1/candidates/' + id,
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
               switch (data.data){
                   case 500:
                       dispatch(makeNote({
                           status: 'warning',
                           text: 'Error: You have an associated entity with this candidate',
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
                       dispatch(getCandidates());
                       dispatch(makeNote(
                           {
                               status: "success",
                               text: "Candidate was deleted",
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