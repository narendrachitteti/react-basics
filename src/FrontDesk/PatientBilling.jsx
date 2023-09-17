// import React, { useState, useEffect } from 'react';
// import './PatientBilling.css';
// import { useLocation } from 'react-router-dom';
// import { AiOutlineDelete } from 'react-icons/ai';
// import { BsPrinter } from 'react-icons/bs';
// import { TfiEmail } from 'react-icons/tfi';
// import axios from 'axios';

// function PatientBilling({selectedPatient}) {
//   const [selectedType, setSelectedType] = useState('');
//   const [unitPrice, setUnitPrice] = useState('');
//   const [discount, setDiscount] = useState('');
//   const [showAdditionalForm, setShowAdditionalForm] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [appointmentDate, setAppointmentDate] = useState('');
//   const [selectedDuration, setSelectedDuration] = useState('');
//   const [selectedHour, setSelectedHour] = useState('');
//   const [selectedMinute, setSelectedMinute] = useState('');
//   const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('AM');
//   const [inputError, setInputError] = useState(false);
//   const [addedItems, setAddedItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [showBill, setShowBill] = useState(false);
//   const [selectedPaymentMode, setSelectedPaymentMode] = useState('cash');
//   const [email, setEmail] = useState('');

//   const isInputValid = selectedType && unitPrice && discount;

//   const handleTypeChange = (event) => {
//     setSelectedType(event.target.value);
//   };

//   const handleUnitPriceChange = (event) => {
//     setUnitPrice(event.target.value);
//   };

//   const handleDiscountChange = (event) => {
//     setDiscount(event.target.value);
//   };

//   const handleAddClick = () => {
//     if (isInputValid) {
//       setInputError(false);
//       const newItem = {
//         type: selectedType,
//         price: unitPrice,
//         discount: discount,
//       };
//       setAddedItems([...addedItems, newItem]);
//       setUnitPrice('');
//       setDiscount('');
//       setSelectedType('');
//       setShowAdditionalForm(true);
//     } else {
//       setInputError(true);
//     }
//   };
//   const location = useLocation();
// const patientId = location.state?.patientId;

// const handleCreateBill = async () => {
//   try {
//     const response = await axios.post('http://localhost:5000/addCombinedData', {
//       items: addedItems,
//      doctor: selectedDoctor,
//       date: appointmentDate,
//       duration: selectedDuration,
//       hour: selectedHour,
//       minute: selectedMinute,
//       timeOfDay: selectedTimeOfDay,
//       totalAmount: totalAmount,
//       paymentMode: selectedPaymentMode,
//       email: email,
// });

//     if (response.status === 200) {
//       window.alert('Data posted successfully!');
//     } else {
//       window.alert('Data posted successfully');
//     }
//   } catch (error) {
//     console.error('Error submitting billing data:', error);
//   }
// };

//   const handleDeleteClick = (index) => {
//     const updatedItems = addedItems.filter((_, i) => i !== index);
//     setAddedItems(updatedItems);
//   };

//   const handleContinueClick = () => {
//     const total = addedItems.reduce((acc, item) => {
//       const itemPrice = parseFloat(item.price);
//       const itemDiscount = parseFloat(item.discount);
//       const discountedAmount = itemPrice * ((100 - itemDiscount) / 100);
//       return acc + discountedAmount;
//     }, 0);

//     setTotalAmount(total);
//     setShowAdditionalForm(false);
//   };

//   const handleBackClick = () => {
//     setShowAdditionalForm(false);
//   };
//   const handlePrintClick = () => {
//     window.print();
//   };
//   const isAdditionalFormValid =
//     selectedDoctor && appointmentDate && selectedDuration && selectedHour && selectedMinute;

//   return (
//     <>
  
