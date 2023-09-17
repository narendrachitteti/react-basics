// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;

// mongoose.connect('mongodb://127.0.0.1:27017/PatientsData', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// let lastAssignedId = 1;

// const patientSchema = new mongoose.Schema({
//   id: String,
//   name: String,
//   gender: String,
//   age: Number,
//   mobile: Number,
//   bloodGroup: String,
//   email: String,
//   address: String,
//   city: String,
//   area: String,
//   referredBy: String,
//   channel: String,
// });

// const Patient = mongoose.model('Patient', patientSchema);

// const billSchema = new mongoose.Schema({
//   type: String,
//   price: String,
//   discount: String,
// });

// const propertySchema = new mongoose.Schema({
//   items: [billSchema],
//   discount: String,
//   doctor: String,
//   date: String,
//   duration: String,
//   hour: String,
//   minute: String,
//   timeOfDay: String,
//   totalAmount: Number,
//   paymentMode: String,
//   email: String,
// });

// const Property = mongoose.model('Property', propertySchema);

// app.post('/addPatient', async (req, res) => {
//   try {
//     lastAssignedId++;
//     const formattedNumber = lastAssignedId.toString().padStart(4, '0'); // Format the number with leading zeros
//     const newPatient = new Patient({
//       id: `JC${formattedNumber}`,
//       name: req.body.name,
//       gender: req.body.gender,
//       age: req.body.age,
//       mobile: req.body.mobile,
//       bloodGroup: req.body.bloodGroup,
//       email: req.body.email,
//       address: req.body.address,
//       city: req.body.city,
//       area: req.body.area,
//       referredBy: req.body.referredBy,
//       channel: req.body.channel,
//     });

//     await newPatient.save();
//     res.status(201).json(newPatient);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to add patient' });
//   }
// });

// app.get('/getPatients', async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.status(200).json(patients);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch patients' });
//   }
// });

// app.post('/addBill', async (req, res) => {


//     const propertyData = req.body;

//   try {
//     const newProperty = new Property(propertyData);

//     await newProperty.save();

//     res.status(200).json({ message: 'Bill created successfully.' });
//   } catch (error) {
//     console.error('Error creating Bill:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// app.get('/getBills', async (req, res) => {
//   try {
//     const bills = await Property.find();
//     res.status(200).json(bills);
//   } catch (error) {
//     console.error('Error fetching Bills:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;

// mongoose.connect('mongodb://127.0.0.1:27017/PatientsData', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// let lastAssignedId = 1;

// const patientSchema = new mongoose.Schema({
//   id: String,
//   name: String,
//   gender: String,
//   age: Number,
//   mobile: Number,
//   bloodGroup: String,
//   email: String,
//   address: String,
//   city: String,
//   area: String,
//   referredBy: String,
//   channel: String,
//   bills: [
//     {
//       type: String,
//       price: String,
//       discount: String,
//       doctor: String,
//       date: String,
//       duration: String,
//       hour: String,
//       minute: String,
//       timeOfDay: String,
//       totalAmount: Number,
//       paymentMode: String,
//     },
//   ],
// });

// const Patient = mongoose.model('Patient', patientSchema);

// app.post('/addPatient', async (req, res) => {
//   try {
//     lastAssignedId++;
//     const formattedNumber = lastAssignedId.toString().padStart(4, '0'); // Format the number with leading zeros
//     const newPatient = new Patient({
//       id: `JC${formattedNumber}`,
//       name: req.body.name,
//       gender: req.body.gender,
//       age: req.body.age,
//       mobile: req.body.mobile,
//       bloodGroup: req.body.bloodGroup,
//       email: req.body.email,
//       address: req.body.address,
//       city: req.body.city,
//       area: req.body.area,
//       referredBy: req.body.referredBy,
//       channel: req.body.channel,
//       bills: [],
//     });

//     await newPatient.save();
//     res.status(201).json(newPatient);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to add patient' });
//   }
// });

