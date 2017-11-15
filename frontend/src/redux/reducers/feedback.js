
const initialState = {
    feedbacks: [],
    interviewFeedbacks: [],
    newFeedback: {
        state: "",
        interview_id: "",
        question_id: "",
        answer: ""
    },
    currentFeedback: {},
};

export default function interviews (state = initialState, action) {

    switch (action.type) {
        case "CREATE_FEEDBACK":
            return {
                ...state,
                newFeedback: {...state,
                    interview_id: action.payload.interview_id,
                    question_id: action.payload.question_id,
                    answer: action.payload.answer,
                }
            };
        case "SHOW_FEEDBACKS":
            return { ...state, feedbacks: action.payload};
        case "SET_FEEDBACK":
            return { ...state, currentFeedback: action.payload};
        case "SET_INTERVIEW_FEEDBACKS":
            return { ...state, interviewFeedbacks: action.payload};
        default:
            return state;
    }
}