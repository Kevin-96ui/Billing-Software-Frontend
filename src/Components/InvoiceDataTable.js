import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input, Upload } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

const InvoiceDataTable = () => {
    const [invoiceData, setInvoiceData] = useState([]);
    const [editingData, setEditingData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchInvoiceData = async () => {
        try {
            const response = await axios.get('https://billing-software-backend-api.onrender.com/invoicedata');
            setInvoiceData(response.data);
        } catch (error) {
            message.error("Failed to fetch invoice data");
        }
    };

    useEffect(() => {
        fetchInvoiceData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://billing-software-backend-api.onrender.com/invoicedata/${id}`);
            message.success("Invoice data deleted successfully");
            fetchInvoiceData();
        } catch (error) {
            message.error("Failed to delete invoice data");
        }
    };

    const handleEdit = (record) => {
        setEditingData(record);
        setIsModalVisible(true);
        form.setFieldsValue(record);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingData(null);
        form.resetFields();
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const updatedData = { ...editingData, ...values };

            // Sending a PUT request to update the data
            await axios.put(`https://billing-software-backend-api.onrender.com/invoicedata/${editingData._id}`, updatedData);
            message.success("Invoice data updated successfully");
            setIsModalVisible(false);
            setEditingData(null);
            form.resetFields();
            fetchInvoiceData();
        } catch (error) {
            message.error("Failed to update invoice data");
        }
    };

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'Company Address',
            dataIndex: 'companyAddress',
            key: 'companyAddress',
        },
        {
            title: 'Company Logo',
            dataIndex: 'companyLogo',
            key: 'companyLogo',
            render: (text, record) => (
                <img src={record.companyLogo} alt="Company Logo" style={{ width: '100px' }} />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record._id)}>
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={invoiceData} rowKey="_id" />

            <Modal
                title="Edit Invoice Data"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="companyName" label="Company Name" rules={[{ required: true, message: 'Please input the company name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="companyAddress" label="Company Address" rules={[{ required: true, message: 'Please input the company address!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="companyLogo" label="Company Logo">
                        <Upload
                            beforeUpload={() => false}
                            onChange={({ file }) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    form.setFieldsValue({ companyLogo: reader.result });
                                };
                                reader.readAsDataURL(file);
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Upload Logo</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default InvoiceDataTable;
