import React from 'react';
import { Form, Input, Button } from 'antd';

const Contact = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Here you can add your form submission logic
  };

  return (
    <div>
      <div style={{ padding: '50px', maxHeight: '600px',maxWidth: '600px', margin: '0 auto' }}>
        {/* <h1 style={{justifyContent:"center", alignItems:"center"}}>Contact</h1> */}
        <Form
          name="contact_form"
          layout="vertical"
          onFinish={onFinish}
          style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px #f0f1f2' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please input your message!' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter your message" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
