// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Typography, Form, Input, Button, Row, Col, Select, Checkbox, message, Card, Alert } from 'antd';
import { Link } from 'react-router-dom';
import Header from "./Header";
import { initiateTaxiCall, updateTaxiCall, postTaxiCall } from '../api/orderTaxi';
import { Spin } from 'antd';
import taxiVideo from '../taxi_video.mp4';

const { Title } = Typography;
const { Option } = Select;

const Home = () => {
    const [callTaxiId, setCallTaxiId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOnRoad, setIsOnRoad] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCallTaxiId = async () => {
            try {
                const data = await initiateTaxiCall();
                setCallTaxiId(data.id);
            } catch (error) {
                message.error('Failed to fetch initializations data');
            }
        };
        getCallTaxiId();
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        const setUpdate = async (id, data) => {
            try {
                const update = await updateTaxiCall(id, data);
                console.log('Success:', update);
                setError(null);
            } catch (error) {
                message.error('Failed to update call taxi data');
            }
        };

        try {
            if (values.passengerName && values.passengerPhone) {
                const passengerData = {
                    update: {
                        field: "passenger",
                        value: {
                            name: values.passengerName,
                            phone: values.passengerPhone,
                        }
                    },
                };
                await setUpdate(callTaxiId, passengerData);
            }

            const routeData = {
                update: {
                    field: "route",
                    value: [
                        values.pickupLocation,
                        values.dropoffLocation
                    ]
                },
            };
            await setUpdate(callTaxiId, routeData);

            const classData = {
                update: {
                    field: "class",
                    value: values.carType
                },
            };
            await setUpdate(callTaxiId, classData);

            if (values.services) {
                const servicesData = {
                    update: {
                        field: "services",
                        value: values.services
                    },
                };
                await setUpdate(callTaxiId, servicesData);
            }

            await postTaxiCall(callTaxiId);
            setIsOnRoad(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    var mainContent = loading
        ? <div style={{ textAlign: 'center', padding: '50px' }}>
            {loading ? <Spin size="large" /> : <div>Дані завантажено!</div>}
        </div>
        :
        isOnRoad
            ?
            <Card title="Taxi Video" style={{ width: 300 }}>
                <video autoPlay loop muted style={{ width: '100%' }}>
                    <source src={taxiVideo} type="video/mp4" />
                    Ваш браузер не підтримує відео.
                </video>
            </Card>
            : <>
                <Title level={2} style={{ textAlign: 'center' }}>Order Taxi</Title>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
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

                    <Form.Item
                        name="carType"
                        label="Car Type"
                        rules={[{ required: true, message: 'Please select car type!' }]}>
                        <Select placeholder="Select Car Type">
                            <Option value="economy">Economy</Option>
                            <Option value="standard">Standard</Option>
                            <Option value="business">Business</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="services">
                        <Checkbox.Group>
                            <Checkbox value="pet">Traveling with pet</Checkbox>
                            <Checkbox value="luggage">Large luggage</Checkbox>
                            <Checkbox value="childSeat">Child seat</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item name="passengerPhone" label="Passenger Phone Number">
                        <Input placeholder="Passenger Phone Number" />
                    </Form.Item>

                    <Form.Item name="passengerName" label="Passenger Name">
                        <Input placeholder="Passenger Name" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Order Taxi
                        </Button>
                    </Form.Item>
                </Form>
            </>;

    return (
        <>
            <Header />
            <Row justify="center" style={{ padding: '20px' }}>
                <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                    {mainContent}
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