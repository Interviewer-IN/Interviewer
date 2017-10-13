import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";



function addCandidates(data) {
    return {
        type: 'ADD_CANDIDATES',
        payload: data.data
    }
}

export function getCandidates() {
    return (dispatch) => {
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
            })
            .catch(error => {
                dispatch(makeNote({
                    status: 'danger',
                    text: 'Error: ' + error,
                    hide: false
                }))
            })
    }
}

export function deleteCandidate(id) {
    console.log(id);
    return (dispatch) => {
        fetch('/api/v1/candidates/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.status);
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
                        text: "Candidate was deleted",
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