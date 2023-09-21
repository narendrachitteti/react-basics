
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb://localhost:27017/PharmaBilling';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const patientSchema = new mongoose.Schema({
  name: String,
  gender: String,
  phone: String,
  email: String,
  referredDoctor: String,
  billdate: String,
  selectedPaymentMethod: String,
  gst: String,
  netAmount: String,  
  roundOff: String,  
  billAmount: String,  
  paidAmount: String,  
  reference: String,
  sales: [
    {
      medicineName: String,
      batch: String,
      price: String,  
      quantity: String,  
      discount: String,  
      total: String,  
      amount: String,  
    },
  ],
});

const Patient = mongoose.model('Patient', patientSchema);

app.get('/getPreviousBill', async (req, res) => {
  try {
    
    const previousBillData = await Patient.find({});
    res.status(200).json(previousBillData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch previous bill data.' });
  }
});
app.get('/calculateTotals', async (req, res) => {
  try {
    const totalsData = await Patient.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$sales.amount' },
          totalBillAmount: { $sum: '$billAmount' },
          totalPaidAmount: { $sum: '$paidAmount' },
          totalNetAmount: { $sum: '$netAmount' },
          
        },
      },
      {
        $project: {
          _id: 0, 
        },
      },
    ]);

    if (totalsData.length > 0) {
      res.status(200).json(totalsData[0]);
    } else {
      res.status(404).json({ error: 'No data found for calculations.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to calculate totals.' });
  }
});

app.post('/saveData', async (req, res) => {
  try {
    const patientData = req.body;
    const newPatient = new Patient(patientData);
    const savedPatient = await newPatient.save();
    res.status(200).json(savedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to save patient data.' });
  }
});

app.get('/getAllData', async (req, res) => {
  try {
    const allPatientData = await Patient.find({});
    res.status(200).json(allPatientData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch patient data.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
