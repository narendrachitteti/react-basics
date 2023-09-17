
// import React, { useState } from "react";
// import "./navbar.css";
// import {
//   FaUserPlus,
//   FaUserCircle,
//   FaTrophy,
//   FaMoneyCheck,
// } from "react-icons/fa";
// import { LiaPhoneSquareSolid } from "react-icons/lia";
// import { FiSearch } from "react-icons/fi";
// import { FcAssistant } from "react-icons/fc";
// import {
//   MdOutlineLocalHospital,
//   MdCalendarMonth,
//   MdViewList,
// } from "react-icons/md";
// import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div>
//       <nav className="navbar">
//         <BsList
//           size={30}
//           onClick={toggleMobileMenu}
//           className="mobile-icon"
//         />
//         <ul
//           className={`nav-list ${
//             isMobileMenuOpen ? "mobile-open" : "mobile-closed"
//           }`}
//         >
//           <li>
//             <MdOutlineLocalHospital />
//             Health<span>Care</span>
//           </li>&nbsp;&nbsp;
//           &nbsp;&nbsp;&nbsp;
//           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <li>
//             <a href="#">
//               <FaMoneyCheck />
//               All Bills
//             </a>
//           </li>&nbsp;&nbsp;
//           &nbsp;&nbsp;&nbsp;
//           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//           <li>
//             <a href="#">
//               <MdViewList />
//               Add Services
//             </a>
//           </li>&nbsp;&nbsp;
//           &nbsp;&nbsp;
//           &nbsp;&nbsp;&nbsp;&nbsp;
//           <li>
//             <a href="#">
//               <MdCalendarMonth />
//               Patients Q
//             </a>
//           </li>&nbsp;&nbsp;
//           &nbsp;&nbsp;&nbsp;
//           <li>
//             <a href="#">
//               <LiaPhoneSquareSolid />
//               Online Consultation
//             </a>
//           </li>&nbsp;&nbsp;
//           &nbsp;&nbsp;&nbsp;&nbsp;
//           <li>
//             <a href="#">
//               <FaUserPlus />
//             </a>
//           </li>&nbsp;&nbsp;
//           &nbsp;&nbsp;&nbsp;&nbsp;
//           <li>
//             <a href="#">
//               <input type="text" />
//               <FiSearch />
//             </a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;
//           <li>
//             <a href="#">
//               <FcAssistant />
//             </a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;
//           <li>
//             <a href="#">
//               <BsFillGrid3X3GapFill />
//             </a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;
//           <li>
//             <a href="#">
//               <FaTrophy />
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <FaUserCircle />
//             </a>
//           </li>&nbsp;&nbsp;&nbsp;&nbsp;
//           <li>
//               <BsList size={"25px"} />
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;

// Navbar.js
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
