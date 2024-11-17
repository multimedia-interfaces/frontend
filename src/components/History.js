// src/components/History.js
import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import Header from "./Header";

const { Title, Paragraph } = Typography;

const History = () => {
    return (
        <>
            <Header />
            <Row justify="center" style={{ padding: '20px' }}>
                <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                    <Title level={2} style={{ textAlign: 'center' }}>History Page</Title>
                    <Paragraph style={{ textAlign: 'center' }}>This is the history page.</Paragraph>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link to="/">
                            <Button type="link">Go to Home</Button>
                        </Link>
                        <Link to="/profile">
                            <Button type="link">Go to Profile</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default History;