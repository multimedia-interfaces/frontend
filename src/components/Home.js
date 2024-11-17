import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Title level={2}>Welcome to the Home Page</Title>
            <Paragraph>This is some dummy content for the home page.</Paragraph>
        </div>
    );
};

export default Home;