const initialState = {
    status: false,
};

export default function sideBar(state = initialState, action) {
    switch (action.type) {
        case 'SET_VISIBILITY_SIDE_BAR':
            return {
                ...state,
                status: action.payload
            };

        case 'REMOVE_VISIBILITY_SIDE_BAR':
            return {
                ...state,
                status: action.payload
            };
        default:
            return state;
    }
}

