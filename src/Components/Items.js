import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const Items = () => {
    const [items, setItems] = useState([])
    const url = 'http://localhost:8000/api/items'

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url)
            const data = await response.json()
            setItems(data)
        }
        fetchData();
    }, []);
    return (
        <div className="m-5">
            <div className="d-flex justify-content-between">
                <h5>Items</h5>
                <Link to="/items/new">
                    <Button variant="primary" className="m-2">+ New</Button>
                </Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Unit Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Items
