import React, { useState } from 'react';
import { generateSampleData } from '../lib/dataGenerator';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const UnoDemoGenerator = () => {
  const [partner, setPartner] = useState('Demo account');
  const [spoCode, setSpoCode] = useState('AFLDEM');
  const [numberOfRecords, setNumberOfRecords] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const partnerMapping = {
    'Demo account': 'AFLDEM',
    'Capri Global': 'AFLI24',
    'Prayas': 'AFLCPR',
    'Agrosperity': 'AFLCLF'
  };

  const batchRecordOptions = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000];

  const handlePartnerChange = (selectedPartner) => {
    setPartner(selectedPartner);
    setSpoCode(partnerMapping[selectedPartner]);
  };

  const generateAndDownload = async () => {
    setIsGenerating(true);
    const zip = new JSZip();
    
    for (let i = 0; i < 5; i++) {
      const sampleData = generateSampleData(spoCode, numberOfRecords);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(sampleData);
      XLSX.utils.book_append_sheet(wb, ws, "Sample Data");
      
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const fileName = `sampleData-${spoCode}-${numberOfRecords}-${i+1}.xlsx`;
      zip.file(fileName, excelBuffer);
    }
    
    zip.generateAsync({type:"blob"}).then(function(content) {
      saveAs(content, `sampleData-${spoCode}-${numberOfRecords}.zip`);
      setIsGenerating(false);
    });
  };

  return (
    <div className="uno-demo-generator">
      <h2>Uno SaaS Demo Test Case Generator</h2>
      
      <div className="input-group">
        <label htmlFor="partner">Partner</label>
        <select
          id="partner"
          value={partner}
          onChange={(e) => handlePartnerChange(e.target.value)}
          className="dropdown-trigger"
        >
          {Object.keys(partnerMapping).map((partnerName) => (
            <option key={partnerName} value={partnerName}>
              {partnerName}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="spoCode">SPO Code</label>
        <input
          id="spoCode"
          type="text"
          value={spoCode}
          readOnly
          className="dropdown-trigger"
        />
      </div>
      
      <div className="input-group">
        <label>Number of Batch Records</label>
        <select
          value={numberOfRecords}
          onChange={(e) => setNumberOfRecords(parseInt(e.target.value))}
          className="dropdown-trigger"
        >
          {batchRecordOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      <button onClick={generateAndDownload} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Files'}
      </button>
    </div>
  );
};

export default UnoDemoGenerator;