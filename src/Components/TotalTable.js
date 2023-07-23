import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const TotalTable = ({ amount }) => {
  const [total, setTotal] = useState(amount);

  useEffect(() => {
    setTotal(amount);
  }, [amount]);

  const changeTax = (e) => {
    const tax = parseFloat(e.target.value);
    setTotal((prevTotal) => prevTotal + tax);
  };

  const changeDiscount = (e) => {
    const discount = parseFloat(e.target.value);
    setTotal((prevTotal) => prevTotal - discount);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sub Total</th>
          <th>Tax</th>
          <th>Discount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Form.Group className="mb-3" controlId="subTotal">
              <Form.Control type="number" placeholder="Enter Sub Total" value={amount} />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="tax">
              <Form.Control type="number" placeholder="Enter Tax" onChange={changeTax} />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="discount">
              <Form.Control type="number" placeholder="Enter Discount" onChange={changeDiscount} />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="total">
              <Form.Control type="number" placeholder="Enter Total" value={total} />
            </Form.Group>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TotalTable;
