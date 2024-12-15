// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Typography, Form, Input, Button, Row, Col, Select, Checkbox, message, Card, Alert } from 'antd';
import { Link } from 'react-router-dom';
import Header from "./Header";
import { initiateTaxiCall, updateTaxiCall, postTaxiCall } from '../api/orderTaxi';
import { Spin } from 'antd';
import taxiVideo from '../taxi_video.mp4';
import {setFormField, resetForm} from "../store/actions";
import {useStore} from "../store/hook";

const { Title } = Typography;
const { Option } = Select;

const Home = () => {
    const { state, dispatch } = useStore();
    const { form, profile } = state;

    const [callTaxiId, setCallTaxiId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOnRoad, setIsOnRoad] = useState(false);
    const [error, setError] = useState(null);

    const initializeUserData = () => {
        dispatch(setFormField('passengerPhone', profile.phone));
        dispatch(setFormField('passengerName', profile.name))
    }
    useEffect(() => {
        const getCallTaxiId = async () => {
            try {
                const data = await initiateTaxiCall();
                setCallTaxiId(data.id);
            } catch (error) {
                message.error('Failed to fetch initialization data');
            }
        };

        initializeUserData();
        getCallTaxiId();
    }, []);

    if (!profile.phone) {
        return <div>Loading...</div>;
    }

    const onFinish = async () => {
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
            if (form.passengerName && form.passengerPhone) {
                const passengerData = {
                    update: {
                        field: "passenger",
                        value: {
                            name: form.passengerName,
                            phone: form.passengerPhone,
                        }
                    },
                };
                await setUpdate(callTaxiId, passengerData);
            }

            const routeData = {
                update: {
                    field: "route",
                    value: [form.pickupLocation, form.dropoffLocation]
                },
            };
            await setUpdate(callTaxiId, routeData);

            const classData = {
                update: {
                    field: "class",
                    value: form.carType
                },
            };
            await setUpdate(callTaxiId, classData);

            const servicesData = {
                update: {
                    field: "services",
                    value: form.services
                },
            };
            await setUpdate(callTaxiId, servicesData);

            await postTaxiCall(callTaxiId);

            dispatch(resetForm());
            initializeUserData();
            setIsOnRoad(true);
            setTimeout(() => setIsOnRoad(false), 4000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const mainContent = loading
        ? <div style={{ textAlign: 'center', padding: '50px' }}>
            {loading ? <Spin size="large" /> : <div>Дані завантажено!</div>}
        </div>
        : isOnRoad
            ? <Card style={{ width: 600 }}>
                <video autoPlay loop muted style={{ width: '100%' }}>
                    <source src={taxiVideo} type="video/mp4" />
                </video>
            </Card>
            : <>
                <Title level={2} style={{ textAlign: 'center' }}>Order Taxi</Title>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Pickup Location" required>
                        <Input
                            placeholder="Pickup Location"
                            value={form.pickupLocation}
                            onChange={(e) => dispatch(setFormField('pickupLocation', e.target.value))}
                        />
                    </Form.Item>

                    <Form.Item label="Dropoff Location" required>
                        <Input
                            placeholder="Dropoff Location"
                            value={form.dropoffLocation}
                            onChange={(e) => dispatch(setFormField('dropoffLocation', e.target.value))}
                        />
                    </Form.Item>

                    <Form.Item label="Car Type" required>
                        <Select
                            placeholder="Select Car Type"
                            value={form.carType}
                            onChange={(value) => dispatch(setFormField('carType', value))}
                        >
                            <Option value="econom">Economy</Option>
                            <Option value="standard">Standard</Option>
                            <Option value="business">Business</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Additional Services">
                        <Checkbox.Group
                            value={form.services}
                            onChange={(checkedValues) => dispatch(setFormField('services', checkedValues))}
                        >
                            <Checkbox value="animal">Traveling with pet</Checkbox>
                            <Checkbox value="big-trunk">Large luggage</Checkbox>
                            <Checkbox value="child-seat">Child seat</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item label="Passenger Phone Number">
                        <Input
                            placeholder="Passenger Phone Number"
                            value={form.passengerPhone}
                            onChange={(e) => dispatch(setFormField('passengerPhone', e.target.value))}
                        />
                    </Form.Item>

                    <Form.Item label="Passenger Name">
                        <Input
                            placeholder="Passenger Name"
                            value={form.passengerName}
                            onChange={(e) => dispatch(setFormField('passengerName', e.target.value))}
                        />
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