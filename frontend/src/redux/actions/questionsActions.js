import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";



function addQuestions(questions) {

    return { type: "SHOW_QUESTIONS", payload: questions };
}

function setCurrentQuestion(question) {
    return { type: "SET_QUESTION", payload: question };
}


export function getQuestions() {
    return (dispatch) => new Promise((resolve) => {
        fetch("/api/v1/questions",
            {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res =>
                res.json()
            )
            .then(questions => {
                dispatch(addQuestions(questions.data));
                resolve(questions.data);
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

export function getQuestion(id) {
    return (dispatch) => new Promise(function(resolve, reject) {
        fetch("/api/v1/questions/" + id)
            .then(function(response) {
                return response.text();
            })
            .then(function(question) {
                dispatch(setCurrentQuestion(JSON.parse(question).data));
                resolve(JSON.parse(question).data);
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


