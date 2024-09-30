import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';

export default function AddCustomerDetails() {
  const [form] = Form.useForm();

  const onFinishh = async (values) => {
    try {
      await axios.post('https://billing-software-backend-api.onrender.com/customer', values);
      message.success('Customer added successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to add customer');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Add Customer</h1>
      <div style={{ padding: '0 50px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinishh}
        >
          <Form.Item
            label="Customer Name"
            name="customername"
            rules={[{ required: true, message: 'Please enter the customer name!' }]}
          >
            <Input type="text"/>
          </Form.Item>

          <Form.Item
            label="GST Number"
            name="gstno"
            rules={[{ required: true, message: 'Please enter the GST number!' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please enter the Phone number!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Email ID"
            name="email"
            rules={[{ required: true, message: 'Please enter the Email!' }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter the address!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Contact Person"
            name="contactperson"
            rules={[{ required: true, message: 'Please enter the contact person!' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: 'Please enter the code!' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Notes"
            name="notes"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Customer</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
