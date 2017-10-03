import {SHOW_NOTE, HIDE_NOTE} from "../actions/notificationActions";

const initialState = {
    notifications: []
};


export default function project(state = initialState, action) {
    switch (action.type) {

        case SHOW_NOTE:
            let note = {};
            note.status = action.payload.status;
            note.text = action.payload.text;
            note.hide = action.payload.hide;
            note.id = action.payload.id;
            note.show = true;

            return {
                ...state,
                notifications: [...state.notifications, note]
            };

        case HIDE_NOTE:
            let notesArray = state.notifications;
            let currentID = action.payload.id;
            let currentNote = notesArray.find(function (item) {
                return item.id === currentID ;
            });
            currentNote.show = false;
            return {
                ...state,
                notifications: [...state.notifications]
            };
        default:
            return state;
    }
}