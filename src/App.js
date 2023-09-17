// import './App.css';
// import{BrowserRouter as Router, Routes,Route}from 'react-router-dom';
// import PatientDetails from './FrontDesk/PatientDetails';
// import PatientNav from './FrontDesk/PatientNav';
// import PatientBilling from './FrontDesk/PatientBilling';
// import Homepage from './FrontDesk/Homepage';
// import Navbar1 from './FrontDesk/Navbar1';
// import Patient from './FrontDesk/Patient';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<Homepage/>}/>
//           <Route path="/Navbar"element={(<Navbar1/>)}/>
//           <Route path="/Patient" element={(<Patient/>)}/>
//           <Route path="PatientNav" element={<PatientNav/>}/>
//           <Route path="PatientBilling" element={<PatientBilling/>}/>
//          </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React from 'react'
import Bills from './FrontDesk/Bills'
import PharmacyBilling from './FrontDesk/PharmacyBilling'
import Vitals from './FrontDesk/Vitals'

export default function App() {
  return (
    <div>
      <Vitals/>
    </div>
  )
}
