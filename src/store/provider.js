import React, {createContext, useReducer} from "react";
import {reducer} from "./reducer";

export const initialState = {
    profile: {
        name: '',
        phone: '',
    },
    form: {
        pickupLocation: '',
        dropoffLocation: '',
        carType: null,
        services: [],
        passengerName: '',
        passengerPhone: '',
    },
    isConfirm: false,
};

export const StoreContext = createContext();

export const StoreProvider = ({ children, initialProfile }) => {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        profile: initialProfile || initialState.profile,
    });

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};