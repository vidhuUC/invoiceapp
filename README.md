# Invoice App - README

## Description
The Invoice App is a web application that allows users to manage invoices, customers, and items. It enables users to create new customers, add new items, generate invoices by selecting customers and items, and preview the invoices before saving them. The app also provides the option to use dummy data for testing purposes, including 6 sample invoices, 4 customers, and 4 items.

## Use Cases
The Invoice App facilitates the following use cases:
1. Create a new customer: Users can add new customers to the app by providing their name, email, phone number, and address.
2. Create new items: Users can add new items to the inventory by specifying their name, description, and price.
3. Create invoices: Users can generate invoices by selecting a customer and adding items to the invoice. The app automatically calculates the total amount.
4. Preview invoices: Users can view a preview of the generated invoices before saving them. The preview includes customer details, invoice date, due date, item details, total amount, and any additional notes.
5. Use dummy data: The app provides an option to populate the database with dummy data for testing purposes. It includes 6 sample invoices, 4 customers, and 4 items.

## Features
- Create new customers with name, email, phone number, and address.
- Add new items with name, description, and price to the inventory.
- Generate invoices by selecting a customer and adding items.
- Calculate the total amount automatically based on the selected items.
- Preview invoices before saving them.
- Use dummy data for testing with 6 sample invoices, 4 customers, and 4 items.

## Getting Started
To run the Invoice App on your local machine, follow these steps:

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies for both the backend and frontend:
```bash
cd invoice-app
npm install
cd client
npm install
```

3. Run both the backend and frontend concurrently:
```bash
npm run both
```

This command will start the backend server and the frontend application, and you can access the app in your web browser at `http://localhost:3000`.

## Technologies Used
The Invoice App is built using the following technologies:
- Frontend: React, React Bootstrap
- Backend: Node.js, Express.js, MongoDB
- Other tools: Fetch, react-router-dom
