import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";

function addLevels(data) {
    return {
        type: 'ADD_LEVELS',
        payload: data.data
    }
}

export function getLevels() {
    return (dispatch) => {
        fetch('/api/v1/levels',
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
                dispatch(addLevels(data));
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
