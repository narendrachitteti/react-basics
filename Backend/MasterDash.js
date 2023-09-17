const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Masterdashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const dataSchema = new mongoose.Schema({
  // Define your schema here
  //  invoiceNumber: String,
  //       stockName: String,
        date: String,
        Medicine:String,
        Batch: String,
        BatchExpiry: String,
        Unit: Number,
        strips: Number,
        Freestrips: Number,
        Gst: Number,
        Totalsales: Number,
        Totalcollect: Number,
        price: Number,
        currentinventorycost: Number,
        currentinventorymrp: Number,
        instockinventoryquantity: Number,
        medicineoutofstock: String,
        sales: Number,
        paid: Number,
        product: String,
        MRP: Number,
        Total: Number,
        isChecked: String,
        HSNcode: String,
        RackNo: Number,
        BookNo: Number,
        NetPrice: Number,
        ManufactureName: String,
        MedID: String,
        StockistName: String,
        Stockistemail: String,
        Category: String,
        AddDate: String,
        Orderno: Number,
        gstno: Number,
        stockistID: String,
        packprice: Number,
        packmrp: Number,
        unitsperpack: Number,
        personname: String,
        time: String,
        OrderID: String,
        InvoiceID: String,
        Totalmedicines: Number,
        Totalmanufacturers: String,
        Totalbilled: Number,
        outstanding: String,
        collectedbycash: Number,
        collectedbycard: Number,
        collectedbyothers: Number,
        mobile: Number,
        Return: String,
        returnbycash: Number,
        returnbycard: Number,
        stockID: String,
        Totalbalance: Number,
        Totalpaid: Number,
        balance: Number,
        totalamount: Number,
        Invoicenumber: Number,
        unitsprice: Number,
        unitsinstock: Number,
        expiry: String,
        percentdiscount:Number ,
        percentgst: Number,
        intax: Number,
        noofstrips: Number,
        discount: Number,
        soldquantity: Number,


});

const Data = mongoose.model('Data', dataSchema);

app.post('/properties', (req, res) => {
  const data = req.body;

  const newData = new Data(data);

  newData
    .save()
    .then(() => res.json('Data saved!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

app.get('/properties', (req, res) => {
  Data.find() 
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
