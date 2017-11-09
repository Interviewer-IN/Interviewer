import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";


function addNewInterview(data) {
    return { type: "CREATE_INTERVIEW", payload: data.data};
}

export function createInterview(data, message) {
    let successMessage = message || 'Interview was created';
    return (dispatch) => {
        fetch("/api/v1/interviews",
            {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res =>
                res.json()
            )
            .then(data => {
                dispatch(addNewInterview(data));
                dispatch(showInterviews(data.data.id));
                dispatch(makeNote(
                    {
                        status: "success",
                        text: successMessage,
                        hide: true
                    }
                ));
            })
            .catch(function (err) {
                dispatch(makeNote(
                    {
                        status: "danger",
                        text: "Error: "+ err,
                        hide: false
                    }
                ));
            })
    }
}


function addInterviews(interviews) {
    return { type: "SHOW_INTERVIEWS", payload: interviews };
}

function setCurrentInterview(interview) {
    return { type: "SET_INTERVIEW", payload: interview };
}


export function addIdExpandedElement(data) {
    return { type: 'ID_ELEMENT', payload: data }
}


export function showInterviews(idExpandedElement = false) {
    return (dispatch) => new Promise((resolve) => {
        fetch("/api/v1/interviews",
            {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res =>
                res.json()
            )
            .then(interviews => {
                dispatch(addIdExpandedElement(idExpandedElement));
                dispatch(addInterviews(interviews.data));
                resolve(interviews.data);
            })
            .catch(function(err) {
                dispatch(makeNote(
                    {
                        status: "danger",
                        text: "Error: "+ err,
                        hide: false
                    }
                ));
            });
    });
}

export function getInterviews(id) {
    return (dispatch) => new Promise(function(resolve, reject) {
        fetch("/api/v1/interviews/" + id)
            .then(function(response) {
                return response.text();
            })
            .then(function(interview) {
                dispatch(setCurrentInterview(JSON.parse(interview).data));
                resolve(JSON.parse(interview).data);
            })
            .catch(function(error) {
                dispatch(makeNote(
                    {
                        status: "danger",
                        text: "Error: "+ error,
                        hide: false
                    }
                ));
                resolve();
            });

    });
}

export function removeInterview(id) {
    return (dispatch) => {
        fetch('/api/v1/interviews/' + id,
            {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res =>
                res.json()
            )
            .then(date => {
                dispatch(showInterviews());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: "Interview was deleted!",
                        hide: true
                    }
                ))
            })
            .catch(function(err) {
                dispatch(makeNote(
                    {
                        status: "danger",
                        text: "Error: "+ err,
                        hide: false
                    }
                ));
            });
    };
}

export function updateInterview(date, message) {
    let successMessage = message || 'Interview was updated';
    return (dispatch) => {
        fetch('/api/v1/interviews/' + date.id,
            {
                method: 'put',
                body: JSON.stringify(date),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res =>
                res.json()
            )
            .then(date => {
                dispatch(showInterviews());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: successMessage,
                        hide: true
                    }
                ))
            })
            .catch(function(err) {
                dispatch(makeNote(
                    {
                        status: "danger",
                        text: "Error: "+ err,
                        hide: false
                    }
                ));
            });
    };
}

