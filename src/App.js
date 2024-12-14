// src/App.js
import { Spin } from "antd";
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
      <Route path="/" element={<Home />} />
      <Route path="/micro" element={<Dictaphone />} />
      <Route path="/demo/echo" element={<EchoDemo />} />
      <Route path="/demo/navigation" element={<NavigationDemo />} />
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
