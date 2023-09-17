const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');


const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/billing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BillingSchema = new mongoose.Schema({
  date: String,
  bill: Number,
  department: String,
  paid: Number,
  printerValue: Number,
  discountper: String,
  due: Number,
  refund: Number,
  service: String,
  price: Number,
  gst: Number,
  discount: Number,
  deleteColor: String,
});

const Billing = mongoose.model('Billing', BillingSchema);

app.use(bodyParser.json());


app.get('/api/billing', async (req, res) => {
  try {
    const data = await Billing.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/billing/:id', async (req, res) => {
  try {
    const deletedRecord = await Billing.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
