
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPrinter } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import axios from "axios";
import Barcode from "react-barcode";
import './patientDetails.css';
 import './PatientBilling.css';

function generateUniqueId() {
  return Math.floor(100000 + Math.random() * 900000);
}

const DandB = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDiscount, setServiceDiscount] = useState("");
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("AM");
  const [inputError, setInputError] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("cash");
  const [emails, setEmails] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [servicePrices, setServicePrices] = useState([]);
  const [serviceDiscounts, setServiceDiscounts] = useState([]);
  const [items, setItems] = useState([]); 
  const isInputValid = serviceType && servicePrice && serviceDiscount;

  const handleTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  const handlepriceChange = (event) => {
    setServicePrice(event.target.value);
  };

  const handlediscountChange = (event) => {
    setServiceDiscount(event.target.value);
  };

  const handleAddClick = () => {
    if (isInputValid) {
      setInputError(false);
      const newItem = {
        type: serviceType,
        price: parseFloat(servicePrice),
        discount: parseFloat(serviceDiscount),
      };
    
      setServiceTypes([...serviceTypes, serviceType]);
      setServicePrices([...servicePrices, parseFloat(servicePrice)]);
      setServiceDiscounts([...serviceDiscounts, parseFloat(serviceDiscount)]);
      
      setAddedItems([...addedItems, newItem]);
  
      setServiceType("");
      setServicePrice("");
      setServiceDiscount("");
      setShowAdditionalForm(true);
    } else {
      setInputError(true);
    }
  };

