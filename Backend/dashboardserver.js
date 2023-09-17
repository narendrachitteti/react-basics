
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Masterdashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const propertySchema = new mongoose.Schema({

    time : String ,
    sales : String ,
    Return : String,
    Totalpaid : String,
    balance : String,
    Totalmedicines : String,
    Totalmanufacturers : String,
    currentInventoryCost : String,
    currentInventoryMRP : String,
    stockInventoryQuantity : String,
    Medicineoutofstock : String,
    totalSales:String,
    Totalbilled:String,
    totalCollect:String,
    collectedbycash:String,
    collectedbycard:String,
    collectByothers:String,
    totalCash: Number,
    totalCard: Number,

});

const Property = mongoose.model('Property', propertySchema);

const calculatePaymentCounts = async () => {
  try {
    const pipeline = [
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
        },
      },
    ];

    const result = await Property.aggregate(pipeline);
    return result;
  } catch (error) {
    console.error('Error calculating payment counts:', error);
    throw error;
  }
};

app.post('/patients', async (req, res) => {
  const propertyData = req.body;

  try {
    const newProperty = new Property(propertyData);

    await newProperty.save();

    res.status(200).json({ message: 'Property created successfully.' });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/properties', async (req, res) => {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});