// app.get('/getPatients', async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.status(200).json(patients);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch patients' });
//   }
// });

// app.post('/addBill', async (req, res) => {
//   const { patientId, billData } = req.body;

//   try {
//     const patient = await Patient.findOne({ id: patientId });

//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     patient.bills.push(billData);
//     await patient.save();

//     res.status(200).json({ message: 'Bill created successfully.' });
//   } catch (error) {
//     console.error('Error creating Bill:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// app.get('/getBills/:patientId', async (req, res) => {
//   const { patientId } = req.params;

//   try {
//     const patient = await Patient.findOne({ id: patientId });

//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     const bills = patient.bills;
//     res.status(200).json(bills);
//   } catch (error) {
//     console.error('Error fetching Bills:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;

// mongoose.connect('mongodb://127.0.0.1:27017/PatientsData', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// const patientSchema = new mongoose.Schema({
//   id: String,
//   name: String,
//   gender: String,
//   age: Number,
//   mobile: Number,
//   bloodGroup: String,
//   email: String,
//   address: String,
//   city: String,
//   area: String,
//   referredBy: String,
//   channel: String,
//   bills: [
//     {
//       type: String,
//       price: String,
//       discount: String,
//       doctor: String,
//       date: String,
//       duration: String,
//       hour: String,
//       minute: String,
//       timeOfDay: String,
//       totalAmount: Number,
//       paymentMode: String,
//       email: String,
//     },
//   ],
// });

// const Patient = mongoose.model('Patient', patientSchema);

// app.post('/addPatient', async (req, res) => {
//   try {
//     const newPatientData = req.body;
//     const newPatient = new Patient(newPatientData);
//     await newPatient.save();

//     res.status(201).json(newPatient);
//   } catch (error) {
//     console.error('Error adding patient:', error);
//     res.status(500).json({ error: 'Failed to add patient' });
//   }
// });

// app.post('/addBill', async (req, res) => {
//   const { patientId, billData } = req.body;

//   try {
//     const patient = await Patient.findOne({ id: patientId });

//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     patient.bills.push(billData);
//     await patient.save();

//     res.status(200).json({ message: 'Bill created successfully.' });
//   } catch (error) {
//     console.error('Error creating Bill:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// app.get('/getBills/:patientId', async (req, res) => {
//   const { patientId } = req.params;

//   try {
//     const patient = await Patient.findOne({ id: patientId });

//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     const bills = patient.bills;
//     res.status(200).json(bills);
//   } catch (error) {
//     console.error('Error fetching Bills:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;

// mongoose.connect('mongodb://127.0.0.1:27017/PatientsData', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// const combinedSchema = new mongoose.Schema({
//   id: String,
//   name: String,
//   gender: String,
//   age: Number,
//   mobile: Number,
//   bloodGroup: String,
//   email: String,
//   address: String,
//   city: String,
//   area: String,
//   referredBy: String,
//   type: String,
//   price: String,
//   discount: String,
//   doctor: String,
//   date: String,
//   duration: String,
//   hour: String,
//   minute: String,
//   timeOfDay: String,
//   totalAmount: Number,
//   paymentMode: String,
//   email: String,
      
// });

// const CombinedData = mongoose.model('CombinedData', combinedSchema);

// app.post('/addCombinedData', async (req, res) => {
//   try {
//     const combinedData = new CombinedData(req.body);
//     await combinedData.save();
//     res.status(201).json(combinedData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to add data' });
//   }
// });

// app.get('/getCombinedData', async (req, res) => {
//   try {
//     const data = await CombinedData.find();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');

// // Import your patient schema/model here
// const Patient = require('../models/Patient');

// // Define a route to create a patient record
// router.post('/createPatient', async (req, res) => {
//   try {
//     // Generate a unique object ID
//     const objectId = mongoose.Types.ObjectId();
    
//     // Extract patient details from the request body
//     const {
//       name,
//       gender,
//       age,
//       mobile,
//       bloodGroup,
//       email,
//       address,
//       city,
//       area,
//       referredBy,
//     } = req.body;

