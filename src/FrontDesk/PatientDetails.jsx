
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PatientBilling from './PatientBilling';
import Barcode from 'react-barcode';
import './patientDetails.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPrinter } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';

function generateUniqueId() {
  return Math.floor(100000 + Math.random() * 900000);
}

function PatientDetails() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [addedItems, setAddedItems] = useState([]);
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
  const [totalAmount, setTotalAmount] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('cash');
  const [billingData, setBillingData] = useState({
    items: [],
    selectedDoctor: '',
    appointmentDate: '',
    selectedDuration: '',
    selectedHour: '',
    selectedMinute: '',
    selectedTimeOfDay: 'AM',
    selectedPaymentMode: 'cash',
    email: '',
  });

  const updateBillingData = (newBillingData) => {
    setBillingData(newBillingData);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = generateUniqueId();

    const combinedData = {
      id,
      name,
      gender,
      age,
      mobile,
      bloodGroup,
      email,
      address,
      city,
      area,
      referredBy,
      items: addedItems,
      doctor: selectedDoctor,
      date: appointmentDate,
      duration: selectedDuration,
      hour: selectedHour,
      minute: selectedMinute,
      timeOfDay: selectedTimeOfDay,
      totalAmount: totalAmount,
      paymentMode: selectedPaymentMode,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/v1/combined-data', combinedData);
      console.log(response.data);

      window.alert('Patient added successfully');
      navigate('/PatientNav', { state: { patientId: id } });
      fetchPatients();
      if (response.status === 201) {
        console.log('Patient added:', response.data);
      } else {
        console.error('Failed to add patient');
      }
    } catch (error) {
      console.error(error);
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

  const handleBackClick = () => {
    setShowAdditionalForm(false);
  };
  const handlePrintClick = () => {
    window.print();
  };
  const isAdditionalFormValid =
    selectedDoctor && appointmentDate && selectedDuration && selectedHour && selectedMinute;

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/combined-data');
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBarcodeScan = (barcodeValue) => {
    const patient = patients.find((patient) => patient.id === barcodeValue);
    if (patient) {
      setSelectedPatient(patient);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="form-container12">
      <h1 className="title12">Hospital Reception System</h1>
      <form onSubmit={handleSubmit}>
        {selectedPatient && (
          <PatientBilling billingData={billingData} setBillingData={setBillingData} />
        )}
        <label className='label12'>Name:</label>
        <input className='input12' type="name" value={name} onChange={(e) => setName(e.target.value)} required />
        <label className='label12'>Gender:</label>
        <select className='select12' value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
        <label className='label12'>Age:</label>
        <input className='input12'type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        <label className='label12'>Mobile:</label>
        <input className='input12' type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        <label htmlFor="BlooGroup" className='label12'>Blood Group:</label>
        <select
        className='select12'
          id="Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <label className='label12'>Email:</label>
        <input className='input12' type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className='label12'>Address:</label>
        <input className='input12' type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <label className='label12'>City:</label>
        <input className='input12' type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        <label className='label12'>Area:</label>
        <input className='input12' type="text" value={area} onChange={(e) => setArea(e.target.value)} required />
        <label className='label12'>ReferredBy:</label>

        <input 
        className='input12'
          type="text"
          value={referredBy}
          onChange={(e) => setReferredBy(e.target.value)}
          required
        />
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
                <select className='select12' value={selectedType} onChange={handleTypeChange}>
                  <option value="type">Select service</option>
                  <option value="consultation">Consultation</option>
                  <option value="surgery">Surgery</option>
                  <option value="operation">Operation</option>
                </select>
              </td>
              <td>
                <input
                  className="input23"
                  type="number"
                  value={unitPrice}
                  onChange={handleUnitPriceChange}
                  required
                />
              </td>
              <td>
                <input
                  className="input23"
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
              <option value="Dr.John">Dr.John</option>
              <option value="Dr.Sameer">Dr.Sameer</option>
              <option value="Dr.Arjun">Dr.Arjun</option>
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
          &nbsp;&nbsp;&nbsp;<button className="pay-button">
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
    </div>

        <button type="submit">Submit</button>
      </form>

      <div className="patient-list">
        <h2>Patient List</h2>
        <ul>
          {patients.map((patient) => (
            <li key={patient._id}>
              <div className="patient-details">
                <strong className="barcode-tnx-rty">ID:</strong> {patient.id}<br />
                <strong>Name:</strong> {patient.name}<br />
                <strong>Gender:</strong> {patient.gender}<br />
                <strong>Age:</strong> {patient.age}<br />
                <strong>Mobile:</strong> {patient.mobile}<br />
              </div>

              <Barcode value={patient.id} onScan={() => handleBarcodeScan(patient.id)} />
            </li>
          ))}
        </ul>
      </div>

      {selectedPatient && (
        <div className="selected-patient-form">
          <h2>Selected Patients</h2>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{selectedPatient.name}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{selectedPatient.gender}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{selectedPatient.age}</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>{selectedPatient.mobile}</td>
              </tr>
              <tr>
                <td>Blood Group:</td>
                <td>{selectedPatient.bloodGroup}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{selectedPatient.email}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{selectedPatient.address}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{selectedPatient.city}</td>
              </tr>
              <tr>
                <td>Area:</td>
                <td>{selectedPatient.area}</td>
              </tr>
              <tr>
                <td>Referred By:</td>
                <td>{selectedPatient.referredBy}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PatientDetails;
