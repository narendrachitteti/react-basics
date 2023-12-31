import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { AiFillPrinter } from 'react-icons/ai';
import './Bills.css';

const Bills = () => {
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    // Fetch billing data from the server
    fetch('http://localhost:5001/api/billing')
      .then((response) => response.json())
      .then((data) => setCurrentData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {

    fetch(`http://localhost:5001/api/billing/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === 'Record deleted successfully') {

            setCurrentData((prevData) => prevData.filter((item) => item._id !== id));
        } else {
          console.error('Failed to delete record');
        }
      })
      .catch((error) => console.error('Error deleting record:', error));
  };

  return (
    <div>
      <div className="popup-overlay-11-pp">
        <div className="popup-11-pp">
          <div className="popup-11-pp">
            <h1 className="heading-11-pp">Total Due: 89574</h1> 
            <table className="popup-table-11-pp">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Bill</th>
                  <th>Department</th>
                  <th>Paid</th>
                  <th>Billed</th>
                  <th>Discount</th>
                  <th>Due</th>
                  <th>Refund</th>
                  <th>Service</th>
                  <th>Price</th>
                  <th>GST</th>
                  <th>Discount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.bill}</td>
                    <td>{item.department}</td>
                    <td>{item.paid}</td>
                    <td>
                      <AiFillPrinter />
                      {item.printerValue}
                    </td>
                    <td>{item.discountper}</td>
                    <td>{item.due}</td>
                    <td>{item.refund}</td>
                    <td className="table-bck-11">{item.service}</td>
                    <td className="table-bck-11">{item.price}</td>
                    <td className="table-bck-11">{item.gst}</td>
                    <td className="table-bck-11">{item.discount}</td>
                    <td
                      className="table-bck-11"
                      style={{ color: item.deleteColor, cursor: 'pointer' }}
                      onClick={() => handleDelete(item._id)} // Use the actual ID from your MongoDB
                    >
                      <MdDelete />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;