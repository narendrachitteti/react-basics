// navBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { BiCalendar } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdCalendarMonth } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CgMenuGridO } from "react-icons/cg";
import { AiFillCaretDown } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";

const Navbar1 = () => {
  return (
    <>
      <div className="navbar-doctor">
        <div className="left">
          <div className="logo">
          <Link to="/Bills" className="doc-link-nav">
              {" "}
            <small>JC</small>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/Bills" className="doc-link-nav">
              {" "}
              <span className="icon-docks">
              <FaMoneyCheck />
              </span>
              All Bills
            </Link>
          </div>
          <div className="nav-item">
          <Link to="/Patient" className="doc-link-nav">
              {" "}
            <span className="icon-docks">
            <MdCalendarMonth />
            </span>
              patients Q
            </Link>
          </div>
          {/* <div className="nav-item">
          <Link to="/labservicetable" className="doc-link-nav">
              {" "}
            <span className="icon-docks">
              <BsFillPeopleFill />
            </span>
            Services
            </Link>
          </div> */}
          {/* <div className="nav-item dropdown">
            <span className="icon-docks">
              <AiFillCaretDown />
            </span>
            Options
          </div> */}
          {/* <div className="nav-item">
            <span className="icon-docks">
              <MdCall />
            </span>
            Online Consultation
          </div> */}
        </div>
        <div className="right">
        <Link to="/Addpatient" className="doc-link-nav">
              {" "}
          <span className="icon-add">
            <MdPersonAddAlt1 />
          </span>
          </Link>
          <input type="text" placeholder="Search" className="search-bar-doc" />
          {/* <span className="icon">Doctors Icon</span> */}
          {/* <div className="dots-box">
            <div className="dots-icon">
              <CgMenuGridO />
            </div>
            <div className="dots-content">Dots content</div>
          </div> */}
          <span className="icon-profile">
            <CgProfile />
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar1;
