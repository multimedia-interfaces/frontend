import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Alert } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { register } from '../api/register';

const { Title, Text } = Typography;

const SignUp = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const data = {
                phone: values.phone,
                password: values.password,
                name: `${values.firstName} ${values.lastName}`,
            };
            const response = await register(data);
            console.log('Success:', response);
            setError(null);
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
                <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
                <Form
                    name="signup"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="First Name" onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Last Name" onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^\+\d{12}$/, message: 'Phone number must start with + and be followed by 12 digits' }
                        ]}
                    >
                        <Input prefix={<PhoneOutlined />} placeholder="+38(050)-012-3456" onChange={handleChange} />
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
                            {loading ? 'Processing...' : 'Sign Up'}
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Text>Do you already have an account? <Link to="/signin">Sign in</Link></Text>
                </div>
            </Col>
        </Row>
    );
};

export default SignUp;