import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';

const NewItem = () => {
    const [item, setItem] = useState({})
    const navigate = useNavigate()
    const url = 'http://localhost:8000/api/items'

    const postItem = async (body) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    const addItem = (e) => {
        e.preventDefault()
        const name = e.target.elements.formName.value
        const unitPrice = e.target.elements.unitPrice.value
        const description = e.target.elements.description.value
        setItem({ name, unitPrice, description })
        postItem({ name, unitPrice, description })
        navigate('/items')

    }
    return (
        <Form className='m-5' onSubmit={addItem}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={item.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="unitPrice">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">USD</InputGroup.Text>
                    <Form.Control
                        type="number"
                        placeholder="Unit Price"
                        value={item.unitPrice}
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={item.description} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
    )
}

export default NewItem
