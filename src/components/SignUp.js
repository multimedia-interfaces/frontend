import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const SignUp = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '0 20px' }}>
            <Col xs={24} sm={16} md={12} lg={8} xl={6}>
                <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>
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
                        <Input prefix={<UserOutlined />} placeholder="First Name" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Last Name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input a valid email!' },
                            { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Email must match pattern *@*.*' }
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        initialValue="+"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^\+\d{12}$/, message: 'Phone number must start with + and be followed by 12 digits' }
                        ]}
                    >
                        <Input prefix={<PhoneOutlined />} placeholder="Phone" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default SignUp;