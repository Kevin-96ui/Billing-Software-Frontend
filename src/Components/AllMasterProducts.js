import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

export default function AllMasterProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://billing-software-backend-api.onrender.com/masterproduct');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://billing-software-backend-api.onrender.com/masterproduct/${id}`);
      message.success('Product deleted successfully');
      fetchProducts(); // Refresh the table
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const handleSave = async (values) => {
    try {
      if (editingProduct) {
        await axios.put(`https://billing-software-backend-api.onrender.com/masterproduct/${editingProduct._id}`, values);
        message.success('Product updated successfully');
      } 
      setIsModalVisible(false);
      setEditingProduct(null);
      fetchProducts(); // Refresh the table
    } catch (error) {
      message.error('Failed to update product');
    }
  };

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'ProductID',
      key: 'ProductID',
    },
    {
      title: 'HSN/SAC',
      dataIndex: 'HSN_SAC',
      key: 'HSN_SAC',
    },
    {
      title: 'Product Details',
      dataIndex: 'Product_Detials',
      key: 'Product_Detials',
    },
    {
      title: 'Unit Price',
      dataIndex: 'Unit_Price',
      key: 'Unit_Price',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Tax',
      dataIndex: 'taxmaster',
      key: 'taxmaster',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <Table
          columns={columns}
          dataSource={products}
          loading={loading}
          rowKey="_id"
        />
      </div>

      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingProduct}
          onFinish={handleSave}
        >
          <Form.Item
            name="ProductID"
            label="Product ID"
            rules={[{ required: true, message: 'Please input Product ID!' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="HSN_SAC"
            label="HSN/SAC"
            rules={[{ required: true, message: 'Please input HSN/SAC!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Product_Detials"
            label="Product Details"
            rules={[{ required: true, message: 'Please input Product Details!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Unit_Price"
            label="Unit Price"
            rules={[{ required: true, message: 'Please input Unit Price!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
