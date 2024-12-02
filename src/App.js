// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Profile from './components/Profile';
import History from './components/History';
import {message, Spin} from 'antd';
import Dictaphone from "./components/Dictaphone";
import {fetchProfile} from "./api/profile";

const App = () => {
    const [initialized, setInitialized] = useState(false);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ name: '', phone: '', email: '' });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/signup');
        } else {
            const getProfile = async () => {
                try {
                    const data = await fetchProfile();
                    setProfile(data);
                } catch (error) {
                    message.error('Failed to fetch profile data');
                }
            };
            getProfile();
        }
        setInitialized(true);
    }, []);

    if (!initialized) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Home profile={profile} />} />
            <Route path="/micro" element={<Dictaphone />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile profile={profile} />} />
            <Route path="/history" element={<History />} />
        </Routes>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;