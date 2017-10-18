import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";

export const CREATE_INTERVIEW = "CREATE_INTERVIEW";
export const SHOW_INTERVIEWS = "SHOW_INTERVIEWS";
export const SET_INTERVIEW = "SET_INTERVIEW";


function addNewInterview(date) {
    return { type: CREATE_INTERVIEW, payload: date.data};
}

export function createInterview(date) {
    return (dispatch) => {
        fetch("/api/v1/interviews",
            {
                method: 'post',
                body: JSON.stringify(date),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res =>
                res.json()
            )
            .then(date => {
                let noteData = "'" + date.data.title.slice(0, 20) + "'";
                dispatch(addNewInterview(date));
                dispatch(showInterviews());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: "Interview " + noteData + "... was created!",
                        hide: true
                    }
                ))
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
    return { type: SHOW_INTERVIEWS, payload: interviews};
}

function setCurrentInterview(interview) {
    return { type: SET_INTERVIEW, payload: interview};
}

export function showInterviews() {
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
                console.log(date);
               // let noteData = "'" + date.data.title.slice(0, 20) + "'";
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

export function updateInterview(date) {
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
                let noteData = "'" + date.data.title.slice(0, 20) + "'";
                dispatch(showInterviews());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: "Interview " + noteData + "... was updated!",
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

