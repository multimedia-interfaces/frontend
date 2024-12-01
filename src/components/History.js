// src/components/History.js
import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Table, message } from 'antd';
import { Link } from 'react-router-dom';
import Header from "./Header";
import { fetchHistory } from '../api/history';

const { Title } = Typography;
const columns = [
    {
        title: 'Passenger Name',
        dataIndex: ['passenger', 'name'],
        key: 'name',
    },
    {
        title: 'Passenger Phone Number',
        dataIndex: ['passenger', 'phone'],
        key: 'phone',
    },
    {
        title: 'Start date and time',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'End date and time',
        dataIndex: 'finalizedAt',
        key: 'finalizedAt',
    },
    {
        title: 'Route',
        dataIndex: 'route',
        key: 'route',
        render: (route) => route.join(', '),
    },
    {
        title: 'Car Type',
        dataIndex: 'class',
        key: 'class',
    },
    {
        title: 'Additional services',
        dataIndex: 'services',
        key: 'services',
        render: (services) => services.join(', '),
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
                <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                    <Title level={2} style={{ textAlign: 'center' }}>History Page</Title>

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