import React, { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";
import { useParams } from 'react-router-dom';

const InvoicePreview = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({})
    const [items, setItems] = useState([])
    const [customerName, setCustomerName] = useState({})

    const url = 'http://localhost:8000/api/invoices'
    useEffect(() => {
        const fetchInvoice = async () => {
            const response = await fetch(`${url}/${id}`)
            const data = await response.json()
            const { customer, invoiceDate, dueDate, notes, items, total } = data
            
            const customers = await fetch('http://localhost:8000/api/customers')
            const customerData = await customers.json()
            const customerName = customerData.filter((customer) => customer._id === customer)
            setCustomerName(customerName)

            const itemsData = await fetch('http://localhost:8000/api/items')
            const itemsDataJson = await itemsData.json()
            const itemsName = itemsDataJson.filter((item) => items.includes(item._id))
            setItems(itemsName)
            setInvoice({ customer:customerName, invoiceDate, dueDate, notes, items:itemsName, total})
        }
        fetchInvoice();
    }, []);

    const { customer, invoiceDate, dueDate, notes, total } = invoice

    return (
        <div>
            <h2>Invoice Preview</h2>
            <div>
                <h4>Customer: {customer}</h4>
                <p>Invoice Date: {invoiceDate}</p>
                <p>Due Date: {dueDate}</p>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Item Details</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <p>Total: {total}</p>
            </div>
            <div>
                <p>Customer Notes:</p>
                <p>{notes}</p>
            </div>
        </div>

    );
};

export default InvoicePreview;
