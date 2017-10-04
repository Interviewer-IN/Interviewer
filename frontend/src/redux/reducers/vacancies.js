const initialState = {
    vacancies: []
};

export default function vacancies (state = initialState, action) {
        switch (action.type){
            case 'ADD_VACANCIES':
                return {
                    ...state, vacancies: action.payload
                };
            default:
                return state;
        }
}