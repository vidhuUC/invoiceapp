import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const ItemTable = ({ setAmount,setCurrentItems,currentItems }) => {
    const [items, setItems] = useState([]);
    const [rows, setRows] = useState(1);

    const url = "http://localhost:8000/api/items";

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setItems(data);
        };
        fetchData();
    }, []);

    const addNewRow = () => {
        setRows(rows + 1);
        setCurrentItems([...currentItems, {}]);
    };

    const selectItem = (e, index) => {
        const itemID = e.target.value;
        const item = items.find((item) => item._id === itemID);
        const updatedItems = [...currentItems];
        updatedItems[index] = { ...item, quantity: 0, amount: 0 };
        setCurrentItems(updatedItems);
    };

    const changeQuantity = (e, index) => {
        const quantity = parseInt(e.target.value);
        const item = currentItems[index];
        const amount = quantity * item.unitPrice;
        const updatedItems = [...currentItems];
        updatedItems[index] = { ...item, quantity, amount };
        setCurrentItems(updatedItems);
        setAmount(updatedItems.reduce((total, item) => total + item.amount, 0));
    };

    return (
        <>
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
                    {Array(rows)
                        .fill()
                        .map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <Form.Group className="mb-3" controlId="item">
                                        <Form.Select
                                            aria-label="Select Item"
                                            onChange={(e) => selectItem(e, index)}
                                        >
                                            <option>Select Item</option>
                                            {items.map((item, itemIndex) => (
                                                <option key={itemIndex} value={item._id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group className="mb-3" controlId="quantity">
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Quantity"
                                            onChange={(e) => changeQuantity(e, index)}
                                            value={currentItems[index].quantity || ""}
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group className="mb-3" controlId="rate">
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Rate"
                                            value={currentItems[index].unitPrice || ""}
                                            readOnly
                                        />
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group className="mb-3" controlId="amount">
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Amount"
                                            value={currentItems[index].amount || ""}
                                            readOnly
                                        />
                                    </Form.Group>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Button variant="primary" size="sm" className="mb-2" onClick={addNewRow}>
                Add Item
            </Button>
        </>
    );
};

export default ItemTable;
