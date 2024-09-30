import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

export default function AddCandidates() {
  const [form] = Form.useForm();
  const [imageData, setImageData] = useState(null);
  const [genderOptions, setGenderOptions] = useState([]);

  useEffect(() => {
    // Fetch gender options from the 'master' API endpoint
    axios
      .get("https://billing-software-backend-api.onrender.com/api/master")
      .then((response) => {
        // Filter the response to get only gender options
        const genders = response.data
          .filter(item => item.type === "gender")
          .map(gender => gender.value);
        setGenderOptions(genders);
        console.log(genders);
      })
      .catch((error) => {
        console.error("Failed to fetch gender options!", error);
      });
  }, []);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const onFinish = async (values) => {
    if (!imageData) {
      message.error("Please upload an image!");
      return;
    }

    const candidateData = {
      ...values,
      image: imageData,
    };

    try {
      await axios.post("https://billing-software-backend-api.onrender.com/candidate", candidateData);
      message.success("Candidate added successfully!");
      form.resetFields();
      setImageData(null);
    } catch (error) {
      message.error("Failed to add candidate!");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Add Candidate</h1>
      <div style={{ padding: "0 50px" }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the candidate's name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="Select Gender">
              {genderOptions.map((gender, index) => (
                <Option key={index} value={gender}>
                  {gender}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter the phone number!" },
            ]}
          >
            <Input type="tel" />
          </Form.Item>

          <Form.Item
            label="Member Type"
            name="memberType"
            rules={[
              { required: true, message: "Please select the member type!" },
            ]}
          >
            <Select placeholder="Select Member Type">
              <Option value="employee">Employee</Option>
              <Option value="intern">Intern</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Upload Image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload beforeUpload={handleImageUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {imageData && (
              <img
                src={imageData}
                alt="Uploaded"
                style={{ marginTop: 20, maxHeight: 100 }}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Candidate
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
