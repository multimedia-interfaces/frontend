// src/components/History.js
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Table, message } from 'antd';
import { Link } from 'react-router-dom';
import Header from "./Header";
import { fetchHistory } from '../api/history';
import moment from 'moment';

const { Title } = Typography;
const columns = [
    {
        title: 'Passenger Name',
        dataIndex: ['passenger', 'name'],
        key: 'name',
        width: '15%',
    },
    {
        title: 'Passenger Phone Number',
        dataIndex: ['passenger', 'phone'],
        key: 'phone',
        width: '15%',
    },
    {
        title: 'Start date and time',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
        width: '15%',
    },
    {
        title: 'End date and time',
        dataIndex: 'finalizedAt',
        key: 'finalizedAt',
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
        width: '15%',
    },
    {
        title: 'Route',
        dataIndex: 'route',
        key: 'route',
        render: (route) => route.join(', '),
        width: '20%',
    },
    {
        title: 'Car Type',
        dataIndex: 'class',
        key: 'class',
        width: '10%',
    },
    {
        title: 'Additional services',
        dataIndex: 'services',
        key: 'services',
        render: (services) => services.join(', '),
        width: '10%',
    },
];

const History = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getHistory = async (currentPage) => {
            try {
                const data = await fetchHistory(currentPage - 1);
                setData(data.data);
                setTotal(data.total);
            } catch (error) {
                message.error('Failed to fetch history data');
            }
        };
        getHistory(currentPage);
    }, [currentPage]);

    return (
        <>
            <Header />
            <Row justify="center" style={{ padding: '20px' }}>
                <Col xs={48} sm={40} md={32} lg={24} xl={16}>
                    <Title level={2} style={{textAlign: 'center'}}>History Page</Title>

                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            current: currentPage,
                            pageSize: 20,
                            total: total,
                            onChange: (page) => setCurrentPage(page),
                        }}
                        rowKey="id"
                    />
                    <div style={{marginTop: '20px', textAlign: 'center'}}>
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