// src/components/Profile.js
import React, { useEffect } from 'react';
import { Typography, Form, Input, Button, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import { updateProfile } from '../api/profile';
import Header from "./Header";

const { Title } = Typography;

const Profile = ({profile}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(profile)
    }, [form, profile]);
    const onFinish = async (values) => {
        try {
            await updateProfile(values);
            message.success('Profile updated successfully');
        } catch (error) {
            message.error('Failed to update profile');
        }
    };

    return (
        <>
            <Header />
            <Row justify="center" style={{ padding: '20px' }}>
                <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                    <Title level={2} style={{ textAlign: 'center' }}>Profile Page</Title>
                    <Form
                        form={form}
                        name="profile"
                        initialValues={profile}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input placeholder="Phone" />
                        </Form.Item>
{/*
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item> 

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Update Profile
                            </Button>
                        </Form.Item>
                        */}
                        
                    </Form>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link to="/">
                            <Button type="link">Go to Home</Button>
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

export default Profile;