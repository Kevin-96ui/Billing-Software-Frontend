import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import axios from "axios";

const { Option } = Select;

export default function AddMasterProducts() {
  const [form] = Form.useForm();
  const [nextProductID, setNextProductID] = useState(null);
  const [TaxMaster, setTaxMaster] = useState([]);

  // Fetch TaxMaster data from backend
  useEffect(() => {
    axios
      .get("https://billing-software-backend-api.onrender.com/TaxMaster")
      .then((response) => {
        const TaxMasters = response.data.map((item) => item.name); // Use 'name' field for the dropdown
        setTaxMaster(TaxMasters);
        console.log(TaxMasters);
      })
      .catch((error) => {
        console.error("Failed to fetch TaxMaster options!", error);
      });
  }, []);

  // Fetch next ProductID from backend
  useEffect(() => {
    const fetchNextProductID = async () => {
      try {
        const response = await axios.get("https://billing-software-backend-api.onrender.com/masterproduct");
        const products = response.data;
        const lastProductID =
          products.length > 0
            ? Math.max(...products.map((product) => product.ProductID))
            : 0;
        setNextProductID(lastProductID + 1);
      } catch (error) {
        message.error("Failed to fetch next Product ID");
      }
    };

    fetchNextProductID();
  }, []);

  // Handle form submission
  const onFinish = async (values) => {
    console.log("Form Values:", values); // Log form values to ensure taxmaster is included
    try {
      const productData = {
        ProductID: nextProductID,
        ...values,
      };
      await axios.post("https://billing-software-backend-api.onrender.com/masterproduct", productData);
      message.success("Product added successfully!");
      form.resetFields();
      setNextProductID(nextProductID + 1); // Increment the ProductID for next entry
    } catch (error) {
      message.error("Failed to add product");
    }
  };

  // Handle form value changes (when taxmaster is selected)
  const handleValuesChange = (changedValues, allValues) => {
    if (changedValues.taxmaster) {
      // Automatically update the code field when taxmaster is selected
      form.setFieldsValue({
        code: changedValues.taxmaster,
      });
    }
  };

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Add New Master Product</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={handleValuesChange} // Handle changes
          initialValues={{ ProductID: nextProductID }}
        >
          <Form.Item label="Product ID" name="ProductID">
            <Input value={nextProductID} disabled />
          </Form.Item>

          <Form.Item
            name="HSN_SAC"
            label="HSN/SAC"
            rules={[{ required: true, message: "Please input the HSN/SAC!" }]}
          >
            <Input placeholder="Enter HSN/SAC" />
          </Form.Item>

          <Form.Item
            name="Product_Detials"
            label="Product Details"
            rules={[
              { required: true, message: "Please input the Product Details!" },
            ]}
          >
            <Input placeholder="Enter Product Details" />
          </Form.Item>

          <Form.Item
            name="Unit_Price"
            label="Unit Price"
            rules={[
              { required: true, message: "Please input the Unit Price!" },
            ]}
          >
            <Input type="number" placeholder="Enter Unit Price" />
          </Form.Item>

          <Form.Item
            name="discount"
            label="Discount"
            rules={[{ required: true, message: "Please input the Discount!" }]}
          >
            <Input type="number" placeholder="Enter Discount" />
          </Form.Item>

          <Form.Item
            label="Tax Master"
            name="taxmaster"
            rules={[{ required: true, message: "Please select TaxMaster!" }]}
          >
            <Select placeholder="Select TaxMaster">
              {TaxMaster.map((tax, index) => (
                <Option key={index} value={tax}>
                  {tax}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="code"
            label="Code"
            rules={[
              { required: true, message: "Please input the Product Code!" },
            ]}
          >
            <Input placeholder="Enter Product Code" disabled/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