//     <div className="dashboard-container12">
//       <div className="input-table-container12">
//         <table className="input-table12">
//           <thead>
//             <tr>
//               <th>Service Name</th>
//               <th>Unit Price</th>
//               <th>Discount (%)</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {addedItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.type}</td>
//                 <td>₹{item.price}</td>
//                 <td>{item.discount}%</td>
//                 <td>
//                   <button onClick={() => handleDeleteClick(index)}>
//                     <AiOutlineDelete size={'20px'}/>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             <tr>
//               <td>
//                 <select className="input-field12" value={selectedType} onChange={handleTypeChange}>
//                   <option value="type">Select service</option>
//                   <option value="consultation">Consultation</option>
//                   <option value="First Consultation">First Consultation</option>
//                   <option value="followup Consultation">Followup Consultation</option>
//                   <option value="free FollowUp">Free FollowUp</option>
//                   <option value="lazer">Lazer</option>
//                 </select>
//               </td>
//               <td>
//                 <input
//                   className="input-field12"
//                   type="number"
//                   value={unitPrice}
//                   onChange={handleUnitPriceChange}
//                   required
//                 />
//               </td>
//               <td>
//                 <input
//                   className="input-field12"
//                   type="number"
//                   value={discount}
//                   onChange={handleDiscountChange}
//                   required
//                 />
//               </td>
//               <td>
//                 <button onClick={handleAddClick} className="add-button12">
//                   Add
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         {inputError && <p className="error-message">Please enter required fields.</p>}
//       </div>
//       {showAdditionalForm && !showBill && (
//         <div className="additional-form-border additional-form">
//           <div className="input-group">
//             <label className="label-with-border12" htmlFor="doctor">Choose Doctor:</label>
//             <select className="input-field" id="doctor" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
//               <option>Select doctor</option>
//               <option value="doctor1">Doctor 1</option>
//               <option value="doctor2">Doctor 2</option>
//               <option value="doctor3">Doctor 3</option>
//             </select>
//           </div>
//           <div className="input-group">
//             <label className="label-with-border12" htmlFor="appointmentDate">Appointment Date:</label>
//             <input className="input-field" type="date" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
//           </div>
//           <div className="input-group">
//             <label className="label-with-border12" htmlFor="duration">Duration:</label>
//             <select className="input-field" id="duration" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
//               <option>Select duration</option>
//               <option value="15">15 minutes</option>
//               <option value="30">30 minutes</option>
//               <option value="45">45 minutes</option>
//               <option value="60">1 hour</option>
//             </select>
//           </div>
//           <div className="input-group">
//             <label className="label-with-border12" htmlFor="appointmentTime">Appointment Time:</label>
//             <div className="time-inputs">
//               <select className="time-dropdown" value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
//                 <option value="">Hour</option>
//                 {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
//                   <option key={hour} value={hour}>{hour}</option>
//                 ))}
//               </select>
//               <select className="time-dropdown" value={selectedMinute} onChange={(e) => setSelectedMinute(e.target.value)}>
//                 <option value="">Minute</option>
//                 {Array.from({ length: 60 }, (_, i) => i).map(minute => (
//                   <option key={minute} value={minute}>{minute}</option>
//                 ))}
//               </select>
//               <select
//               className="time-dropdown"
//               value={selectedTimeOfDay}
//               onChange={(e) => setSelectedTimeOfDay(e.target.value)}
//             >
//               <option value="AM">AM</option>
//               <option value="PM">PM</option>
//             </select>
//             </div>
//           </div>
          
