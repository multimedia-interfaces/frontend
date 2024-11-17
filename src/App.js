import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import {Form, Input} from "antd";
import {MailOutlined} from "@ant-design/icons";

// <Form.Item
//     label="Email"
//     name="email"
//     rules={[
//         { required: true, message: 'Please input a valid email!' },
//         { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Email must match pattern *@*.*' }
//     ]}
// >
//     <Input prefix={<MailOutlined />} placeholder="Email" onChange={handleChange} />
// </Form.Item>
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </Router>
    );
}

export default App;