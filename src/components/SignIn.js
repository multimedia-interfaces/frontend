// src/components/SignIn.js
import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../api/login';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const SignIn = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const data = {
                phone: values.phone,
                password: values.password,
            };
            const response = await login(data);
            console.log('Success:', response);
            localStorage.setItem('authToken', response.token);
            setError(null);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = () => {
        setError(null);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '0 20px' }}>
            <Col xs={24} sm={16} md={12} lg={8} xl={6}>
                <Title level={2} style={{ textAlign: 'center' }}>Sign In</Title>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
                <Form
                    name="signin"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^\+\d{12}$/, message: 'Phone number must start with + and be followed by 12 digits' }
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="+38(050)-012-3456" onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" onChange={handleChange} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading} disabled={loading}>
                            {loading ? 'Processing...' : 'Sign In'}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default SignIn;