//           <div className="button-group">
//             <button onClick={handleBackClick} className="back-button">
//               Back
//             </button>
//             <button onClick={handleContinueClick} disabled={!isAdditionalFormValid}>
//               Continue            </button>
//           </div>
//           {inputError && <p className="error-message">Please enter all fields.</p>}
//         </div>
//       )}
//       {!showAdditionalForm && addedItems.length > 0 && !showBill &&(
//         <div className="total-section">
//           <label className="label-with-border12">Consultations</label>
//           <span className="total-value">&nbsp;&nbsp;₹{totalAmount.toFixed(2)}</span><br/><hr/>
//           <label className="label-with-border12">Total:</label>
//           <span className="total-value">&nbsp;&nbsp;&nbsp;&nbsp;₹{totalAmount.toFixed(2)}</span><br/><br/>
//           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  className="create-bill-button"
//             onClick={() => setShowBill(true)}>Create Bill</button>
//         </div>
//       )}
//       {showBill && (
//         <div className="total-section">
//           <label className="label-with-border12">Consultations:</label>
//           <span className="total-value">₹{totalAmount.toFixed(2)}</span>
//           <hr />
//           <label className="label-with-border12">Total Balance:</label>
//           <span className="total-value">₹{totalAmount.toFixed(2)}</span>
//           <div className="input-group">
//             <label className="label-with-border12">Mode:</label>
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select
//               className="input-field"
//               value={selectedPaymentMode}
//               onChange={(e) => setSelectedPaymentMode(e.target.value)}
//             >
//               <option value="cash">Cash</option>
//               <option value="wallet">M-Wallet</option>
//               <option value="online">Online</option>
//             </select>
//           </div>
//           <div className="button-group">
//           &nbsp;&nbsp;&nbsp;<button className="pay-button"onClick={handleCreateBill}>
//               Pay ₹{totalAmount.toFixed(2)}
//             </button><br/><br/>&nbsp;&nbsp;&nbsp;
//             <button className="print-bill-button" onClick={handlePrintClick}>
//               <BsPrinter size={'20px'}/>&nbsp;Print Bill
//             </button>
//           </div>
//           <div className="input-group">
//             <input
//               className="input-field email-input"
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <span className="email-icon" style={{ color: 'blue',fontSize: '20px'}}>
//   <TfiEmail />
// </span>
//           </div>
//         </div>
//       )}
//     </div></>
//   );
// };

// export default PatientBilling;
import React, { useState, useEffect } from 'react';
import './PatientBilling.css';
import { useLocation } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPrinter } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import axios from 'axios';

