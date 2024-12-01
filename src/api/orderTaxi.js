import axios from 'axios';
import {API_HOST} from "../constants/api";

const getAuthToken = () =>  localStorage.getItem('authToken');

export const initiateTaxiCall = async () => {
    try {
        const response = await axios.post(`${API_HOST}/initializations`, '', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch initializations data');
    }
};

export const updateTaxiCall = async (id, data) => {
    try {
        const response = await axios.patch(`${API_HOST}/initializations/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to patch initializations/${id} data`);
    }
};

export const postTaxiCall = async (id) => {
    try {
        const response = await axios.post(`${API_HOST}/rides/${id}`, '', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to post rides/${id} data`);
    }
};