const handleCreateBill = async (e) => {
  e.preventDefault();

  const formattedServices = addedItems.map((item) => ({
    type: item.type,
    price: item.price,
    discount: item.discount,
  }));

  const dataToSend = {
    name,
    gender,
    age: parseInt(age),
    mobile: parseInt(mobile),
    bloodGroup,
    emails,
    address,
    city,
    area,
    referredBy,
    services: formattedServices,
    doctor: selectedDoctor,
    date: appointmentDate,
    duration: selectedDuration,
    hour: selectedHour,
    minute: selectedMinute,
    timeOfDay: selectedTimeOfDay,
    totalAmount,
    paymentMode: selectedPaymentMode,
    email,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/addDandB",
      dataToSend
    );

    if (response.status === 201) {
      window.alert("Data posted successfully!");
    } else {
      window.alert("Data posting failed");
    }
  } catch (error) {
    console.error("Error submitting billing data:", error);
  }
};
  

  const handleDeleteClick = (index) => {
    const updatedItems = addedItems.filter((_, i) => i !== index);
    setAddedItems(updatedItems);
  };

  const handleContinueClick = () => {
    const total = addedItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price);
      const itemdiscount = parseFloat(item.discount);
      const discountedAmount = itemPrice * ((100 - itemdiscount) / 100);
      return acc + discountedAmount;
    }, 0);

    setTotalAmount(total);
    setShowAdditionalForm(false);
  };

  const handleBarcodeScan = (barcodeValue) => {
    const patient = patients.find((patient) => patient.id === barcodeValue);
    if (patient) {
      setSelectedPatient(patient);
    }
  };

  const handleBackClick = () => {
    setShowAdditionalForm(false);
  };
  const handlePrintClick = () => {
    window.print();
  };
  const isAdditionalFormValid =
    selectedDoctor &&
    appointmentDate &&
    selectedDuration &&
    selectedHour &&
    selectedMinute;
  return (
    <>
      <div className="form-container12">
        <h1>Hospital Reception System</h1>
        <form>
          <label>Name:</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <label>Mobile:</label>
          <input
            type="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <label htmlFor="BlooGroup">Blood Group:</label>
          <select
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
          <label>Email:</label>
          <input
            type="text"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            required
          />
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <label>Area:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
          <label>ReferredBy:</label>
          <input
            type="text"
            value={referredBy}
            onChange={(e) => setReferredBy(e.target.value)}
            required
          />
        </form>

        <div className="patient-list">
          <ul>
            {patients.map((patient) => (
              <li key={patient._id}>
                <div className="patient-details">
                  <strong className="barcode-tnx-rty">ID:</strong> {patient.id}
                  <br />
                  <strong>Name:</strong> {patient.name}
                  <br />
                  <strong>Gender:</strong> {patient.gender}
                  <br />
                  <strong>Age:</strong> {patient.age}
                  <br />
                  <strong>Mobile:</strong> {patient.mobile}
                  <br />
                </div>

                <Barcode
                  value={patient.id}
                  onScan={() => handleBarcodeScan(patient.id)}
                />
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
                  <td>Age:</td>
                  <td>{selectedPatient.age}</td>
                </tr>
                <tr>
                  <td>Gender:</td>
                  <td>{selectedPatient.gender}</td>
                </tr>
                <tr>
                  <td>Mobile:</td>
                  <td>{selectedPatient.mobile}</td>
                </tr>
                <tr>
                  <td>existingId:</td>
                  <td>{selectedPatient.existingId}</td>
                </tr>
                <tr>
                  <td>Blood Group:</td>
                  <td>{selectedPatient.bloodGroup}</td>
                </tr>
                <tr>
                  <td>email:</td>
                  <td>{selectedPatient.email}</td>
                </tr>
                <tr>
                  <td>Adress:</td>
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
                <tr>
                  <td>Channel:</td>
                  <td>{selectedPatient.channel}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="dashboard-container12">
        <div className="input-table-container12">
          <table className="input-table12">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Unit Price</th>
                <th>discount (%)</th>
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
                      <AiOutlineDelete size={"20px"} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <select
                    className="input-field12"
                    value={serviceType}
                    onChange={handleTypeChange}
                  >
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
                    value={servicePrice}
                    onChange={handlepriceChange}
                    required
                  />
                </td>
                <td>
                  <input
                    className="input-field12"
                    type="number"
                    value={serviceDiscount}
                    onChange={handlediscountChange}
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
          {inputError && (
            <p className="error-message">Please enter required fields.</p>
          )}
        </div>
        {showAdditionalForm && !showBill && (
          <div className="additional-form-border additional-form">
            <div className="input-group">
              <label className="label-with-border12" htmlFor="doctor">
                Choose Doctor:
              </label>
              <select
                className="input-field"
                id="doctor"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option>Select doctor</option>
                <option value="doctor1">Doctor 1</option>
                <option value="doctor2">Doctor 2</option>
                <option value="doctor3">Doctor 3</option>
              </select>
            </div>
            <div className="input-group">
              <label className="label-with-border12" htmlFor="appointmentDate">
                Appointment Date:
              </label>
              <input
                className="input-field"
                type="date"
                id="appointmentDate"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label className="label-with-border12" htmlFor="duration">
                Duration:
              </label>
              <select
                className="input-field"
                id="duration"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                <option>Select duration</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>
            <div className="input-group">
              <label className="label-with-border12" htmlFor="appointmentTime">
                Appointment Time:
              </label>
              <div className="time-inputs">
                <select
                  className="time-dropdown"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                >
                  <option value="">Hour</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <select
                  className="time-dropdown"
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(e.target.value)}
                >
                  <option value="">Minute</option>
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
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
              <button
                onClick={handleContinueClick}
                disabled={!isAdditionalFormValid}
              >
                Continue{" "}
              </button>
            </div>
            {inputError && (
              <p className="error-message">Please enter all fields.</p>
            )}
          </div>
        )}
        {!showAdditionalForm && addedItems.length > 0 && !showBill && (
          <div className="total-section">
            <label className="label-with-border12">Consultations</label>
            <span className="total-value">
              &nbsp;&nbsp;₹{totalAmount.toFixed(2)}
            </span>
            <br />
            <hr />
            <label className="label-with-border12">Total:</label>
            <span className="total-value">
              &nbsp;&nbsp;&nbsp;&nbsp;₹{totalAmount.toFixed(2)}
            </span>
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="create-bill-button"
              onClick={() => setShowBill(true)}
            >
              Create Bill
            </button>
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <select
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
              &nbsp;&nbsp;&nbsp;
              <button className="pay-button" onClick={handleCreateBill}>
                Pay ₹{totalAmount.toFixed(2)}
              </button>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;
              <button className="print-bill-button" onClick={handlePrintClick}>
                <BsPrinter size={"20px"} />
                &nbsp;Print Bill
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
              <span
                className="email-icon"
                style={{ color: "blue", fontSize: "20px" }}
              >
                <TfiEmail/>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default DandB;
