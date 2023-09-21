import React, { useState, useEffect } from 'react';

function PatientData() {
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
    const [startDate, setStartDate] = useState(''); // State for start date input
    const [endDate, setEndDate] = useState('');     // State for end date input
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

    // Handle the filter button click
    const handleFilterClick = () => {
        // Filter and update patient data based on the selected date range
        if (startDate && endDate) {
            const filtered = patientData.filter((patient) => {
                const billDate = new Date(patient.billdate);
                return billDate >= new Date(startDate) && billDate <= new Date(endDate);
            });
            setFilteredData(filtered); // Update the filtered data state
        }
    };

    return (


        <div>
            <h2>Date Range Filter</h2>
            <div>
                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button onClick={handleFilterClick}>Filter</button>
            <h2>Patient Data</h2>
            <ul>
                {filteredData.map((patient) => (
                    <li key={patient._id}>
                        <strong>Name:</strong> {patient.name}<br />
                        <strong>Gender:</strong> {patient.gender}<br />
                        <strong>Phone:</strong> {patient.phone}<br />
                        <strong>Email:</strong> {patient.email}<br />
                        <strong>Referred Doctor:</strong> {patient.referredDoctor}<br />
                        <strong>Bill Date:</strong> {patient.billdate}<br />
                        <strong>Selected Payment Method:</strong> {patient.selectedPaymentMethod}<br />
                        <strong>GST:</strong> {patient.gst}<br />
                        <strong>Net Amount:</strong> {patient.netAmount}<br />
                        <strong>Round Off:</strong> {patient.roundOff}<br />
                        <strong>Bill Amount:</strong> {patient.billAmount}<br />
                        <strong>Paid Amount:</strong> {patient.paidAmount}<br />
                        <strong>Reference:</strong> {patient.reference}<br />

                        <div>
                            <h3>Sales:</h3>
                            <ul>
                                {patient.sales.map((sale, index) => (
                                    <li key={index}>
                                        <strong>Medicine Name:</strong> {sale.medicineName}<br />
                                        <strong>Batch:</strong> {sale.batch}<br />
                                        <strong>Price:</strong> {sale.price}<br />
                                        <strong>Quantity:</strong> {sale.quantity}<br />
                                        <strong>Discount:</strong> {sale.discount}<br />
                                        <strong>Total:</strong> {sale.total}<br />
                                        <strong>Amount:</strong> {sale.amount}<br />
                                    </li>
                                ))}
                            </ul>
                            <p>Total Sales: {patient.sales.length}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <h2>Grand Total Sales</h2>
            <p>{grandTotalSales}</p>
            <h2>Grand Total Sales Count</h2>
            <p>{grandTotalSalesCount}</p>
            <p>Total Patients: {totalPatientsCount}</p>
            <p>Total Bill Amount: ${totalBillAmount.toFixed(2)}</p>
            <h2>Payment Method Summary</h2>
            <p>Cash Total: ${totalCashAmount.toFixed(2)}</p>
            <p>Card Total: ${totalCardAmount.toFixed(2)}</p>
            <p>Other Total: ${totalOtherAmount.toFixed(2)}</p>
            <p>Cash Count: {countCash}</p>
            <p>Card Count: {countCard}</p>
            <p>Other Count: {countOther}</p>
        </div>
    );
}

export default PatientData;
