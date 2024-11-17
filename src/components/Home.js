// src/components/Home.js
import React from 'react';
import { Typography, Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Header from "./Header";

const { Title } = Typography;

const Home = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Header />
            <Row justify="center" style={{ padding: '20px' }}>
                <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                    <Title level={2} style={{ textAlign: 'center' }}>Order Taxi</Title>
                    <Form
                        name="orderTaxi"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Pickup Location"
                            name="pickupLocation"
                            rules={[{ required: true, message: 'Please input your pickup location!' }]}
                        >
                            <Input placeholder="Pickup Location" />
                        </Form.Item>

                        <Form.Item
                            label="Dropoff Location"
                            name="dropoffLocation"
                            rules={[{ required: true, message: 'Please input your dropoff location!' }]}
                        >
                            <Input placeholder="Dropoff Location" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Order Taxi
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link to="/profile">
                            <Button type="link">Go to Profile</Button>
                        </Link>
                        <Link to="/history">
                            <Button type="link">Go to History</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Home;