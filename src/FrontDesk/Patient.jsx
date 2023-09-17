import React, { useState, useEffect } from "react";
import "./patient.css";
import { FcMoneyTransfer } from "react-icons/fc";
import { Link } from "react-router-dom";
import Navbar1 from "./Navbar1";

const Patient = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    
    fetch("http://localhost:5000/getCombinedData")
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <Navbar1/>
      <table style={{ marginTop: "13vh" }}>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>
                &nbsp;&nbsp; <FcMoneyTransfer />
                &nbsp;&nbsp;{patient.price}
              </td>
              <td>
                <select onChange={(e) => (window.location.href = e.target.value)}>
                  <option value="/Patient">select</option>
                  <option value="/Vitals">Vitals</option>
                  <option value="/TestResults">Test Results</option>
                  <option value="/PrescriptionDesk">Prescription</option>
                  <option value="/Attachment">Attachments</option>
                </select>
              </td>
              <td>{patient.hour}</td>
            
              <td>{patient.doctor}</td>
              <td>{patient.type}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patient;