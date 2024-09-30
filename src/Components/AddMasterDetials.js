import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, notification } from "antd";


export default function AddMasterDetails() {
  const [type, setType] = useState("");
  const [values, setValues] = useState("");
  const [masterData, setMasterData] = useState([]);
 

  // Function to fetch master details
  const fetchMasterDetails = async () => {
    try {
      const response = await axios.get("https://billing-software-backend-api.onrender.com/api/master"); // Fetches data from the master API
      setMasterData(response.data);
    } catch (error) {
      notification.error({ message: "Error fetching master details" });
    }
  };

  // Fetch the master details on component mount
  useEffect(() => {
    fetchMasterDetails();
  }, []);
  const handleSubmit = () => {
    axios
      .post(`https://billing-software-backend-api.onrender.com/api/master`, {
        type, // This should be "gender"
        value: values,
      })
      .then((res) => {
        console.log(res.data);
        notification.success({ message: "Gender details added successfully!" });
        fetchMasterDetails(); // Assuming this fetches updated master details
      })
      .catch((error) => {
        notification.error({ message: "Error adding gender details" });
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <Form.Item
            label="Type"
            rules={[{ required: true, message: "Please input the Type!" }]}
          >
            <Input value={type} onChange={(e) => setType(e.target.value)} />
          </Form.Item>
          <Form.Item label="Value">
            <Input
              type="text"
              value={values}
              onChange={(e) => setValues(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Master Details
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
