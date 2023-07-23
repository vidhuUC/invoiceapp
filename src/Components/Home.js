import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Invoice Management App</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h4>Manage Customers</h4>
          <p>
            Keep track of your customers' information, including their names, emails, and contact details.
          </p>
          <Link to="/customer">
            <Button variant="primary">View Customers</Button>
          </Link>
        </div>
        <div className="col-md-6 mb-4">
          <h4>Manage Items</h4>
          <p>
            Keep track of your items, including their names, descriptions, and prices.
          </p>
          <Link to="/items">
            <Button variant="primary">View Items</Button>
          </Link>
        </div>
        <div className="col-md-6 mb-4">
          <h4>Create Invoices</h4>
          <p>
            Generate and manage invoices for your customers, including due dates, item details, and total amounts.
          </p>
          <Link to="/invoice">
            <Button variant="primary">View Invoices</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
