import React, { useState, useEffect } from "react";
import { Form, Button, InputNumber, Select } from "antd";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

const { Option } = Select;

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [gstData, setGstData] = useState(null);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [igst, setIgst] = useState(0);

  // Fetch products, GST data, and customers from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          "https://billing-software-backend-api.onrender.com/masterproduct"
        );
        const gstResponse = await axios.get("https://billing-software-backend-api.onrender.com/gst");
        const customerResponse = await axios.get(
          "https://billing-software-backend-api.onrender.com/customer"
        );

        setProducts(productResponse.data);
        setGstData(gstResponse.data);
        setCustomers(customerResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle product change
  const handleProductChange = (value) => {
    const product = products.find((p) => p.Product_Detials === value);
    if (product) {
      setSelectedProduct(product);
      form.setFieldsValue({
        hsn_sac: product.HSN_SAC,
        unit_price: product.Unit_Price,
        discount: product.discount,
      });
      calculateAmount(
        product.Unit_Price,
        form.getFieldValue("quantity"),
        product.discount
      );
      updateGST(product);
    }
  };

  // Function to update GST values
  const updateGST = (product) => {
    const gstInfo = gstData.find(
      (gst) => gst.product_name === product.Product_Detials
    );

    if (gstInfo) {
      const gstPercentage = gstInfo.gstpercentage;

      // Assume intra-state GST (CGST + SGST) for this case
      const halfGst = gstPercentage / 2;
      setCgst(halfGst);
      setSgst(halfGst);
      setIgst(0);

      // Set CGST and SGST in the form
      form.setFieldsValue({
        cgst: halfGst,
        sgst: halfGst,
        igst: 0,
      });
    }
  };

  const handleHSNChange = (value) => {
    const product = products.find((p) => p.HSN_SAC === value);
    if (product) {
      form.setFieldsValue({
        product_name: product.Product_Detials,
        unit_price: product.Unit_Price,
        discount: product.discount,
      });
      calculateAmount(
        product.Unit_Price,
        form.getFieldValue("quantity"),
        product.discount
      );
    }
  };

  const handleCustomerChange = (field, value) => {
    const customer = customers.find((c) => c[field] === value);
    if (customer) {
      form.setFieldsValue({
        customername: customer.customername,
        gstno: customer.gstno,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
      });
    }
  };

  const handleQuantityChange = (value) => {
    const unitPrice = form.getFieldValue("unit_price");
    const discount = form.getFieldValue("discount");
    calculateAmount(unitPrice, value, discount);
  };

  const handleDiscountChange = (value) => {
    const unitPrice = form.getFieldValue("unit_price");
    const quantity = form.getFieldValue("quantity");
    calculateAmount(unitPrice, quantity, value);
  };

  const calculateAmount = (unitPrice, quantity, discount) => {
    if (unitPrice && quantity) {
      const amount = unitPrice * quantity;
      const discountAmount = amount * (discount / 100);
      const totalAmount = amount - discountAmount;

      // GST Calculations
      const cgstAmount = totalAmount * (cgst / 100);
      const sgstAmount = totalAmount * (sgst / 100);
      const totalGstAmount = cgstAmount + sgstAmount;

      const grandTotal = totalAmount + totalGstAmount;
      const grandTotalRounded = Math.round(grandTotal);

      form.setFieldsValue({
        amount: amount,
        discountamount: discountAmount,
        totalamount: totalAmount,
        cgst: cgstAmount,
        sgst: sgstAmount,
        grandtotal: grandTotal,
        grandtotalrounded: grandTotalRounded,
      });
    }
  };

  const handleSubmit = async (values) => {
    console.log("Submitting the following data:", values);

    const {
      product_name,
      hsn_sac,
      unit_price,
      discount,
      quantity,
      amount,
      discountamount,
      totalamount,
      customername,
      gstno,
      phone,
      email,
      address,
      cgst,
      sgst,
      grandtotal,
      grandtotalrounded,
    } = values;

    // Prepare data for the backend
    const productData = {
      product_name,
      hsn_sac,
      unit_price,
      discount,
      quantity,
      amount,
      discountamount,
      totalamount,
      customername,
      gstno,
      phone,
      email,
      address,
      cgst,
      sgst,
      grandtotal,
      grandtotalrounded,
    };

    try {
      // Send the product data to the backend
      await axios.post("https://billing-software-backend-api.onrender.com/product", productData);
      alert("Product added successfully!");
      form.resetFields();
    } catch (error) {
      console.error(
        "There was an error adding the product!",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-3">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row>
          <Col lg={6}>
            <Form.Item label="HSN/SAC" name="hsn_sac">
              <Select placeholder="Select HSN/SAC" onChange={handleHSNChange}>
                {products.map((product) => (
                  <Option key={product._id} value={product.HSN_SAC}>
                    {product.HSN_SAC}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Customer Name"
              name="customername"
              rules={[{ required: true, message: "Customer Name is required!" }]}
            >
              <Select
                placeholder="Select Customer Name"
                onChange={(value) =>
                  handleCustomerChange("customername", value)
                }
              >
                {customers.map((customer) => (
                  <Option key={customer._id} value={customer.customername}>
                    {customer.customername}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="GST No"
              name="gstno"
              rules={[{ required: true, message: "GST No is required!" }]}
            >
              <Select
                placeholder="Select GST No"
                onChange={(value) => handleCustomerChange("gstno", value)}
              >
                {customers.map((customer) => (
                  <Option key={customer._id} value={customer.gstno}>
                    {customer.gstno}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Phone No"
              name="phone"
              rules={[{ required: true, message: "Phone No is required!" }]}
            >
              <Select
                placeholder="Select Phone No"
                onChange={(value) => handleCustomerChange("phone", value)}
              >
                {customers.map((customer) => (
                  <Option key={customer._id} value={customer.phone}>
                    {customer.phone}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email is required!" }]}
            >
              <Select
                placeholder="Select Email"
                onChange={(value) => handleCustomerChange("email", value)}
              >
                {customers.map((customer) => (
                  <Option key={customer._id} value={customer.email}>
                    {customer.email}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is required!" }]}
            >
              <Select
                placeholder="Select Address"
                onChange={(value) => handleCustomerChange("address", value)}
              >
                {customers.map((customer) => (
                  <Option key={customer._id} value={customer.address}>
                    {customer.address}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Product Name"
              name="product_name"
              rules={[{ required: true, message: "Product Name is required!" }]}
            >
              <Select
                placeholder="Select Product"
                onChange={handleProductChange}
              >
                {products.map((product) => (
                  <Option key={product._id} value={product.Product_Detials}>
                    {product.Product_Detials}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={6}>
            <Form.Item
              label="Unit Price"
              name="unit_price"
              rules={[{ required: true, message: "Unit price is required!" }]}
            >
              <InputNumber min={0} disabled />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Quantity is required!" }]}
            >
              <InputNumber min={1} onChange={handleQuantityChange} />
            </Form.Item>

            <Form.Item
              label="Discount (%)"
              name="discount"
              rules={[{ required: true, message: "Discount is required!" }]}
            >
              <InputNumber
                min={0}
                max={100}
                onChange={handleDiscountChange}
              />
            </Form.Item>

            <Form.Item label="Amount" name="amount">
              <InputNumber min={0} disabled />
            </Form.Item>

            <Form.Item label="Discount Amount" name="discountamount">
              <InputNumber min={0} disabled />
            </Form.Item>

            <Form.Item label="Total Amount" name="totalamount">
              <InputNumber min={0} disabled />
            </Form.Item>

            {/* GST Fields */}
            <Form.Item label="CGST" name="cgst">
              <InputNumber min={0} disabled />
            </Form.Item>

            <Form.Item label="SGST" name="sgst">
              <InputNumber min={0} disabled />
            </Form.Item>

            <Form.Item label="IGST" name="igst">
              <InputNumber min={0} disabled />
            </Form.Item>

            <Form.Item label="Grand Total" name="grandtotal">
              <InputNumber min={0} disabled />
            </Form.Item>

            <Form.Item label="Grand Total (Rounded)" name="grandtotalrounded">
              <InputNumber min={0} disabled />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddProduct;
