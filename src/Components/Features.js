import React from 'react';
import { Row, Col, Card } from 'antd';
import { CheckCircleOutlined, ThunderboltOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default function Features() {
  return (
    <div>
      <div style={{ padding: '0 50px', textAlign: 'center', margin:"20px" }}>
        <h1>Features of RockG Microtechnology</h1>
        <p style={{ fontSize: '18px', margin: '20px 0' }}>
          RockG Microtechnology is committed to delivering innovative solutions with cutting-edge features. 
          Here are some of the standout features that set us apart.
        </p>
        <Row gutter={[16, 32]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={<CheckCircleOutlined style={{ fontSize: '64px', color: '#1890ff', marginTop: '20px' }} />}
              style={{ height: '300px' }}
            >
              <Meta
                title="Quality Assurance"
                description="Our products undergo rigorous quality checks to ensure they meet the highest standards."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={<ThunderboltOutlined style={{ fontSize: '64px', color: '#1890ff', marginTop: '20px' }} />}
              style={{ height: '300px' }}
            >
              <Meta
                title="Innovative Technology"
                description="We leverage the latest technologies to provide innovative and efficient solutions."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={<SafetyCertificateOutlined style={{ fontSize: '64px', color: '#1890ff', marginTop: '20px' }} />}
              style={{ height: '300px' }}
            >
              <Meta
                title="Reliable Services"
                description="Our dedicated team ensures that our services are reliable and tailored to meet your needs."
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
