
const initialState = {
    questions: [],
    currentQuestion: {},
};

export default function questions (state = initialState, action) {

    switch (action.type) {
        case "SHOW_QUESTIONS":
            return { ...state, questions: action.payload};
        case "SET_QUESTION":
            return { ...state, currentQuestion: action.payload};
        default:
            return state;
    }
}