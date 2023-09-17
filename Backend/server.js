
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/PatientBill', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});
const itemSchema = new mongoose.Schema({
  type: String,
  price: String,
  discount: String,
});
const propertySchema = new mongoose.Schema({
  items:[itemSchema],
    discount:String,
    doctor:String,
    date:String,
    duration:String,
    hour:String,
    minute:String,
    timeOfDay:String,
  totalAmount: Number,
  paymentMode: String,
  email: String,
    
});

const Property = mongoose.model('Property', propertySchema);

app.post('/PatientBill', async (req, res) => {
  const propertyData = req.body;

  try {
    const newProperty = new Property(propertyData);

    await newProperty.save();

    res.status(200).json({ message: 'Bill created successfully.' });
  } catch (error) {
    console.error('Error creating Bill:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/PatientBill', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching Bills:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
