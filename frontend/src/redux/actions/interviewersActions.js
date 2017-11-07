import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";

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

function addInterviewers(data) {
    return {
        type: 'ADD_INTERVIEWERS',
        payload: data.data

    }
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