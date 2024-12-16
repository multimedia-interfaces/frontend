// src/App.js
import {message, Spin} from "antd";
import React, { useEffect, useState } from "react";
import {
    Route,
    BrowserRouter as Router,
    Routes,
    useNavigate,
} from "react-router-dom";
import History from "./components/History";
import Order from "./components/Order";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {fetchProfile} from "./api/profile";
import {StoreProvider} from "./store/provider";
import {SET_PROFILE} from "./store/actions";
import {useStore} from "./store/hook";
import {Assistant} from "./components/assistant/Assistant";
import Header from "./components/Header";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const { state, dispatch } = useStore();
  const { profile } = state;
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/signup');
      } else {
        const getProfile = async () => {
          try {
              const data = await fetchProfile();
              dispatch({ type: SET_PROFILE, payload: data });
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
      <Route path="/" element={<Header />} />
      <Route path="/order" element={<Order profile={profile}/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/profile" element={<Profile profile={profile}/>} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};

const AppWrapper = () => (
    <StoreProvider>
        <Router>
            <App/>
            <Assistant />
        </Router>
    </StoreProvider>
);

export default AppWrapper;
