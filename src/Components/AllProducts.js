import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, InputNumber } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Column } = Table;

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://billing-software-backend-api.onrender.com/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://billing-software-backend-api.onrender.com/product/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue({
      quantity: record.quantity,
    });
    setIsModalVisible(true);
  };

  const handleAddNew = () => {
    navigate("/AddProducts");
  };
  const handleClear = () => {
    axios
      .delete(`https://billing-software-backend-api.onrender.com/product`)
      .then((res) => {
        console.log(res.data);
        alert("Cleared");
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async (values) => {
    try {
      await axios.put(`https://billing-software-backend-api.onrender.com/product/${editingProduct._id}`, {
        ...editingProduct,
        quantity: values.quantity,
      });
      setIsModalVisible(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={handleAddNew}
        style={{ marginBottom: 16 }}
        className="me-3"
      >
        Add New Product
      </Button>
      <Button type="dashed" onClick={handleClear} style={{ marginBottom: 16 }}>
        Clear All
      </Button>
      <div style={{ maxWidth: "100%", overflowX: "auto", padding: "16px" }}>
        <div >
          <Table
            dataSource={products}
            rowKey="_id"
            loading={loading}
            scroll={{ x: "max-content" }}
            style={{ minWidth: "800px" }} // Optional: Ensures the table has a minimum width
          >
            <Column title="Product ID" dataIndex="ProductID" key="ProductID" />
            <Column title="HSN/SAC" dataIndex="hsn_sac" key="hsn_sac" />
            <Column
              title="Customer Name"
              dataIndex="customername"
              key="customername"
            />
            <Column title="GST No" dataIndex="gstno" key="gstno" />
            <Column
              title="Product Name"
              dataIndex="product_name"
              key="product_name"
            />
            <Column
              title="Unit Price"
              dataIndex="unit_price"
              key="unit_price"
            />
            <Column title="Quantity" dataIndex="quantity" key="quantity" />
            <Column title="Amount" dataIndex="amount" key="amount" />
            <Column title="Phone" dataIndex="phone" key="phone" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column title="Discount" dataIndex="discount" key="discount" />
            <Column title="Amount" dataIndex="amount" key="amount" />
            <Column title="Discounted Amount" dataIndex="discountamount" key="discountamount" />
            <Column title="Total" dataIndex="totalamount" key="totalamount" />
            <Column title="CGST" dataIndex="cgst" key="cgst" />
            <Column title="SGST" dataIndex="sgst" key="sgst" />
            <Column title="IGST" dataIndex="igst" key="igst" />
            <Column title="Grand Total" dataIndex="grandtotal" key="grandtotal" />
            <Column title="Grand Total(Rounded)" dataIndex="grandtotalrounded" key="grandtotalrounded" />
            <Column
              title="Actions"
              key="actions"
              render={(text, record) => (
                <span>
                  <Button type="link" onClick={() => handleEdit(record)}>
                    Edit
                  </Button>
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </Button>
                </span>
              )}
            />
          </Table>
        </div>
      </div>

      <Modal
        title="Edit Product Quantity"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Update Quantity
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