//     // Create a new patient object with the same object ID
//     const patient = new Patient({
//       _id: objectId,
//       name,
//       gender,
//       age,
//       mobile,
//       bloodGroup,
//       email,
//       address,
//       city,
//       area,
//       referredBy,
//     });

//     // Save the patient record to MongoDB
//     await patient.save();

//     // Return a success response
//     return res.status(201).json({ message: 'Patient added successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Failed to add patient' });
//   }
// });

// module.exports = router;
// Import necessary modules and packages
// server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// mongoose.connect('mongodb://localhost:27017/hospital', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

//   const patientSchema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name: String,
//     gender: String,
//     age: Number,
//     mobile: String,
//     bloodGroup: String,
//     email: String,
//     address: String,
//     city: String,
//     area: String,
//     referredBy: String,
//     billingData: {
//       items: [{
//         type: String,
//         price: Number,
//         discount: Number,
//       }],
//       doctor: String,
//       date: String,
//       duration: Number,
//       hour: Number,
//       minute: Number,
//       timeOfDay: String,
//       totalAmount: Number,
//       paymentMode: String,
//       email: String,
//     },
//   });
  

// const Patient = mongoose.model('Patient', patientSchema);

// app.post('/createPatient', async (req, res) => {
//   try {
//     const objectId = new mongoose.Types.ObjectId();
//     const {
//       name,
//       gender,
//       age,
//       mobile,
//       bloodGroup,
//       email,
//       address,
//       city,
//       area,
//       referredBy,
//     } = req.body;

//     const billingData = {
//       items: [],
//       doctor: '',
//       date: '',
//       duration: 0,
//       hour: 0,
//       minute: 0,
//       timeOfDay: '',
//       totalAmount: 0,
//       paymentMode: '',
//       email: '',
//     };

//     const patient = new Patient({
//       _id: objectId,
//       name,
//       gender,
//       age,
//       mobile,
//       bloodGroup,
//       email,
//       address,
//       city,
//       area,
//       referredBy,
//       billingData: billingData,
//     });

//     await patient.save();

//     return res.status(201).json({ message: 'Patient added successfully', objectId });
//   } catch (error) {
//     console.error('Error creating patient:', error);
//     return res.status(500).json({ error: 'Failed to add patient' });
//   }
// });

// app.post('/createPatient', async (req, res) => {
//   try {
//     const {
//       objectId,
//       items,
//       doctor,
//       date,
//       duration,
//       hour,
//       minute,
//       timeOfDay,
//       totalAmount,
//       paymentMode,
//       email,
//     } = req.body;

//     const patient = await Patient.findById(objectId);

//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     patient.billingData = {
//       items,
//       doctor,
//       date,
//       duration,
//       hour,
//       minute,
//       timeOfDay,
//       totalAmount,
//       paymentMode,
//       email,
//     };

//     await patient.save();

//     return res.status(200).json({ message: 'Billing data added successfully' });
//   } catch (error) {
//     console.error('Error adding billing data:', error);
//     return res.status(500).json({ error: 'Failed to add billing data' });
//   }
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hospitalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const billingSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  mobile: Number,
  bloodGroup: String,
  emails: String,
  address: String,
  city: String,
  area: String,
  referredBy: String,
  services: [
    {
      type: String,
      price: Number,
      discount: Number,
    },
  ],
  doctor: String,
  date: Date,
  duration: Number,
  hour: Number,
  minute: Number,
  timeOfDay: String,
  totalAmount: Number,
  paymentMode: String,
  email: String,
});

const Billing = mongoose.model('Billing', billingSchema);

app.post('/addDandB', async (req, res) => {
  try {
    const newBilling = new Billing(req.body);
    await newBilling.save();
    res.status(201).json({ message: 'Data posted successfully!' });
  } catch (error) {
    console.error('Error submitting billing data:', error);
    res.status(500).json({ error: 'Data posting failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
