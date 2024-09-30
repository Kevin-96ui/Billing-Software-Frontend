import React from 'react';
import { Row, Col } from 'antd';

import product1Image from '../Assets/iphone15.jpeg';
import product2Image from '../Assets/iphone15pro.jpeg';

export default function About() {
  return (
    <div>
      <div style={{ padding: '0 50px', textAlign: 'center', margin: "20px" }}>
        <h1>About RockG Microtechnology</h1>
        <p style={{ fontSize: '18px', margin: '20px 0' }}>
          RockG Microtechnology is a leading company specializing in both product development and service solutions. 
          With a dedicated team of experts, we aim to deliver innovative products and top-notch services to meet the evolving needs of our clients.
        </p>
        <Row gutter={[16, 32]} justify="center">
          <Col xs={24} md={12}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <img src={product1Image} alt="Product 1" style={{ width: '100%', height: 'auto' }} />
              <h2>Our Products</h2>
              <p style={{ fontSize: '16px' }}>
                Our product line includes cutting-edge technology solutions designed to enhance efficiency and productivity. 
                From hardware to software, RockG Microtechnology ensures high quality and reliability in every product.
              </p>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <img src={product2Image} alt="Product 2" style={{ width: '100%', height: 'auto' }} />
              <h2>Our Services</h2>
              <p style={{ fontSize: '16px' }}>
                We offer a wide range of services including consulting, technical support, and custom development. 
                Our team is committed to providing exceptional service to help you achieve your business goals.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
