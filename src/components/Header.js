// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
// import logo from '../assets/logo.png'; // Import the dummy logo

const { Title } = Typography;

const Header = ({ userName }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/signup');
    };

    return (
        <Row justify="space-between" align="middle" style={{ padding: '10px 20px', borderBottom: '1px solid #e8e8e8' }}>
            <Col>
                {/*<img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />*/}
                <Title level={4} style={{ display: 'inline', margin: 0 }}>{userName || 'Max'}</Title>
            </Col>
            <Col>
                <Link to="/">
                    <Button type="link">Home</Button>
                </Link>
                <Link to="/profile">
                    <Button type="link">Profile</Button>
                </Link>
                <Link to="/history">
                    <Button type="link">History</Button>
                </Link>
                <Button type="link" icon={<LogoutOutlined />} style={{ marginLeft: '10px' }} onClick={handleLogout}>
                    Logout
                </Button>
            </Col>
        </Row>
    );
};

export default Header;