const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentMethod: String, // 'cash' or 'card'
  // Add other fields related to payments as needed
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
