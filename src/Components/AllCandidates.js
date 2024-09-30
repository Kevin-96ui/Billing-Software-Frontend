import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Option } = Select;

export default function AllCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [genderOptions, setGenderOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch candidates
    axios
      .get("https://billing-software-backend-api.onrender.com/candidate")
      .then((response) => {
        setCandidates(response.data);
        setFilteredCandidates(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the candidates!", error);
      });

    // Fetch gender options
    axios
      .get("https://billing-software-backend-api.onrender.com/candidate")
      .then((response) => {
        setGenderOptions(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch gender options!", error);
      });
  }, []);

  useEffect(() => {
    // Filter candidates based on search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = candidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(lowercasedTerm) ||
          candidate.email.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredCandidates(filtered);
    } else {
      setFilteredCandidates(candidates);
    }
  }, [searchTerm, candidates]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://billing-software-backend-api.onrender.com/candidate/${id}`);
      setCandidates(candidates.filter((candidate) => candidate._id !== id));
      setFilteredCandidates(
        filteredCandidates.filter((candidate) => candidate._id !== id)
      );
      message.success("Candidate deleted successfully!");
    } catch (error) {
      message.error("Failed to delete candidate!");
    }
  };

  const handleEdit = (candidate) => {
    setEditingCandidate(candidate);
    setIsEditing(true);
    form.setFieldsValue({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      memberType: candidate.memberType,
      address: candidate.address,
      gender: candidate.gender,
    });
  };

  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `https://billing-software-backend-api.onrender.com/candidate/${editingCandidate._id}`,
        values
      );
      setCandidates(
        candidates.map((candidate) =>
          candidate._id === editingCandidate._id
            ? { ...candidate, ...values }
            : candidate
        )
      );
      setFilteredCandidates(
        filteredCandidates.map((candidate) =>
          candidate._id === editingCandidate._id
            ? { ...candidate, ...values }
            : candidate
        )
      );
      setIsEditing(false);
      setEditingCandidate(null);
      message.success("Candidate updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update candidate!");
    }
  };

  const handleAddCandidate = () => {
    navigate("/Addcandidates");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>All Candidates</h1>
      <div style={{ padding: "0 50px" }}>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search candidates by name or email"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "300px" }}
          />
        </div>

        <Row gutter={[16, 32]}>
          {filteredCandidates.map((candidate) => (
            <Col key={candidate._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ height: "400px" }}
                cover={
                  <img
                    alt={candidate.name}
                    src={candidate.image}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                }
                actions={[
                  <Button type="link" onClick={() => handleEdit(candidate)}>
                    Edit
                  </Button>,
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDelete(candidate._id)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <Meta
                  title={candidate.name}
                  description={
                    <div>
                      <p>Gender: {candidate.gender}</p>
                      <p>Email: {candidate.email}</p>
                      <p>Phone: {candidate.phone}</p>
                      <p>Member Type: {candidate.memberType}</p>
                      <p>Address: {candidate.address}</p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
        <div style={{ marginBottom: "40px" }}></div>
      </div>

      <Modal
        title="Edit Candidate"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
          setEditingCandidate(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
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
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender type!" }]}
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
        </Form>
      </Modal>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
        onClick={handleAddCandidate}
      />
    </div>
  );
}
