export const SHOW_NOTE = 'DISPLAY_NOTE';
export const HIDE_NOTE = 'HIDE_NOTE';


export function makeNote(note) {
    return (dispatch) => {
        dispatch(showNote(note));
        if (note.hide) {
            setTimeout(() => {
                dispatch(hideNote({id: note.id}));
            }, 4000)
        }
    }
}

let id = 0;

export function showNote(note) {
    id += 1;
    note.id = id;
    return {
        type: 'DISPLAY_NOTE',
        payload: note
    }
}

export function hideNote(id) {
    return {
        type: 'HIDE_NOTE',
        payload: id
    }
}