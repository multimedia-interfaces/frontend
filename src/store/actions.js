export const SET_PROFILE = 'SET_PROFILE';
export const SET_FORM_FIELD = 'SET_FORM_FIELD';
export const RESET_FORM = 'RESET_FORM';
export const CONFIRM_FORM = 'CONFIRM_FORM';

export const setProfile = (profile) => ({
    type: SET_PROFILE,
    payload: profile,
});

export const setFormField = (field, value) => ({
    type: SET_FORM_FIELD,
    field,
    value,
});

export const resetForm = () => ({
    type: RESET_FORM,
});

export const confirmForm = () => ({
    type: CONFIRM_FORM,
});