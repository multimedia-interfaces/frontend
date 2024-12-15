import {CONFIRM_FORM, RESET_FORM, SET_FORM_FIELD, SET_PROFILE} from "./actions";
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
                form: {
                    ...state.form,
                    passengerName: action.payload.name,
                    passengerPhone: action.payload.phone,
                }
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
                form: {
                    ...initialState.form,
                    passengerName: state.profile.name,
                    passengerPhone: state.profile.phone,
                },
                isConfirm: false,
            };
        case CONFIRM_FORM:
            return {
                ...state,
                isConfirm: true,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}