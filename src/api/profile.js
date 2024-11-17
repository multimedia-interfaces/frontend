import axios from 'axios';
import {API_HOST} from "../constants/api";

const getAuthToken = () =>  localStorage.getItem('authToken');

export const fetchProfile = async () => {
    try {
        const response = await axios.get(`${API_HOST}/profile`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch profile data');
    }
};

export const updateProfile = async (profileData) => {
    try {
        const response = await axios.post(`${API_HOST}/profile`, profileData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update profile');
    }
};