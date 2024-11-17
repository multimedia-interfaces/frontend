import axios from 'axios';
import {API_HOST} from "../constants/api";

export const register = async (data) => {
    try {
        const response = await axios.post(`${API_HOST}/auth/registration`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};