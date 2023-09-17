
const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  
  time: Date,
  sales: Number,

});

const SalesData = mongoose.model('SalesData', salesSchema);

module.exports = SalesData;
