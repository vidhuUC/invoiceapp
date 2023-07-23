import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const NewCustomer = () => {
    const [customer, setCustomer] = useState({})
    const navigate = useNavigate()
    const url = 'http://localhost:8000/api/customers'
    const postCustomer = async (body) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    const addCustomer = (e) => {
        e.preventDefault()
        const name = e.target.elements.formName.value
        const email = e.target.elements.formBasicEmail.value
        const phone = e.target.elements.formPhone.value
        const address = e.target.elements.formAddress.value
        setCustomer({ name, email, phone, address })
        postCustomer({ name, email, phone, address })
        navigate('/customer')
    }

    return (
        <Form className='m-5' onSubmit={addCustomer}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={customer.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={customer.email} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone" value={customer.phone}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter address" value={customer.address}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
    )
}

export default NewCustomer
