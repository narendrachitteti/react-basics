import React, { useState, useEffect } from 'react';
import './BillingDashboard.css';
import { AiOutlineSearch } from "react-icons/ai";

function BillingDashboard() {
  const [patientData, setPatientData] = useState([]);
  const [grandTotalSales, setGrandTotalSales] = useState(0);
  const [grandTotalSalesCount, setGrandTotalSalesCount] = useState(0);
  const [totalPatientsCount, setTotalPatientsCount] = useState(0);
  const [totalBillAmount, setTotalBillAmount] = useState(0);
  const [totalCashAmount, setTotalCashAmount] = useState(0);
  const [totalCardAmount, setTotalCardAmount] = useState(0);
  const [totalOtherAmount, setTotalOtherAmount] = useState(0);
  const [countCash, setCountCash] = useState(0);
  const [countCard, setCountCard] = useState(0);
  const [countOther, setCountOther] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5000/getAllData') // Replace with the actual URL of your backend
      .then((response) => response.json())
      .then((data) => {
        setPatientData(data);

        // Calculate the grand total of sales
        const totalSales = data.reduce((acc, patient) => {
          const salesTotal = patient.sales.reduce((salesAcc, sale) => {
            return salesAcc + parseFloat(sale.amount);
          }, 0);
          return acc + salesTotal;
        }, 0);

        setGrandTotalSales(totalSales);

        // Calculate the grand total count of sales
        const totalSalesCount = data.reduce((acc, patient) => {
          return acc + patient.sales.length;
        }, 0);

        setGrandTotalSalesCount(totalSalesCount);

        // Calculate the total count of patients
        setTotalPatientsCount(data.length);

        // Calculate the total bill amount
        const totalAmount = data.reduce((acc, patient) => {
          return acc + parseFloat(patient.billAmount);
        }, 0);

        setTotalBillAmount(totalAmount);

        // Initialize totals and counts
        let cashAmount = 0;
        let cardAmount = 0;
        let otherAmount = 0;
        let cashCount = 0;
        let cardCount = 0;
        let otherCount = 0;

        data.forEach((patient) => {
          const paymentMethod = patient.selectedPaymentMethod;
          const billAmount = parseFloat(patient.billAmount);

          if (paymentMethod === 'cash') {
            cashAmount += billAmount;
            cashCount++;
          } else if (paymentMethod === 'card') {
            cardAmount += billAmount;
            cardCount++;
          } else {
            otherAmount += billAmount;
            otherCount++;
          }
        });

        // Update state variables for each payment method
        setTotalCashAmount(cashAmount);
        setTotalCardAmount(cardAmount);
        setTotalOtherAmount(otherAmount);
        setCountCash(cashCount);
        setCountCard(cardCount);
        setCountOther(otherCount);

        // Initialize filteredData with all data when the page loads
        setFilteredData(data);

      })
      .catch((error) => console.error(error));
  }, []);

  // Handle the "Go" button click to apply the date filter
  const handleFilterClick = () => {
    // Filter and update patient data based on the selected date range
    if (startDate && endDate) {
      const filtered = patientData.filter((patient) => {
        const billDate = new Date(patient.billdate);
        return billDate >= new Date(startDate) && billDate <= new Date(endDate);
      });

      // Calculate totals based on the filtered data
      const {
        totalSalesCount,
        totalPatientsCount,
        totalBillAmount,
        cashAmount,
        cardAmount,
        otherAmount,
      } = calculateTotals(filtered);

      // Update state variables with filtered data
      setFilteredData(filtered);
      setGrandTotalSalesCount(totalSalesCount);
      setTotalPatientsCount(totalPatientsCount);
      setTotalBillAmount(totalBillAmount);
      setTotalCashAmount(cashAmount);
      setTotalCardAmount(cardAmount);
      setTotalOtherAmount(otherAmount);
    }
  };

  const calculateTotals = (data) => {
    const totalSalesCount = data.reduce((acc, patient) => {
      return acc + patient.sales.length;
    }, 0);

    const totalPatientsCount = data.length;

    const totalBillAmount = data.reduce((acc, patient) => {
      return acc + parseFloat(patient.billAmount);
    }, 0);

    const cashAmount = data.reduce((acc, patient) => {
      if (patient.selectedPaymentMethod === 'cash') {
        return acc + parseFloat(patient.billAmount);
      }
      return acc;
    }, 0);

    const cardAmount = data.reduce((acc, patient) => {
      if (patient.selectedPaymentMethod === 'card') {
        return acc + parseFloat(patient.billAmount);
      }
      return acc;
    }, 0);

    const otherAmount = data.reduce((acc, patient) => {
      if (patient.selectedPaymentMethod !== 'cash' && patient.selectedPaymentMethod !== 'card') {
        return acc + parseFloat(patient.billAmount);
      }
      return acc;
    }, 0);

    return {
      totalSalesCount,
      totalPatientsCount,
      totalBillAmount,
      cashAmount,
      cardAmount,
      otherAmount,
    };
  };



  return (
    <div className="BillDash">
      <h3 className="date2">Date Range</h3>
      <div className="date-container">
        <label>From: </label>
        <input
          className="date3"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>To:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleFilterClick}>Go</button>
      </div>
      <hr />
      <div className="card-container">
        <div className="card">
          <label>Total sales</label>
          <p>{grandTotalSalesCount}</p>
        </div>
        <div className="card">
          <label>Total Bill</label>
          <p>{totalPatientsCount}</p>
        </div>
        <div className="card">
          <label>Total collect</label>
          <p>{totalBillAmount.toFixed(2)}</p>
        </div>
        <div className="card">
          <label>Collect by cash</label>
          <p>{totalCashAmount.toFixed(2)}</p>
        </div>
        <div className="card">
          <label>Collect by card</label>
          <p>{totalCardAmount.toFixed(2)}</p>
        </div>
        <div className="card">
          <label>Others</label>
          <p>{totalOtherAmount.toFixed(2)}</p>
        </div>
      </div>
      <div className="card-container2">
        <div className="card2">
          <h4 className="card-heading">Statistics</h4>
          <div className="card-content">
            <div className="statistic">
              <label>Total Medicines</label>
              <p>{0}</p>
            </div>
            <div className="statistic">
              <label>Total Manufacturers</label>
              <p>{0}</p>
            </div>
            <div className="statistic">
              <label>Current Inventory cost</label>
              <p>{0}</p>
            </div>
            <div className="statistic">
              <label>Current Inventory MRP</label>
              <p>{0}</p>
            </div>
            <div className="statistic">
              <label>In stock Inventory Quantity</label>
              <p>{0}</p>
            </div>
            <div className="statistic">
              <label>Medicine out of stock</label>
              <p>{0}</p>
            </div>
          </div>
        </div>
        <div className="card2">
          <h4 className="card-heading">Latest Sales</h4>
          <div className="card-content">
            <div className="sales-pagination">
              <div className="search-container">
                <input type="text" placeholder="Search" />
                <AiOutlineSearch className="search-icon" />
              </div>
            </div>
            <div className='table-container'>
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Time</th>
                    <th>Sales</th>
                    <th>Return</th>
                    <th>Paid</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                {/* <tbody>{salesData.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.time}</td>
                    <td>{data.sales}</td>
                    <td>{data.Return}</td>
                    <td>{data.paid}</td>
                    <td>{data.balance}</td>
                  </tr>
                ))}</tbody> */}
              </table>
            </div>
            <br />
            {/* {salesData.length === 0 && <span>No data available in table</span>} */}
          </div>
        </div>
        <div className="card2">
          <h4 className="card-heading">Fast Moving product</h4>
          <div className="card-content">
            <div className="sales-pagination">
              <div className="search-container">
                <input type="text" placeholder="Search" />
                <AiOutlineSearch className="search-icon" />
              </div>
            </div>
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sold Qty</th>
                </tr>
              </thead>
              {/* <tbody>{fastMovingProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.product}</td>
                  <td>{product.soldquantity}</td>
                </tr>
              ))}</tbody> */}
            </table><br />
            {/* {fastMovingProducts.length === 0 && <span>No data available in table</span>} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingDashboard;
