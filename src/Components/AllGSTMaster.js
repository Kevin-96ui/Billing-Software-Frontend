import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Space } from 'antd';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

export default function AllGSTMaster() {
  const [taxMasters, setTaxMasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTaxMaster, setEditingTaxMaster] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTaxMasters();
  }, []);

  const fetchTaxMasters = async () => {
    try {
      const response = await axios.get('https://billing-software-backend-api.onrender.com/TaxMaster');
      setTaxMasters(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch GST data');
      setLoading(false);
    }
  };

  const fetchTaxMasterDetails = async (id) => {
    try {
      const response = await axios.get(`https://billing-software-backend-api.onrender.com/TaxMaster/${id}`);
      setEditingTaxMaster(response.data);
      form.setFieldsValue({
        ...response.data,
        Detail: response.data.Detail.map(detail => ({
          MasterDetialid: detail.MasterDetialid || uuidv4(), // Ensure MasterDetialid is set
          components: detail.components,
          percentage: detail.percentage
        })),
      });
      setIsModalVisible(true);
    } catch (error) {
      message.error('Failed to fetch TaxMaster details');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://billing-software-backend-api.onrender.com/TaxMaster/${id}`);
      message.success('TaxMaster deleted successfully');
      fetchTaxMasters();
    } catch (error) {
      message.error('Failed to delete TaxMaster');
    }
  };

  const handleEdit = (id) => {
    fetchTaxMasterDetails(id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingTaxMaster(null);
    form.resetFields();
  };

  const handleSave = async (values) => {
    try {
      const updatedDetails = values.Detail.map(detail => ({
        ...detail,
        MasterDetialid: detail.MasterDetialid || uuidv4(), // Ensure MasterDetialid is not null
      }));

      const updatedValues = { ...values, Detail: updatedDetails };

      if (editingTaxMaster) {
        // Ensure MasterDetialid is included in the request payload
        await axios.put(`https://billing-software-backend-api.onrender.com/TaxMaster/${editingTaxMaster._id}`, updatedValues);
        message.success('TaxMaster updated successfully');
      }
      setIsModalVisible(false);
      setEditingTaxMaster(null);
      fetchTaxMasters();
    } catch (error) {
      message.error('Failed to update TaxMaster');
    }
  };

  const flattenDetails = (detailArray) => {
    return detailArray.map(detail => `${detail.components}: ${detail.percentage}%`).join(', ');
  };

  const columns = [
    {
      title: 'Master ID',
      dataIndex: 'Masterid',
      key: 'Masterid',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'activestatus',
      key: 'activestatus',
      render: (status) => (status ? 'Active' : 'Inactive'),
    },
    {
      title: 'Components and Percentages',
      dataIndex: 'Detail',
      key: 'Detail',
      render: (details) => flattenDetails(details),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record._id)}>
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
          dataSource={taxMasters}
          loading={loading}
          rowKey="_id"
        />
      </div>

      <Modal
        title="Edit GST"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSave}
        >
          <Form.Item
            name="code"
            label="Code"
            rules={[{ required: true, message: 'Please input the code!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="activestatus"
            label="Status"
            valuePropName="checked"
          >
            <Input type="checkbox" />
          </Form.Item>
          <Form.List name="Detail">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'MasterDetialid']}
                      fieldKey={[fieldKey, 'MasterDetialid']}
                      hidden={true} // Hidden field for the user
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'components']}
                      fieldKey={[fieldKey, 'components']}
                      label="Component"
                      rules={[{ required: true, message: 'Missing component' }]}
                    >
                      <Input placeholder="Component name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'percentage']}
                      fieldKey={[fieldKey, 'percentage']}
                      label="Percentage"
                      rules={[{ required: true, message: 'Missing percentage' }]}
                    >
                      <Input placeholder="Percentage" />
                    </Form.Item>
                    <Button type="link" danger onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add Component
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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
