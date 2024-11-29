// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Profile from './components/Profile';
import History from './components/History';
import { Spin } from 'antd';
import Dictaphone from "./components/Dictaphone";

const App = () => {
    const [initialized, setInitialized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // const token = localStorage.getItem('authToken');
        // if (!token) {
        //     navigate('/signup');
        // }
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
            <Route path="/" element={<Home />} />
            <Route path="/micro" element={<Dictaphone />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
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