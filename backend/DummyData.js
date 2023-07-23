const Customer = require('./models/Customer');
const Item = require('./models/Items');
const Invoice = require('./models/Invoices');

const customers = [
    {
        name: 'John Doe',
        email: 'test@test',
        phone: '1234567890',
        address: '123 Main St 12345',
    },
    {
        name: 'Sarah Smith',
        email: 'test2@test',
        phone: '0987654321',
        address: '321 Main St 54321',
    },
    {
        name: 'Scott Johnson',
        email: 'test3@test',
        phone: '1230984567',
        address: '123 Main St 12345',
    },
    {
        name: 'Jane Doe II',
        email: 'test4@test',
        phone: '1234567890',
        address: '123 Main St 12345',
    },
];

const items = [
    {
        name: 'Item 1',
        description: 'This is item 1',
        unitPrice: 10,
    },
    {
        name: 'Item 2',
        description: 'This is item 2',
        unitPrice: 20,
    },
    {
        name: 'Item 3',
        description: 'This is item 3',
        unitPrice: 30,
    },
    {
        name: 'Item 4',
        description: 'This is item 4',
        unitPrice: 40,
    },
];

const invoices = [
    {

        customerId: 1,
        invoiceDate: '2024-06-01',
        dueDate: '2025-06-30',
        notes: 'This is a test invoice.',
        itemIds: [1, 2],
        status: 'pending',
        total: 30,
    }, {
        customerId: 2,
        invoiceDate: '2025-06-02',
        dueDate: '2026-06-30',
        notes: 'This is a test invoice.',
        itemIds: [3, 4],
        status: 'pending',
        total: 70,
    }, {
        customerId: 3,
        invoiceDate: '2023-06-02',
        dueDate: '2024-06-30',
        notes: 'This is a test invoice.',
        itemIds: [1, 2],
        status: 'paid',
        total: 70,
    },
    {
        customerId: 4,
        invoiceDate: '2025-06-02',
        dueDate: '2026-06-30',
        notes: 'This is a test invoice.',
        itemIds: [3, 4],
        status: 'paid',
        total: 70,
    }, {
        customerId: 1,
        invoiceDate: '2021-06-02',
        dueDate: '2021-06-30',
        notes: 'This is a test invoice.',
        itemIds: [3, 4],
        status: 'late',
        total: 70,
    }, {
        customerId: 2,
        invoiceDate: '2021-06-02',
        dueDate: '2021-06-30',
        notes: 'This is a test invoice.',
        itemIds: [3, 4],
        status: 'late',
        total: 70,
    }

]

const insertDummyData = async () => {
    try {
        // Insert customers into the database
        const customerData = await Customer.insertMany(customers);

        // Insert items into the database
        const itemData = await Item.insertMany(items);

        // Map the customer and item data to use their IDs in the invoices
        const customerIdMap = new Map();
        const itemIdMap = new Map();

        customerData.forEach((customer) => {
            customerIdMap.set(customer.name, customer._id);
        });

        itemData.forEach((item) => {
            itemIdMap.set(item.name, item._id);
        });

        // Insert invoices into the database
        const invoiceData = invoices.map((invoice) => {
            return {
                ...invoice,
                customerId: customerIdMap.get(customers[invoice.customerId - 1].name),
                itemIds: invoice.itemIds.map((itemName) => itemIdMap.get(items[itemName - 1].name)),
            };
        });

        await Invoice.insertMany(invoiceData);

        console.log('Dummy data inserted successfully.');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
};
module.exports = insertDummyData;
