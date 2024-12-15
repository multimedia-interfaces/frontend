// src/App.js
import {message, Spin} from "antd";
import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dictaphone from "./components/Dictaphone";
import History from "./components/History";
import Home from "./components/Home";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EchoDemo from "./components/demos/EchoDemo";
import NavigationDemo from "./components/demos/NavigationDemo";
import OrderDemo from "./components/demos/OrderDemo";
import {fetchProfile} from "./api/profile";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const [profile, setProfile] = useState({ name: '', phone: '', email: '' });
  const navigate = useNavigate();

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
              localStorage.removeItem('authToken');
              navigate('/signup');
              message.error('Failed to fetch profile data', error);
              console.log('Failed to fetch profile data', error);
            }
          };
      getProfile();
    }
    setInitialized(true);
  }, []);

  if (!initialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home profile={profile}/>} />
      <Route path="/micro" element={<Dictaphone />} />
      <Route path="/demo/echo" element={<EchoDemo />} />
      <Route path="/demo/navigation" element={<NavigationDemo />} />
      <Route path="/demo/order" element={<OrderDemo />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/profile" element={<Profile profile={profile}/>} />
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
