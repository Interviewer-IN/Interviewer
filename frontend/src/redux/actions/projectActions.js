import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";

export const CREATE_PROJECT = "CREATE_PROJECT";
export const SHOW_PROJECTS = "SHOW_PROJECTS";
export const REMOVE_PROJECT = "REMOVE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const SET_PROJECT = "SET_PROJECT";


function addNewProject(date) {
    return { type: CREATE_PROJECT, payload: date.data};
}

export function createProject(date) {
    return (dispatch) => {
        fetch("/api/v1/projects",
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
                dispatch(addNewProject(date));
                dispatch(showProjects());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: "Project " + noteData + "... was created!",
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


function addProjects(projects) {
    return { type: SHOW_PROJECTS, payload: projects};
}

function setCurrentProject(project) {
    return { type: SET_PROJECT, payload: project};
}

export function showProjects() {
    return (dispatch) => {
        fetch("/api/v1/projects",
            {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res =>
                res.json()
            )
            .then(projects => {
                dispatch(addProjects(projects.data));
            })
            .catch(function(err) {
                dispatch(makeNote(
                    {
                        status: "danger",
                        text: "Error: "+ err,
                        hide: false
                    }
                ));
            })
    };
}

export function getProjects(id) {
    return (dispatch) => new Promise(function(resolve, reject) {
        fetch("/api/v1/projects/" + id)
            .then(function(response) {
                return response.text();
            })
            .then(function(project) {
                dispatch(setCurrentProject(JSON.parse(project).data));
                resolve(JSON.parse(project).data);
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

export function removeProject(id) {
    return (dispatch) => {
        fetch('/api/v1/projects/' + id,
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
                let noteData = "'" + date.data.title.slice(0, 20) + "'";
                dispatch(showProjects());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: "Project " + noteData + "... was deleted!",
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

export function updateProject(date) {
    return (dispatch) => {
        fetch('/api/v1/projects/' + date.id,
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
                dispatch(showProjects());
                dispatch(makeNote(
                    {
                        status: "success",
                        text: "Project " + noteData + "... was updated!",
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

