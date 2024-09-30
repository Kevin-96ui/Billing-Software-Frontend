import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const InvoiceProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://billing-software-backend-api.onrender.com/product');
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const columns = [
        { title: 'HSN/SAC', dataIndex: 'hsn_sac', key: 'hsn_sac' },
        { title: 'Customer Name', dataIndex: 'customername', key: 'customername' },
        { title: 'GST', dataIndex: 'gstno', key: 'gstno' },
        { title: 'Product Details', dataIndex: 'product_name', key: 'product_name' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Unit Price', dataIndex: 'unit_price', key: 'unit_price' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
        { title: 'Discount', dataIndex: 'discount', key: 'discount' },
        { title: 'Discount Amount', dataIndex: 'discountamount', key: 'discountamount' },
        { title: 'Total Amount', dataIndex: 'totalamount', key: 'totalamount' },
        { title: 'CGST', dataIndex: 'cgst', key: 'cgst' },
        { title: 'SGST', dataIndex: 'sgst', key: 'sgst' },
        { title: 'IGST', dataIndex: 'igst', key: 'igst' },
        { title: 'Grand Total', dataIndex: 'grandtotal', key: 'grandtotal' },
        { title: 'Grand Total (Rounded)', dataIndex: 'grandtotalrounded', key: 'grandtotalrounded' },
    ];

    return (
        <div style={{ maxWidth: '100%', overflowX: 'auto', padding: '5px' }}>
            <div>
                <Table
                    dataSource={products}
                    columns={columns}
                    pagination={true}
                    scroll={{ x: 'max-content' }} // Horizontal scrolling
                    style={{ minWidth: '800px' }} // Table minimum width
                />
            </div>
        </div>
    );
};

export default InvoiceProductTable;
