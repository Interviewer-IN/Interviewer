import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";



function addPositions (data) {
    return {
        type: 'ADD_POSITIONS',
        payload: data.data

    }
}

export function getPositions() {
    return (dispatch) => new Promise ((resolve) => {
        fetch('/api/v1/positions',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                switch (response.status){
                    case 200:
                    case 201:
                        return response.json();

                    default:
                        return {data: []}
                }
            })
            .then(data => {
                dispatch(addPositions(data));
                resolve(data.data);
            })
            .catch((error) => {
                dispatch(makeNote({
                    status: 'danger',
                    text: 'Error: ' + error,
                    hide: false
                }))
            })
    });
}