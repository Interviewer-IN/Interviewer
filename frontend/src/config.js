export const FIELD_CHAR_REGEX = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
export const LETTERS_ONLY = /^[a-zA-Z]*$/;
export const FIELD_SPACE_REGEX = /^\s*$/;
export const EMAIL_VALIDATION = /^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i;

export const TYPE_FILES = '.pdf,.doc,.docx';

export const TYPE_FILE_ERROR_TEXT = 'Please, choose the file with ' + TYPE_FILES + ' extensions';




//-- FORM ----------
export const GET_EMPTY_DATA = 'no information available';



//-- MODAL ---------
export const CONFIRM_TEXT = 'Are you sure you want to cancel without saving changes?';

export const DELETE_VACANCY = 'Are you sure you want to delete the vacancy?';
export const REOPEN_VACANCY = 'Vacancy was reopened';
export const CLOSE_VACANCY = 'Vacancy was closed';
export const DUPLICATE_VACANCY = 'Vacancy was duplicated';

export const DELETE_CANDIDATE = 'Are you sure you want to delete the candidate?';

export const DELETE_INTERVIEWER = 'Are you sure you want to delete the interviewer?';



//-- PANEL ---------
export const EXPANDED_ELEMENT_INDEX = 1; //index of the panel which should be opened after duplicating process.
