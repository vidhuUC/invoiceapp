import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const Customer = () => {
    const [customers, setCustomers] = useState([])
    const url = 'http://localhost:8000/api/customers'

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url)
            const data = await response.json()
            setCustomers(data)
        }
        fetchData();
    }, []);

    return (
        <div className="m-5">
            <div className="d-flex justify-content-between">
                <h5>Customers</h5>
                <Link to="/customer/new">
                    <Button variant="primary" className="m-2">+ New</Button>
                </Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Customer
