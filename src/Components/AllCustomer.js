import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://billing-software-backend-api.onrender.com/customer');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomers();
  }, []);

  // Handle Edit button click
  const handleEdit = (record) => {
    setEditingCustomer(record);
    form.setFieldsValue({
      customername: record.customername,
      gstno: record.gstno,
      phone: record.phone,
      email: record.email,
      address: record.address,
      notes: record.notes,
    });
    setIsModalVisible(true);
  };

  // Handle Delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://billing-software-backend-api.onrender.com/customer/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
      message.success('Customer deleted successfully!');
    } catch (error) {
      console.error('Error deleting customer:', error);
      message.error('Failed to delete customer.');
    }
  };

  // Handle form submission
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`https://billing-software-backend-api.onrender.com/customer/${editingCustomer._id}`, values);
      setCustomers(customers.map((customer) =>
        customer._id === editingCustomer._id ? { ...customer, ...values } : customer
      ));
      message.success('Customer updated successfully!');
      setIsModalVisible(false);
      setEditingCustomer(null);
      form.resetFields();
    } catch (error) {
      console.error('Error updating customer:', error);
      message.error('Failed to update customer.');
    }
  };

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customername',
      key: 'customername',
    },
    {
      title: 'GST Number',
      dataIndex: 'gstno',
      key: 'gstno',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="p-5">
        <h1>All Customers</h1>
        <Table
          columns={columns}
          dataSource={customers}
          loading={loading}
          rowKey="_id"
          pagination={true}
        />
        {/* Modal for Editing */}
        <Modal
          title="Edit Customer"
          visible={isModalVisible}
          onOk={handleUpdate}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="customername"
              label="Customer Name"
              rules={[{ required: true, message: 'Please input the customer name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gstno"
              label="GST Number"
              rules={[{ required: true, message: 'Please input the GST number!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please input the phone number!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input the email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please input the address!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="notes"
              label="Notes"
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AllCustomer;
