import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import ItemTable from './ItemTable';
import TotalTable from './TotalTable';

const NewInvoice = () => {
    const [customers, setCustomers] = useState([]);
    const [amount, setAmount] = useState(0);
    const [currentItems, setCurrentItems] = useState([{}]);
    const [status, setStatus] = useState('Pending'); // Default value for status

    const navigate = useNavigate();
    const url = 'http://localhost:8000/api/invoices';

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch('http://localhost:8000/api/customers');
            const data = await response.json();
            setCustomers(data);
        };
        fetchCustomers();
    }, []);

    const postInvoice = async (body) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        navigate(`/invoice/preview/${data._id}`);
       
    };

    const addInvoice = async (e) => {
        e.preventDefault();

        const customerId = e.target.elements.customer.value;
        const invoiceDate = e.target.elements.invoiceDate.value;
        const dueDate = e.target.elements.dueDate.value;
        const notes = e.target.elements.notes.value;
        const items = currentItems.filter((item) => item._id);

        const body = {
            customerId,
            invoiceDate,
            dueDate,
            notes,
            itemIds: items.map((item) => item._id),
            status,
            total: parseFloat(document.getElementById('total').value),
        };

        await postInvoice(body);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <Form className="m-5" onSubmit={addInvoice}>
            <Form.Group className="mb-3" controlId="customer">
                <Form.Select aria-label="Select Customer">
                    <option>Select Customer</option>
                    {customers.map((customer, index) => (
                        <option key={index} value={customer._id}>
                            {customer.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="invoiceDate">
                <Form.Label>Invoice Date</Form.Label>
                <Form.Control type="date" placeholder="Enter Invoice Date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" placeholder="Enter Due Date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select value={status} onChange={handleStatusChange}>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Late">Late</option>
                </Form.Select>
            </Form.Group>
            <ItemTable setAmount={setAmount} setCurrentItems={setCurrentItems} currentItems={currentItems} />
            <TotalTable amount={amount} />
            <Form.Group className="mb-3" controlId="notes">
                <Form.Label>Customer Notes</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Save as Preview
            </Button>
        </Form>
    );
};

export default NewInvoice;
