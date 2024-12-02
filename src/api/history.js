import axios from 'axios';
import {API_HOST} from "../constants/api";

const getAuthToken = () =>  localStorage.getItem('authToken');

export const fetchHistory = async (page, limit) => {
    try {
        const response = await axios.get(`${API_HOST}/rides?page=${page}&limit=${limit ?? 20}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch history data');
    }
};