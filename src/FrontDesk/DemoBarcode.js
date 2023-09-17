import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function DemoBarcode() {
  const [value, setValue] = useState('');

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter value for barcode"
        onChange={(e) => setValue(e.target.value)}
      />
      <br />
      <QRCode
        value={value}
        size={256}
        bgColor="#ffffff"
        fgcolor="#000000"
      />
    </div>
  );
}

export default DemoBarcode;