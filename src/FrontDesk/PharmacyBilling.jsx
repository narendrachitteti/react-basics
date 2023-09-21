
import React, { useState, useEffect } from 'react';
import './PharmacyBilling.css';
import axios from 'axios';

  function PharmacyBilling() {
    const [billdate, setBillDate] = useState('');
    const [medicineName, setMedicineName] = useState('');
    const [batch, setBatch] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [discount, setDiscount] = useState('');
    const [total, setTotal] = useState('');
    const [amount, setAmount] = useState('');
    const [sales, setSales] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');
    const [gst, setGst] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [roundOff, setRoundOff] = useState(0);
    const [billAmount, setBillAmount] = useState(0);
    const [paidAmount, setPaidAmount] = useState(0);
    const [reference, setReference] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [patientName, setPatientName] = useState('');
    const [patientGender, setPatientGender] = useState(''); 
    const [patientPhone, setPatientPhone] = useState('');
    const [patientEmail, setPatientEmail] = useState(''); 
    const [referredDoctor, setReferredDoctor] = useState('');
    const [editedSale, setEditedSale] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [fetchedBillData, setFetchedBillData] = useState(null);
    const [isNewBill, setIsNewBill] = useState(true);
    const [patientData, setPatientData] = useState({
        name: '',
        gender: '',
        phone: '',
        email: '',
        referredDoctor: '',
        billdate: '',
        selectedPaymentMethod: '',
        gst: '',
        netAmount: '',
        roundOff: '',
        billAmount: '',
        paidAmount: '',
        reference: '',
      });
    
      const [currentSale, setCurrentSale] = useState({
        medicineName: '',
        batch: '',
        price: '',
        total: '',
        quantity: '',
        discount: '',
      });
    

    const handleAddClick = () => {
      if (editingIndex !== null) {

        const updatedSales = [...sales];
        const calculatedTotal =
          parseFloat(currentSale.price) * parseFloat(currentSale.quantity);
        const calculatedDiscount =
          (calculatedTotal * parseFloat(currentSale.discount)) / 100;
        const calculatedAmount = calculatedTotal - calculatedDiscount;
  
        updatedSales[editingIndex] = {
          ...currentSale,
          total: calculatedTotal.toFixed(2),
          amount: calculatedAmount.toFixed(2),
        };
  
        setSales(updatedSales);
        setEditingIndex(null);
      } else {
        
        const calculatedTotal =
          parseFloat(currentSale.price) * parseFloat(currentSale.quantity);
        const calculatedDiscount =
          (calculatedTotal * parseFloat(currentSale.discount)) / 100;
        const calculatedAmount = calculatedTotal - calculatedDiscount;
  
        const newSale = {
          ...currentSale,
          total: calculatedTotal.toFixed(2),
          amount: calculatedAmount.toFixed(2),
        };
  
        setSales([...sales, newSale]);
      }
  
      setCurrentSale({
        medicineName: '',
        batch: '',
        price: '',
        total:'',
        quantity: '',
        discount: '',
      });
    };
  
    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:5000/saveData', {
        ...patientData,
        sales,
      });

        if (response.status === 200) {
          console.log('Data saved successfully');
          setPatientData({
            name: '',
            gender: '',
            phone: '',
            email: '',
            referredDoctor: '',
            billdate: '',
            selectedPaymentMethod: '',
            gst: '',
            netAmount: '',
            roundOff: '',
            billAmount: '',
            paidAmount: '',
            reference: '',
          });
          setSales([]);
        } else {
          console.error('Failed to save data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    const handleEditChange = (fieldName, newValue) => {
        if (editedSale !== null) {
          setEditedSale({
            ...editedSale,
            [fieldName]: newValue,
          });
        }
      };    
    
    const handleEditClick = (index) => {
        const selectedSale = sales[index];
        setEditedSale(selectedSale); 
        setEditingIndex(index);
      };
  const handleDeleteClick = (index) => {
    const updatedSales = [...sales];
    updatedSales.splice(index, 1);
    setSales(updatedSales);
    setEditingIndex(null);
  };
  const handleUpdateClick = () => {
    if (editedSale !== null) {
      const updatedSales = [...sales];
      const calculatedTotal =
        parseFloat(editedSale.price) * parseFloat(editedSale.quantity);
      const calculatedDiscount =
        (calculatedTotal * parseFloat(editedSale.discount)) / 100;
      const calculatedAmount = calculatedTotal - calculatedDiscount;

      updatedSales[editingIndex] = {
        ...editedSale,
        total: calculatedTotal.toFixed(2),
        amount: calculatedAmount.toFixed(2),
      };

      setSales(updatedSales);
      setEditingIndex(null);
      setEditedSale(null);
    }
  };  
  useEffect(() => {
    const fetchData = async () => {
      const dataToSave = {
      name: patientName,
      gender: patientGender,
      phone: patientPhone,
      email: patientEmail,
      referredDoctor: referredDoctor,
      billdate: billdate,
      medicineName: medicineName,
      batch: batch,
      price: price,
      quantity: quantity,
      discount: discount,
      total: total,
      amount: amount,
      selectedPaymentMethod: selectedPaymentMethod,
      gst: gst,
      netAmount: netAmount,
      roundOff: roundOff,
      billAmount: billAmount,
      paidAmount: paidAmount,
      reference: reference,
    };
    try {
      const response = await axios.post('http://localhost:5000/saveData', dataToSave);

      if (response.status === 200) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (patientName && billdate && medicineName && batch && price && quantity && discount) {
    fetchData();
  }
}, []);

const handleClearBillClick = () => {
  
  setBillDate('');
  setPatientName('');
  setPatientGender('');
  setPatientPhone('');
  setPatientEmail('');
  setReferredDoctor('');
  setSales([]);
  setGst(0);
  setNetAmount(0);
  setRoundOff(0);
  setBillAmount(0);
  setPaidAmount(0);
  setReference('');
  setCurrentSale({
    medicineName: '',
    batch: '',
    price: '',
    total: '',
    quantity: '',
    discount: '',
  });
};

const openPopupWithBillData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/getPreviousBill');

    if (response.status === 200) {
      
      setFetchedBillData(response.data);

      const popup = window.open('', '_blank', 'width=600,height=400');
      if (popup) {
        popup.document.open();
        popup.document.write(
          `<html><head><title>Previous Bill</title></head><body><h2>Previous Bills</h2><pre>${JSON.stringify(
            response.data,
            null,
            2
          )}</pre></body></html>`
        );
        popup.document.close();
      } else {
        console.error('Failed to open popup window');
      }
    } else {
      console.error('Failed to fetch previous bill data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const closePopup = () => {
  setIsPopupOpen(false);
};

const handleSaveAndPrintClick = async () => {
  try {
    const response = await axios.post('http://localhost:5000/saveData', {
      ...patientData,
      sales,
    });

    if (response.status === 200) {
      console.log('Data saved successfully');
    } else {
      console.error('Failed to save data');
      return;
    }
  } catch (error) {
    console.error('Error:', error);
    return;
  }

  // Clear specific input fields here
  setCurrentSale({
    medicineName: '',
    batch: '',
    price: '',
    quantity: '',
    discount: '',
    total: '',
    amount: '',
  });

  // Clear patient data fields
  setPatientData({
    name: '',
    gender: '',
    phone: '',
    email: '',
    referredDoctor: '',
    billdate: '',
    selectedPaymentMethod: '',
    gst: '',
    netAmount: '',
    roundOff: '',
    billAmount: '',
    paidAmount: '',
    reference: '',
  });

  setSales([]);

  setSelectedPaymentMethod('cash');
  setGst(0);
  setNetAmount(0);
  setRoundOff(0);
  setBillAmount(0);
  setPaidAmount(0);
  setReference('');


  const popup = window.open('', '_blank', 'width=600,height=400');
  if (popup) {
    popup.document.open();
    popup.document.write(
      `<html><head><title>Printed Bill</title></head><body><h2>Printed Bill</h2>` +
      `<p>Patient Name: ${patientData.name}</p>` +
      `<p>Bill Date: ${patientData.billdate}</p>` +
      `<table border="1" cellpadding="5"><thead><tr><th>Medicine Name</th><th>Batch</th><th>Price</th><th>Quantity</th><th>Total</th><th>Discount</th><th>Amount</th></tr></thead><tbody>` +
      `${sales.map((sale, index) => (
        `<tr key=${index}><td>${sale.medicineName}</td><td>${sale.batch}</td><td>${sale.price}</td><td>${sale.quantity}</td><td>${sale.total}</td><td>${sale.discount}</td><td>${sale.amount}</td></tr>`
      )).join('')}` +
      `</tbody></table>` +
      `</body></html>`
    );
    popup.document.close();
  } else {
    console.error('Failed to open popup window');
  }
};


  const BillPopup = () => {
    return (
      <div className="popup">
        <div className="popup-content">
          <h2>Previous Bill</h2>
          <pre>{JSON.stringify(fetchedBillData, null, 2)}</pre>
          <button onClick={closePopup}>Close</button>
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (isNewBill) {
      setBillDate('');
      // Reset other form fields as needed

      // Set isNewBill to false to indicate it's not a new bill anymore
      setIsNewBill(false);
    }
  }, [isNewBill]);
  return (
    <div className="PharmacyBilling">
      <h3 className='date23'>Pharmacy Billing :<hr/></h3>
      
      <div className="main-content">
      <div className='bill123'>
          <label>Bill Date:</label>
          <input 
            type="date" 
            value={patientData.billdate} 
            onChange={(e) => setPatientData({ ...patientData, billdate: e.target.value })}
          />
          <button className='but12' onClick={handleClearBillClick}>Clear Bill</button>
          <button className='but23' onClick={openPopupWithBillData}>Print prev bill</button>
          {isPopupOpen && <BillPopup />}
        </div>
        <div className="card-container22">
          <div className="card22">
            <div className="patient-details-card">
              <div className="form-row">
                <label>Patient name *</label>
                <input
                  type="text"
                  value={patientData.name}
                  onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                />
              </div>
              <div className="form-row">
                <label>Gender</label>
                <select
                  value={patientData.gender}
                  onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                >
                  <option>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>
              <div className="form-row">
                <label>Phone</label>
                <input
                  type="number"
                  value={patientData.phone}
                  onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                />
              </div>
              <div className="form-row">
                <label>Email</label>
                <input
                  type="email"
                  value={patientData.email}
                  onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                />
              </div>
              <div className="form-row">
                <label>Referred Doctor</label>
                <input
                  type="text"
                  value={patientData.referredDoctor}
                  onChange={(e) =>
                    setPatientData({ ...patientData, referredDoctor: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-container23">
          <div className="card23">
            <div className="input-group">
            <input
          type="text"
          placeholder="Medicine Name"
          value={currentSale.medicineName}
          onChange={(e) =>
            setCurrentSale({ ...currentSale, medicineName: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <select
          value={currentSale.batch}
          onChange={(e) =>
            setCurrentSale({ ...currentSale, batch: e.target.value })
          }
        >
          <option>Select Batch</option>
          <option>PHM132</option>
          <option>PHM767</option>
          <option>PHM908</option>
          <option>PHM543</option>
        </select>
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Price"
          value={currentSale.price}
          onChange={(e) =>
            setCurrentSale({ ...currentSale, price: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Quantity"
          value={currentSale.quantity}
          onChange={(e) =>
            setCurrentSale({ ...currentSale, quantity: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Total"
          value={currentSale.total}
          onChange={(e) =>
            setCurrentSale({ ...currentSale, total: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Discount"
          value={currentSale.discount}
          onChange={(e) =>
            setCurrentSale({ ...currentSale, discount: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Amount"
          value={currentSale.amount}
          onChange={(e) =>
            setCurrentSale({ ...currentSale, amount: e.target.value })
          }
        />
      </div>
            <button className="button43" onClick={handleAddClick}>
              Add
            </button>
          </div>
          <table className='sales-table23'>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Batch</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Discount</th>
              <th>Amount</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td>
                {editingIndex === index ? (
                  <input style={{width:"80%"}}
                    type="text"
                    value={editedSale.medicineName}
                    onChange={(e) =>
                      handleEditChange('medicineName', e.target.value)
                    }
                  />
                ) : (
                  sale.medicineName
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input style={{width:"80%"}}
                    type="text"
                    value={editedSale.batch}
                    onChange={(e) =>
                      handleEditChange('batch', e.target.value)
                    }
                  />
                ) : (
                  sale.batch
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input style={{width:"80%"}}
                    type="text"
                    value={editedSale.price}
                    onChange={(e) =>
                      handleEditChange('price', e.target.value)
                    }
                  />
                ) : (
                  sale.price
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    style={{width:"80%"}}
                    value={editedSale.quantity}
                    onChange={(e) =>
                      handleEditChange('quantity', e.target.value)
                    }
                  />
                ) : (
                  sale.quantity
                )}
              </td>
              <td>{sale.total}</td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    style={{width:"80%"}}
                    value={editedSale.discount}
                    onChange={(e) =>
                      handleEditChange('discount', e.target.value)
                    }
                  />
                ) : (
                  sale.discount
                )}
              </td>
              <td>{sale.amount}</td>
              <td>
                {editingIndex === index ? (
                  <button onClick={() => handleUpdateClick(index)}>
                    Update
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(index)}>Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteClick(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>
      </div>
      <div className="side-panel">
        <div className="input-group">
          <label for="gst">GST</label>
          <input
            type="text"
            id="gst"
            value={patientData.gst}
            onChange={(e) => setPatientData({ ...patientData, gst: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label for="netAmount">Net</label>
          <input
            type="text"
            id="netAmount"
            value={patientData.netAmount}
            onChange={(e) => setPatientData({ ...patientData, netAmount: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label for="roundOff">Round Off</label>
          <input
            type="text"
            id="roundOff"
            value={patientData.roundOff}
            onChange={(e) => setPatientData({ ...patientData, roundOff: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label for="billAmount">Bill Amount</label>
          <input
            type="text"
            id="billAmount"
            value={patientData.billAmount}
            onChange={(e) => setPatientData({ ...patientData, billAmount: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label for="paidAmount">Paid Amount</label>
          <input
            type="text"
            id="paidAmount"
            value={patientData.paidAmount}
            onChange={(e) => setPatientData({ ...patientData, paidAmount: e.target.value })}
          />
        </div>
        <select
          value={patientData.selectedPaymentMethod}
          onChange={(e) => setPatientData({ ...patientData, selectedPaymentMethod: e.target.value })}
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="others">Others</option>
        </select>
        <div className="input-group">
          <label for="reference">Reference</label>
          <input
            type="text"
            id="reference"
            value={patientData.reference}
            onChange={(e) => setPatientData({ ...patientData, reference: e.target.value })}
          />
        </div>
        <div className="side-panel-button">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleSaveAndPrintClick}>Save & Print</button>
        </div>
      </div>
      </div>
    );
}

export default PharmacyBilling;