function PatientBilling() {
  const [selectedType, setSelectedType] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('AM');
  const [inputError, setInputError] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('cash');
  const [email, setEmail] = useState('');

  const isInputValid = selectedType && unitPrice && discount;

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleUnitPriceChange = (event) => {
    setUnitPrice(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleAddClick = () => {
    if (isInputValid) {
      setInputError(false);
      const newItem = {
        type: selectedType,
        price: unitPrice,
        discount: discount,
      };
      
      setAddedItems([...addedItems, newItem]);
      setUnitPrice('');
      setDiscount('');
      setSelectedType('');
      setShowAdditionalForm(true);
    } else {
      setInputError(true);
    }
  };
  const location = useLocation();
const patientId = location.state?.patientId;

const handleCreateBill = async () => {
  try {
    const combinedData = {
      items: addedItems,
      doctor: selectedDoctor,
      date: appointmentDate,
      duration: selectedDuration,
      hour: selectedHour,
      minute: selectedMinute,
      timeOfDay: selectedTimeOfDay,
      totalAmount: totalAmount,
      paymentMode: selectedPaymentMode,
      email: email,
    };

    const response = await axios.post('http://localhost:5000/api/v1/combined-data', combinedData);
    
    if (response.status === 200) {
      window.alert('Data posted successfully!');
    } else {
      window.alert('Data posted successfully');
    }
  } catch (error) {
    console.error('Error submitting billing data:', error);
  }
};

  const handleDeleteClick = (index) => {
    const updatedItems = addedItems.filter((_, i) => i !== index);
    setAddedItems(updatedItems);
  };

  const handleContinueClick = () => {
    const total = addedItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price);
      const itemDiscount = parseFloat(item.discount);
      const discountedAmount = itemPrice * ((100 - itemDiscount) / 100);
      return acc + discountedAmount;
    }, 0);

    setTotalAmount(total);
    setShowAdditionalForm(false);
  };

  const handleBackClick = () => {
    setShowAdditionalForm(false);
  };
  const handlePrintClick = () => {
    window.print();
  };
  const isAdditionalFormValid =
    selectedDoctor && appointmentDate && selectedDuration && selectedHour && selectedMinute;

  return (
    <>
  
    <div className="dashboard-container12">
      <div className="input-table-container12">
        <table className="input-table12">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Unit Price</th>
              <th>Discount (%)</th>
              <th>Action</th>

              
            </tr>
          </thead>
          <tbody>
            {addedItems.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>₹{item.price}</td>
                <td>{item.discount}%</td>
                <td>
                  <button onClick={() => handleDeleteClick(index)}>
                    <AiOutlineDelete size={'20px'}/>
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <select className="input-field12" value={selectedType} onChange={handleTypeChange}>
                  <option value="type">Select service</option>
                  <option value="consultation">Consultation</option>
                  <option value="surgery">Surgery</option>
                  <option value="operation">Operation</option>
                </select>
              </td>
              <td>
                <input
                  className="input-field12"
                  type="number"
                  value={unitPrice}
                  onChange={handleUnitPriceChange}
                  required
                />
              </td>
              <td>
                <input
                  className="input-field12"
                  type="number"
                  value={discount}
                  onChange={handleDiscountChange}
                  required
                />
              </td>
              <td>
                <button onClick={handleAddClick} className="add-button12">
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {inputError && <p className="error-message">Please enter required fields.</p>}
      </div>
      {showAdditionalForm && !showBill && (
        <div className="additional-form-border additional-form">
          <div className="input-group">
            <label className="label-with-border12" htmlFor="doctor">Choose Doctor:</label>
            <select className="input-field" id="doctor" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
              <option>Select doctor</option>
              <option value="doctor1">Doctor 1</option>
              <option value="doctor2">Doctor 2</option>
              <option value="doctor3">Doctor 3</option>
            </select>
          </div>
          <div className="input-group">
            <label className="label-with-border12" htmlFor="appointmentDate">Appointment Date:</label>
            <input className="input-field" type="date" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
          </div>
          <div className="input-group">
            <label className="label-with-border12" htmlFor="duration">Duration:</label>
            <select className="input-field" id="duration" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
              <option>Select duration</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>
          <div className="input-group">
            <label className="label-with-border12" htmlFor="appointmentTime">Appointment Time:</label>
            <div className="time-inputs">
              <select className="time-dropdown" value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
                <option value="">Hour</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
              <select className="time-dropdown" value={selectedMinute} onChange={(e) => setSelectedMinute(e.target.value)}>
                <option value="">Minute</option>
                {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
              <select
              className="time-dropdown"
              value={selectedTimeOfDay}
              onChange={(e) => setSelectedTimeOfDay(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            </div>
          </div>
          
          <div className="button-group">
            <button onClick={handleBackClick} className="back-button">
              Back
            </button>
            <button onClick={handleContinueClick} disabled={!isAdditionalFormValid}>
              Continue            </button>
          </div>
          {inputError && <p className="error-message">Please enter all fields.</p>}
        </div>
      )}
      {!showAdditionalForm && addedItems.length > 0 && !showBill &&(
        <div className="total-section">
          <label className="label-with-border12">Consultations</label>
          <span className="total-value">&nbsp;&nbsp;₹{totalAmount.toFixed(2)}</span><br/><hr/>
          <label className="label-with-border12">Total:</label>
          <span className="total-value">&nbsp;&nbsp;&nbsp;&nbsp;₹{totalAmount.toFixed(2)}</span><br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  className="create-bill-button"
            onClick={() => setShowBill(true)}>Create Bill</button>
        </div>
      )}
      {showBill && (
        <div className="total-section">
          <label className="label-with-border12">Consultations:</label>
          <span className="total-value">₹{totalAmount.toFixed(2)}</span>
          <hr />
          <label className="label-with-border12">Total Balance:</label>
          <span className="total-value">₹{totalAmount.toFixed(2)}</span>
          <div className="input-group">
            <label className="label-with-border12">Mode:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select
              className="input-field"
              value={selectedPaymentMode}
              onChange={(e) => setSelectedPaymentMode(e.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="wallet">M-Wallet</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div className="button-group">
          &nbsp;&nbsp;&nbsp;<button className="pay-button"onClick={handleCreateBill}>
              Pay ₹{totalAmount.toFixed(2)}
            </button><br/><br/>&nbsp;&nbsp;&nbsp;
            <button className="print-bill-button" onClick={handlePrintClick}>
              <BsPrinter size={'20px'}/>&nbsp;Print Bill
            </button>
          </div>
          <div className="input-group">
            <input
              className="input-field email-input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="email-icon" style={{ color: 'blue',fontSize: '20px'}}>
  <TfiEmail />
</span>
          </div>
        </div>
      )}
    </div></>
  );
};

export default PatientBilling;