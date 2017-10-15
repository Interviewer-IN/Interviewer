import {CREATE_INTERVIEW, SHOW_INTERVIEWS, SET_INTERVIEW} from "../actions/interviewActions";

const initialState = {
    interviews: [],
    newInterview: {

    },
    currentInterview: {}
};


export default function interview(state = initialState, action) {

    switch (action.type) {
        case CREATE_INTERVIEW:
            return {
                ...state,
                newInterview: {...state,

                }
            };
        case SHOW_INTERVIEWS:
            return { ...state, interviews: action.payload};
        case SET_INTERVIEW:
            return { ...state, currentInterview: action.payload};
        default:
            return state;
    }
}