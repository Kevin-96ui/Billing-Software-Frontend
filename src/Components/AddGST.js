import React, { useState } from "react";
import { Form, Button, Input, Switch, InputNumber, Divider } from "antd";
import axios from 'axios';
import { Row } from "react-bootstrap";

const AddGST = () => {
  const [form] = Form.useForm();
  const [components, setComponents] = useState([]);

  const addComponent = () => {
    setComponents([...components, { components: '', percentage: '' }]);
  };

  const removeComponent = (index) => {
    const newComponents = components.filter((_, i) => i !== index);
    setComponents(newComponents);
  };

  const handleComponentChange = (index, field, value) => {
    const newComponents = [...components];
    newComponents[index][field] = value;
    setComponents(newComponents);
  };

  const onFinish = async (values) => {
    try {
      // Prepare the data to be sent to the API
      const requestData = {
        ...values,
        Detail: components.map((comp, index) => ({
          ...comp,
          MasterDetialid: index + 1 // Assign MasterDetialid based on index
        }))
      };

      // Send POST request to the API
      await axios.post('https://billing-software-backend-api.onrender.com/TaxMaster', requestData);
      
      // Optionally, handle the success response
      console.log('GST Created Successfully');
      form.resetFields(); // Reset form fields on success
      setComponents([]); // Clear components
    } catch (error) {
      // Handle error
      console.error('Error creating GST:', error);
    }
  };

  return (
    <div className="p-2">
      <h4 style={{ color: "gray" }} className="d-flex">
        Add GST
      </h4>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row>
          <Form.Item 
            label="Code" 
            name="code" 
            rules={[{ required: true, message: "Code is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Name" 
            name="name" 
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            label="Active" 
            name="activestatus" 
            valuePropName="checked" 
            rules={[{ required: true, message: "Active status is required!" }]}
          >
            <Switch />
          </Form.Item>

          <Button type="dashed" onClick={addComponent}>
            Add Component
          </Button>

          {components.map((component, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <Divider />
              <Row gutter={16}>
                <Form.Item
                  label={`Component ${index + 1}`}
                  name={`component_${index}`}
                  rules={[{ required: true, message: `Component ${index + 1} is required!` }]}
                >
                  <Input
                    value={component.components}
                    onChange={(e) => handleComponentChange(index, 'components', e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={`Percentage ${index + 1}`}
                  name={`percentage_${index}`}
                  rules={[{ required: true, message: `Percentage ${index + 1} is required!` }]}
                >
                  <InputNumber
                    value={component.percentage}
                    onChange={(value) => handleComponentChange(index, 'percentage', value)}
                  />
                </Form.Item>
                <Button
                  type="danger"
                  onClick={() => removeComponent(index)}
                >
                  Remove
                </Button>
              </Row>
            </div>
          ))}

        </Row>
        <br/>
        <Button type="primary" htmlType="submit">
          Create GST
        </Button>
      </Form>
    </div>
  );
};

export default AddGST;
