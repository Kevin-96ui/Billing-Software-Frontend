import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllInvoiceTemplate() {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    // Fetch company data from the API
    axios.get('https://billing-software-backend-api.onrender.com/invoicedata')
      .then(response => {
        const data = response.data[0]; // Assuming the response is an array with one object
        setInvoiceData({
          company: {
            logo: data.companyLogo, // Use the logo from API
            name: data.companyName, // Use company name from API
            address: data.companyAddress, // Use company address from API
            gstNo: '33AACCG3612S1Z5', // GST number (you can fetch this from API if available)
          },
          invoice: {
            date: '5-Apr-2024',
            number: 'RGMGITR2425-5',
          },
          customer: {
            name: 'G.N.C. & SONS (Private) Ltd.',
            address: 'BDI Dealers, 2-C, Promenade Road, P.B. No.29, Cantonment, Trichy-1',
            gstNo: '33AAACG1945P1ZG',
            delivery: 'N/A',
          },
          productDetails: [
            {
              hsn: '998314',
              description: 'Smart Hardware/Server - Validity One year on 03/Apr/2024',
              unitPrice: 400.00,
              quantity: 12,
              amount: 4800.00,
              discount: 35,
            },
          ],
          totals: {
            subTotal: 3120.00,
            igst: 280.80,
            cgst: 280.80,
            totalTax: 561.60,
            shipping: 312.00,
            grandTotal: 3681.60,
          },
        });
      })
      .catch(error => {
        console.error('Error fetching invoice data:', error);
      });
  }, []);

  if (!invoiceData) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '10px', border: '1px solid #ccc', fontSize: '12px' }}>
      <header style={{ textAlign: 'center', marginBottom: '10px' }}>
        <img src={invoiceData.company.logo} alt="Company Logo" style={{ maxWidth: '100px' }} />
        <h3>{invoiceData.company.name}</h3>
        <p>{invoiceData.company.address}</p>
        <p>GST No: {invoiceData.company.gstNo}</p>
      </header>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <div>
            <h4>Customer Info</h4>
            <p>{invoiceData.customer.name}</p>
            <p>{invoiceData.customer.address}</p>
            <p>GST No: {invoiceData.customer.gstNo}</p>
          </div>
          <div>
            <h4>Invoice Info</h4>
            <p>Invoice Date: {invoiceData.invoice.date}</p>
            <p>Invoice No.: {invoiceData.invoice.number}</p>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={tableHeader}>HSN/SAC</th>
              <th style={tableHeader}>Product Details</th>
              <th style={tableHeader}>Unit Price</th>
              <th style={tableHeader}>Qty.</th>
              <th style={tableHeader}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.productDetails.map((item, index) => (
              <tr key={index}>
                <td style={tableCell}>{item.hsn}</td>
                <td style={tableCell}>{item.description}</td>
                <td style={tableCell}>{item.unitPrice.toFixed(2)}</td>
                <td style={tableCell}>{item.quantity}</td>
                <td style={tableCell}>{item.amount.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" style={tableCellRightAlign}>
                Discount
              </td>
              <td style={tableCell}>
                {-invoiceData.productDetails[0].amount * (invoiceData.productDetails[0].discount / 100)}
              </td>
            </tr>
            <tr>
              <td colSpan="4" style={tableCellRightAlign}>
                Subtotal
              </td>
              <td style={tableCell}>{invoiceData.totals.subTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="4" style={tableCellRightAlign}>
                IGST 18%
              </td>
              <td style={tableCell}>{invoiceData.totals.igst.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="4" style={tableCellRightAlign}>
                CGST 9%
              </td>
              <td style={tableCell}>{invoiceData.totals.cgst.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="4" style={tableCellRightAlign}>
                Total Tax
              </td>
              <td style={tableCell}>{invoiceData.totals.totalTax.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="4" style={tableCellRightAlign}>
                Shipping & Handling
              </td>
              <td style={tableCell}>{invoiceData.totals.shipping.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="4" style={tableCellRightAlign}>
                Grand Total
              </td>
              <td style={tableCell}>{invoiceData.totals.grandTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer style={{ marginTop: '20px', fontSize: '12px' }}>
        <p style={{ fontWeight: 'bold' }}>
          Three Thousand Six Hundred Eighty One Rupees and No paise Only
        </p>
        <p style={{ fontStyle: 'italic' }}>Payment Details: (Subject to Realisation)</p>
      </footer>
    </div>
  );
}

const tableHeader = {
  border: '1px solid #ccc',
  padding: '6px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
};

const tableCell = {
  border: '1px solid #ccc',
  padding: '6px',
};

const tableCellRightAlign = {
  ...tableCell,
  textAlign: 'right',
};
