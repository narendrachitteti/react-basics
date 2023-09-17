import React, { useState, useEffect } from 'react';
import './AllBills.css';
import { BsFilterLeft } from "react-icons/bs";
import axios from 'axios';
import { AiFillPrinter,AiOutlineDelete } from "react-icons/ai";

function AllBills() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [search] = useState('');
  const [returnbycash, setReturnbycash] = useState(0);
  const [Totalbilled, setTotalbilled] = useState(0);
  const [returnbycard, setReturnbycard] = useState(0);
  const [collectedbycash, setcollectedbycash] = useState(0);
  const [collectedbycard, setcollectedbycard] = useState(0);
  const [collectedbyothers, setcollectedByOthers] = useState(0);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePrintTable = () => {
    const printWindow = window.open('', '', 'width=600,height=600');
  
    printWindow.document.write('<html><head><title>Print Table</title></head><body>');
    printWindow.document.write('<h1>Table Data</h1>');
    printWindow.document.write('<table border="1">');
    
    printWindow.document.write('<thead><tr>');
    printWindow.document.write('<th>Order Id</th>');
    printWindow.document.write('<th>Name</th>');
    printWindow.document.write('<th>Time</th>');
    printWindow.document.write('<th>TotalAmount</th>');
    printWindow.document.write('<th>PaidAmount</th>');
    printWindow.document.write('<th>Balance</th>');
    printWindow.document.write('<th>Collection</th>');
    printWindow.document.write('<th>Return</th>');

  
    printWindow.document.write('</tr></thead>');
  
    printWindow.document.write('<tbody>');
    salesData.forEach((data) => {
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${data.OrderID}</td>`);
      printWindow.document.write(`<td>${data.name}</td>`);
      printWindow.document.write(`<td>${data.time}</td>`);
      printWindow.document.write(`<td>${data.totalAmount}</td>`);
      printWindow.document.write(`<td>${data.paidAmount}</td>`);
      printWindow.document.write(`<td>${data.balance}</td>`);
      printWindow.document.write(`<td>${data.Totalcollect}</td>`);
      printWindow.document.write(`<td>${data.Return}</td>`);


    
      printWindow.document.write('</tr>');
    });
    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
  
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  
  const handleDeleteRow = (index) => {
    const updatedSalesData = [...salesData];
    updatedSalesData.splice(index, 1);
    setSalesData(updatedSalesData);
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/properties');
      const data = response.data[0];

    setTotalbilled(data.Totalbilled);
    setcollectedbycash(data.collectedbycash);
    setcollectedbycard(data.collectedbycard);
    setcollectedByOthers(data.collectedbyothers);
    setReturnbycard(data.returnbycard);
    setReturnbycash(data.returnbycash);
    setSalesData(response.data);
  } catch (error) {
    console.error(error);
  }
};
const renderSalesData = () => {
  return salesData.map((data, index) => (
    <tr key={index}>
      <td>{data.OrderID}</td>
      <td>{data.name}</td>
      <td>{data.time}</td>
      <td>{data.totalAmount}</td>
      <td>{data.paidAmount}</td>
      <td>{data.balance}</td>
      <td>{data.Totalcollect}</td>
      <td><button onClick={handlePrintTable}><AiFillPrinter/></button></td>
      <td>{data.Return}</td>
      <td><button onClick={() => handleDeleteRow(index)}><AiOutlineDelete/></button></td>

    </tr>
  ));
};

  return (
    <div className="Allbillsform">
        <h3 className='date2'>Date Range</h3>
      <div className="date-container">
        
        <label className='fromdate'>From: </label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <label className='todate'>To:</label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button>Go</button>
      </div>
      <div className="date-container12">
        <input type="text" value={search} placeholder='Search by Name,Order ID' />
        <button>Search</button>
      </div>
      <hr/>
      <div className="card-container">
        <div className="card">
          <label>Total Billed</label>
          <p>{Totalbilled}</p>
        </div>
        <div className="card">
          <label>Collected By Cash</label>
          <p>{collectedbycash}</p>
        </div>
        <div className="card">
          <label>Collected by Card</label>
          <p>{collectedbycard}</p>
        </div>
        <div className="card">
          <label>Collect by Others</label>
          <p>{collectedbyothers}</p>
        </div>
        <div className="card">
          <label>Return by Cash</label>
          <p>{returnbycash}</p>
        </div>
        <div className="card">
          <label>Return by Card</label>
          <p>{returnbycard}</p>
        </div>
        <div className="card">
          <label>Return by others</label>
          <p>{collectedbyothers}</p>
        </div>
      </div>
      <div className="card-container2">
        <div className="card2">
          <div className="card-content">
            
            <div className="sales-pagination">
            <input type='text' placeholder='Search'/>
            </div>
            <div className='table-container'>
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Order Id&nbsp;&nbsp;&nbsp;<BsFilterLeft/></th>
                  <th>Name&nbsp;&nbsp;&nbsp;<BsFilterLeft/></th>
                  <th>Time&nbsp;&nbsp;&nbsp;<BsFilterLeft/></th>
                  <th>Total Amount&nbsp;&nbsp;&nbsp;<BsFilterLeft/></th>
                  <th>Paid Amount&nbsp;&nbsp;&nbsp;<BsFilterLeft/></th>
                  <th>Balance&nbsp;&nbsp;&nbsp;<BsFilterLeft/></th>
                  <th>Collection</th>
                  <th>Print</th>
                  <th>Return</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{renderSalesData()}</tbody>
            </table>
            </div>
            <br/>
            {salesData.length === 0 && <span>No data available in table</span>}
            </div>
        
        </div>
    
      </div>
    </div>
  );
}

export default AllBills;
