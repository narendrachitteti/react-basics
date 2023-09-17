import React, { useState } from 'react';
import Navbar from './navbar';
import imgmain from './imgmain.jpg'
export default function Homepage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

  const openModal = (type) => {
    setSelectedModal(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedModal(null);
    setShowModal(false);
  };

  return (
    <div>
            <Navbar showModal={showModal} openModal={openModal} closeModal={closeModal} />
            
    <img src={imgmain} style={{ width: '100%', height: '600px' }} /></div>
  )
}
  