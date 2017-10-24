import {CREATE_INTERVIEW, SHOW_INTERVIEWS, SET_INTERVIEW} from "../actions/interviewActions";

const initialState = {
    interviews: [],
    newInterview: {
        interviewId:"",
        candidateId:"",
        date_time:""
    },
    currentInterview: {}
};


export default function interviews (state = initialState, action) {

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