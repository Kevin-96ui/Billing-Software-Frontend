import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';
import axios from 'axios';

export default function AllMasterDetails() {
  const [masterData, setMasterData] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchMasterDetails = async () => {
    try {
      const response = await axios.get('https://billing-software-backend-api.onrender.com/api/master');
      setMasterData(response.data);
    } catch (error) {
      alert('Error fetching master details');
    }
  };

  useEffect(() => {
    fetchMasterDetails();
  }, []);

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://billing-software-backend-api.onrender.com/api/master/${id}`, {
        method: "DELETE",
      });
  
      if (response.status === 404) {
        console.error("Master detail not found");
      } else if (response.ok) {
        console.log("Master detail deleted");
        // Update the state or refresh the list
      } else {
        console.error("Failed to delete master detail");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  


  const handleSave = async (values) => {
    try {
      await axios.put(`https://billing-software-backend-api.onrender.com/api/master/${editingRecord._id}`, values);
      alert('Record updated successfully');
      setIsEditing(false);
      fetchMasterDetails();
    } catch (error) {
      alert('Error updating record');
    }
  };


  const handleCancel = () => {
    setIsEditing(false);
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} className='me-2'>Edit</Button>
          {/* <br /> */}
          <Button onClick={() => handleDelete(record._id)} danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className='p-5'>
      <Table columns={columns} dataSource={masterData} rowKey="_id" />
      </div>
      <Modal
        title="Edit Master Detail"
        visible={isEditing}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingRecord}
          onFinish={handleSave}
        >
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please input the type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: 'Please input the value!' }]}
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
