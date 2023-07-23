const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express()
const port = 8000

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/invoiceData', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/api', require('./routes/Customer'))
app.use('/api', require('./routes/Items'))
app.use('/api', require('./routes/Invoices'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
