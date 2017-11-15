import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";


function addNewFeedback(data) {
    return { type: "CREATE_FEEDBACK", payload: data.data};
}

export function createFeedback(data, rating, message) {
    let successMessage = message || 'Feedback was created';
    return (dispatch) => new Promise((resolve, reject) => {
        fetch("/api/v1/feedbacks",
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
                dispatch(addNewFeedback(data));
                resolve(data);
            })
            .catch(function (err) {
                dispatch(makeNote(
                    {
                        status: "danger",
                        text: "Error: "+ err,
                        hide: false
                    }
                ));
                resolve();
            })
    });
}

function addFeedbacks(feedbacks) {
    return { type: "SHOW_FEEDBACKS", payload: feedbacks };
}

function setCurrentFeedback(feedback) {
    return { type: "SET_FEEDBACK", payload: feedback };
}

export function showFeedbacks() {
    return (dispatch) => new Promise((resolve) => {
        fetch("/api/v1/feedbacks",
            {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res =>
                res.json()
            )
            .then(feedbacks => {
                dispatch(addFeedbacks(feedbacks.data));
                resolve(feedbacks.data);
            })
            .catch(function(err) {
                dispatch(makeNote(
                    {
                        status: "danger",
                        text: "Error: "+ err,
                        hide: false
                    }
                ));
                resolve();
            });
    });
}

export function getFeedback(id) {
    return (dispatch) => new Promise(function(resolve, reject) {
        fetch("/api/v1/feedbacks/" + id)
            .then(function(response) {
                return response.text();
            })
            .then(function(feedback) {
                dispatch(setCurrentFeedback(JSON.parse(feedback).data));
                resolve(JSON.parse(feedback).data);
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

function setInterviewFeedbacks(feedbacks) {
    return { type: "SET_INTERVIEW_FEEDBACKS", payload: feedbacks };
}

export function getInterviewFeedbacks(id) {
    return (dispatch) => new Promise(function(resolve, reject) {
        fetch("/api/v1/feedbacks?interview_id=" + id)
            .then(function(response) {
                return response.text();
            })
            .then(function(feedbacks) {
                dispatch(setCurrentFeedback(JSON.parse(feedbacks).data));
                resolve(JSON.parse(feedbacks).data);
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

export function removeFeedback(id) {
    return (dispatch) => {
        fetch('/api/v1/feedbacks/' + id,
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
                dispatch(showFeedbacks());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: "Feedback was deleted!",
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

export function updateFeedback(date, message) {
    let successMessage = message || 'Feedback was updated';
    return (dispatch) => {
        fetch('/api/v1/feedbacks/' + date.id,
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
                dispatch(showFeedbacks());
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

