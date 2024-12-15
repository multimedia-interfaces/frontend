import {RESET_FORM, SET_FORM_FIELD, SET_PROFILE} from "./actions";
import {initialState} from "./provider";

export function reducer(state, action) {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...action.payload,
                },
            };
        case SET_FORM_FIELD:
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value,
                },
            };
        case RESET_FORM:
            return {
                ...state,
                form: initialState.form,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}