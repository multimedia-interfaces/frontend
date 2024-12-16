// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import {useStore} from "../store/hook";

const { Title } = Typography;

const Header = ({ userName }) => {
    const navigate = useNavigate();
    const { state } = useStore();
    const { profile } = state;

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/signup');
    };

    return (
        <Row justify="space-between" align="middle" style={{ padding: '10px 20px', borderBottom: '1px solid #e8e8e8' }}>
            <Col>
                <Title level={4} style={{ display: 'inline', margin: 0 }}>{profile.name || 'Max'}</Title>
            </Col>
            <Col>
                <Link to="/">
                    <Button type="link">Home</Button>
                </Link>
                <Link to="/order">
                    <Button type="link">Order</Button>
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