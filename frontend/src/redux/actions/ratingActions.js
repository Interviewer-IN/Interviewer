import fetch from "isomorphic-fetch";
import {makeNote} from "./notificationActions";



function addRatings (data) {
    return {
        type: 'ADD_RATINGS',
        payload: data.data

    }
}

export function getRatings() {
    return (dispatch) => new Promise ((resolve) => {
        fetch('/api/v1/ratings',
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
                dispatch(addRatings(data));
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