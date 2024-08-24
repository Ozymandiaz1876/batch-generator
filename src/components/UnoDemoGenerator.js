import React, { useState } from 'react';
import { generateSampleData } from '../lib/dataGenerator';
import * as XLSX from 'xlsx';


const UnoDemoGenerator = () => {
  const [spoCode, setSpoCode] = useState('AFLDEMUSFB01HDFC01ICI01AXIS01');
  const [numberOfRecords, setNumberOfRecords] = useState(10);
  const [numberOfFiles, setNumberOfFiles] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const spoCodes = ['AFLDEMUSFB01HDFC01ICI01AXIS01', 'SPCODE2', 'SPCODE3']; // Add all relevant SPO codes

  const generateAndDownload = async () => {
    setIsGenerating(true);
    
    for (let i = 0; i < numberOfFiles; i++) {
      const sampleData = generateSampleData(spoCode, numberOfRecords);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(sampleData);
      XLSX.utils.book_append_sheet(wb, ws, "Sample Data");
      
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      const fileName = `sampleData-${spoCode}-${numberOfRecords}-${i+1}.xlsx`;
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="uno-demo-generator">
      <h2>Uno SaaS Demo Test Case Generator</h2>
      
      <div className="input-group">
        <label htmlFor="spoCode">SPO Code</label>
        <select
          id="spoCode"
          value={spoCode}
          onChange={(e) => setSpoCode(e.target.value)}
          className="dropdown-trigger"
        >
          {spoCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
      
      <div className="input-group">
        <label>Number of Records</label>
        <input
          type="number"
          value={numberOfRecords}
          onChange={(e) => setNumberOfRecords(parseInt(e.target.value))}
          min="1"
        />
      </div>
      
      <div className="input-group">
        <label>Number of Files</label>
        <div className="button-group">
          {[1, 5, 10].map((num) => (
            <button
              key={num}
              onClick={() => setNumberOfFiles(num)}
              className={numberOfFiles === num ? 'active' : ''}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      
      <button onClick={generateAndDownload} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Files'}
      </button>
    </div>
  );
};

export default UnoDemoGenerator;