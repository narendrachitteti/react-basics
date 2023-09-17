import React, { useState } from "react";
import { FcSurvey } from "react-icons/fc";
import { BiSolidUserRectangle } from "react-icons/bi";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { LuCreditCard } from "react-icons/lu";
import { BiSolidUser } from "react-icons/bi";
import { CgDropOpacity } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import "./PatientNav.css";
import axios from 'axios';
import Barcode from 'react-barcode';

function PatientNav({  handleBarcodeScan, selectedPatient }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [patients, setPatients] = useState([]);
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getPatients');
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="popup-overlay-Tj">
        <div className={`popup-content_95 ${isModalOpen ? "center-content" : ""}`}>
          <div className="patient-right">
            <nav>
              <ul>
                <li>
                  <Link to="/PatientBilling">
                    <FcSurvey /> Add Bills
                  </Link>
                </li>
                <li>
                  <a href="/Appnt">
                    <BiSolidUserRectangle /> Appointment
                  </a>
                </li>
                <li>
                  <a href="/Billingforms">
                    <AiOutlineBars /> Bills
                  </a>
                </li>
                <li>
                  <a href="/PaidTable">
                    <LuCreditCard /> paid
                  </a>
                </li>
                <li>
                  <a href="/VisitsTable">
                    <BiSolidUser /> visits
                  </a>
                </li>
                <li>
                  <a href="/LabTable">
                    <CgDropOpacity /> Lab
                  </a>
                </li>
                <li>
                  <a href="/LabEdit">
                    <MdEdit /> Edit
                  </a>
                </li>
                {/* <li>
                  <button
                    className="close-popup-button-Tj"
                    onClick={closeModal}
                  >
                    <AiOutlineClose />
                  </button>
                </li> */}
              </ul>
            </nav>

            
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientNav;
