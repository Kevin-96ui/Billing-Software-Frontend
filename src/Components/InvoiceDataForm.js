import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const InvoiceDataForm = ({ data, refreshData }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    try {
      const base64Logo =
        fileList.length > 0 ? fileList[0].thumbUrl : data?.companyLogo || "";
      const response = data
        ? await axios.put(`https://billing-software-backend-api.onrender.com/invoicedata/${data._id}`, {
            ...values,
            companyLogo: base64Logo,
          })
        : await axios.post("https://billing-software-backend-api.onrender.com/invoicedata", {
            ...values,
            companyLogo: base64Logo,
          });
      message.success(response.data.message);
      refreshData();
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Failed to save invoice data");
    }
  };

  const handleLogoUpload = ({ fileList }) => setFileList(fileList);

  return (
    <div>
      <div style={{margin:"20px"}}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={data}
      >
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[{ required: true, message: "Please enter company name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="companyAddress"
          label="Company Address"
          rules={[{ required: true, message: "Please enter company address" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Company Logo">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            onChange={handleLogoUpload}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Upload Logo</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {data ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default InvoiceDataForm;
