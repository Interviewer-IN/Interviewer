
const initialState = {
    interviews: [],
    newInterview: {
        state: "",
        date_time:"",
        candidateID:"",
        vacancyID:"",
        userID: "",
        ratingID:"",
    },
    currentInterview: {},
    idExpandedElement: ""
};

export default function interviews (state = initialState, action) {

    switch (action.type) {
        case "CREATE_INTERVIEW":
            return {
                ...state,
                newInterview: {...state,
                    date_time: action.payload.date_time,
                    candidateID: action.payload.candidateID,
                    vacancyID: action.payload.vacancyID,
                    userID: action.payload.userID,
                    ratingID: action.payload.ratingID
                }
            };
        case "SHOW_INTERVIEWS":
            return { ...state, interviews: action.payload};
        case "SET_INTERVIEW":
            return { ...state, currentInterview: action.payload};
        case 'ID_ELEMENT':
            return { ...state, idExpandedElement: action.payload};
        default:
            return state;
    }
}