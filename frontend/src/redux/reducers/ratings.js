const initialState = {
    ratings: []
};

export default function ratings (state = initialState, action) {
    switch (action.type){
        case 'ADD_RATINGS':
            return {
                ...state, ratings: action.payload
            };
        default:
            return state;
    }
}