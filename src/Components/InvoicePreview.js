import React, { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";
import { useParams } from 'react-router-dom';
import './style.css'

const InvoicePreview = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({})
    const [items, setItems] = useState([])
    const [customerName, setCustomerName] = useState("")

    const url = 'http://localhost:8000/api/invoices'
    useEffect(() => {
        const fetchInvoice = async () => {
            const response = await fetch(`${url}/${id}`)
            const data = await response.json()
            const { customerId, invoiceDate, dueDate, notes, itemIds, total } = data

            const customers = await fetch('http://localhost:8000/api/customers')
            const customerData = await customers.json()
            const customerName = customerData.find((customer) => customer._id === customerId).name
            setCustomerName(customerName)

            const items = await fetch('http://localhost:8000/api/items')
            const itemsData = await items.json()
            const filteredItems = itemsData.filter((item) => itemIds.includes(item._id))
            setItems(filteredItems)

            setInvoice({ invoiceDate, dueDate, notes, total })
        }
        fetchInvoice();
    }, [id]);

    const { invoiceDate, dueDate, notes, total } = invoice

    return (
        <div className="invoice-container">
            <h2>Invoice Preview</h2>
            <div className="customer-info">
                <h4>Customer: {customerName}</h4>
                <p>Invoice Date: {invoiceDate}</p>
                <p>Due Date: {dueDate}</p>
            </div>
            <Table striped bordered hover className="items-table">
                <thead>
                    <tr>
                        <th>Item Details</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>${item.unitPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="total-section">
                <p>Total: ${total}</p>
            </div>
            <div className="notes-section">
                <p>Customer Notes:</p>
                <p>{notes}</p>
            </div>
        </div>

    );
};

export default InvoicePreview;
