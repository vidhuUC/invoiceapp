import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [sortedInvoices, setSortedInvoices] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [customers, setCustomers] = useState([]);
    const url = 'http://localhost:8000/api/invoices';

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setInvoices(data);

            const customersResponse = await fetch('http://localhost:8000/api/customers');
            const customersData = await customersResponse.json();
            setCustomers(customersData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterInvoices = () => {
            if (statusFilter === 'all') {
                // Show all invoices
                setSortedInvoices([...invoices]);
            } else {
                // Filter invoices based on status
                const filtered = invoices.filter((invoice) => invoice.status === statusFilter);
                setSortedInvoices(filtered);
            }
        };
        filterInvoices();
    }, [invoices, statusFilter]);

    const onDelete = async (id) => {
        await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
        const response = await fetch(url);
        const data = await response.json();
        setInvoices(data);
    };

    useEffect(() => {
        const checkLateInvoices = () => {
            const currentDate = new Date();
            const lateInvoices = invoices.filter((invoice) => {
                const dueDate = new Date(invoice.dueDate);
                return invoice.status !== 'paid' && dueDate < currentDate;
            });

            if (lateInvoices.length > 0) {
                // Alert if there are late invoices
                lateInvoices.forEach((invoice) => {
                    const customerName = customers.length > 0 ? customers.find((customer) => customer._id === invoice.customerId).name : '';
                    alert(`Invoice is late for ${customerName}`);
                });
            }
        };
        if (invoices.length > 0 && customers.length > 0)
            checkLateInvoices();
    }, [invoices, customers]);

    return (
        <div className="m-5">
            <div className="d-flex justify-content-between align-items-center">
                <h5>Invoices</h5>
                <div>
                    <Dropdown className="m-2">
                        <Dropdown.Toggle variant="primary" id="status-filter-dropdown">
                            Filter by Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setStatusFilter('all')}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => setStatusFilter('pending')}>Pending</Dropdown.Item>
                            <Dropdown.Item onClick={() => setStatusFilter('paid')}>Paid</Dropdown.Item>
                            <Dropdown.Item onClick={() => setStatusFilter('late')}>Late</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Link to="/invoice/new">
                        <Button variant="success" className="m-2">
                            + New Invoice
                        </Button>
                    </Link>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Invoice Date</th>
                        <th>Due Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedInvoices.map((invoice, index) => {
                        const customerName = customers.length > 0 ? customers.find((customer) => customer._id === invoice.customerId).name : '';
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{customerName}</td>
                            <td>{invoice.invoiceDate}</td>
                            <td>{invoice.dueDate}</td>
                            <td>${invoice.total}</td>
                            <td>{invoice.status}</td>
                            <td>
                                <Link to={`/invoice/preview/${invoice._id}`}>
                                    <Button variant="primary" size="sm" className="me-2">
                                        View
                                    </Button>
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => onDelete(invoice._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Invoices;
