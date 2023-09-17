const express = require('express');
const { app, Patient } = require('./barcodeserver'); // Replace with the correct path to your server file

const router = express.Router();

// Define your routes here
// Example:
router.get('/getPatients', async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// Export the router
module.exports = router;
