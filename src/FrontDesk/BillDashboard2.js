import React, { useState, useEffect } from 'react';
import './BillingDashboard.css';
import axios from 'axios';

function BillingDashboard() {
    const [salesData, setSalesData] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        // Fetch sales data
        const salesResponse = await axios.get('/api/sales');
        setSalesData(salesResponse.data);
  
        // Fetch statistics data
        const statisticsResponse = await axios.get('/api/statistics');
        setStatistics(statisticsResponse.data);
  
        // You can add more data fetching here if needed
      } catch (error) {
        console.error(error);
      }
    };