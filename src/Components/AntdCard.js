import React, { useState, useEffect } from 'react';
import { Card, Col, Row, message } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AntdCard = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [taxCount, setTaxCount] = useState(0);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (userData && userData.username && userData.email) {
      setUser({
        username: userData.username,
        email: userData.email,
      });
    }
  }, [userData]); // Add userData as a dependency

  // Fetch product count from the API
  const fetchProductCount = async () => {
    try {
      const response = await axios.get('https://billing-software-backend-api.onrender.com/masterproduct');
      setProductCount(response.data.length); // Assuming the response is an array of products
    } catch (error) {
      message.error('Failed to fetch product data');
    }
  };

  // Fetch customer count from the API
  const fetchCustomerCount = async () => {
    try {
      const response = await axios.get('https://billing-software-backend-api.onrender.com/customer');
      setCustomerCount(response.data.length); 
    } catch (error) {
      message.error('Failed to fetch customer data');
    }
  };

  const fetchTaxCount = async () => {
    try {
      const response = await axios.get(`https://billing-software-backend-api.onrender.com/TaxMaster`);
      setTaxCount(response.data.length);
    } catch (error) {
      message.error('Failed to fetch Tax data');
    }
  }
  useEffect(() => {
    fetchProductCount();
    fetchCustomerCount();
    fetchTaxCount();
  }, []); 

  return (
    <Row gutter={16}>
      {/* Customers Card */}
      <Col span={8}>
        <Card title={"Customers"} bordered={false}>
          <p>{customerCount || "Loading..."}</p>
        </Card>
      </Col>

      {/* User Tax Card */}
      <Col span={8}>
        <Card title={"TAX" || "Loading..."} bordered={false}>
          <p>{taxCount || "Loading..."}</p>
        </Card>
      </Col>

      {/* Products Card */}
      <Col span={8}>
        <Card title={"Products"} bordered={false}>
          <p>{productCount || "Loading..."}</p>
        </Card>
      </Col>
    </Row>
  );
};

export default AntdCard;
