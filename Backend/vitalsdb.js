const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Vitals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const propertySchema = new mongoose.Schema({


     bp:String,
     sugar:String,
     height:String,
     weight:String,
     temperature:String,
     spo2:String,
     pallor:String,
     edema:String,
     lcterus:String,
     lymphadenopathy:String,
     ciubbing:String,
     cyanosis:String,
     jvp:String,
});

const Property = mongoose.model('Property', propertySchema);

app.post('/Vitals', async (req, res) => {
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

app.get('/Vitals', async (req, res) => {
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
