import React, { useState, useEffect } from "react";
import { generateSampleData } from "../lib/dataGenerator";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Button from "./ui/button";

const UnoDemoGenerator = () => {
  const [partner, setPartner] = useState("Demo account");
  const [spoCode, setSpoCode] = useState("AFLDEM");
  const [numberOfRecords, setNumberOfRecords] = useState(1);
  const [numberOfBatches, setNumberOfBatches] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [batchHistory, setBatchHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("batchHistory");
    if (savedHistory) {
      setBatchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const partnerMapping = {
    "Demo account": "AFLDEM",
    "Capri Global": "AFLI24",
    Prayas: "AFLCPR",
    Agrosperity: "AFLCLF",
    UNITY: "UNITY-AFLI-CL-4",
  };

  const batchRecordOptions = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000];
  const batchOptions = [1, 5, 10];

  const handlePartnerChange = (selectedPartner) => {
    setPartner(selectedPartner);
    setSpoCode(partnerMapping[selectedPartner]);
  };

  const generateAndDownload = async () => {
    setIsGenerating(true);
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, -5);
    const batchName = `Demo_${partner.replace(/\s+/g, "")}_${formattedDate}`;

    if (numberOfRecords === 1 && numberOfBatches === 1) {
      // Single record: Download as .xlsx without zipping
      const sampleData = generateSampleData(spoCode, 1);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(sampleData);
      XLSX.utils.book_append_sheet(wb, ws, "Sample Data");

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const fileName = `${batchName}.xlsx`;
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, fileName);

      // Add to batch history
      addToBatchHistory(batchName, currentDate, 1, blob);
    } else {
      // Multiple records or batches: Zip and download
      const zip = new JSZip();

      for (let i = 0; i < numberOfBatches; i++) {
        const sampleData = generateSampleData(spoCode, numberOfRecords);
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(sampleData);
        XLSX.utils.book_append_sheet(wb, ws, "Sample Data");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const fileName = `${batchName}_${i + 1}.xlsx`;
        zip.file(fileName, excelBuffer);
      }

      zip.generateAsync({ type: "blob" }).then(function (content) {
        const zipFileName = `${batchName}.zip`;
        saveAs(content, zipFileName);

        // Add to batch history
        addToBatchHistory(
          batchName,
          currentDate,
          numberOfRecords * numberOfBatches,
          content,
        );
      });
    }

    setIsGenerating(false);
  };

  const addToBatchHistory = (name, date, size, content) => {
    const fileSize = content.size / 1024; // Convert to KB
    const formattedSize =
      fileSize > 1024
        ? `${(fileSize / 1024).toFixed(2)} MB`
        : `${fileSize.toFixed(2)} KB`;
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    const newBatch = {
      name,
      partnerName: partner,
      date: formattedDate,
      records: numberOfRecords,
      batches: numberOfBatches,
      size: formattedSize,
      downloadUrl: URL.createObjectURL(content),
    };
    const updatedHistory = [newBatch, ...batchHistory];
    setBatchHistory(updatedHistory);
    localStorage.setItem("batchHistory", JSON.stringify(updatedHistory));
  };

  const deleteBatchHistory = (index) => {
    const updatedHistory = batchHistory.filter((_, i) => i !== index);
    setBatchHistory(updatedHistory);
    localStorage.setItem("batchHistory", JSON.stringify(updatedHistory));
  };

  const clearAllHistory = () => {
    setBatchHistory([]);
    localStorage.removeItem("batchHistory");
  };

  return (
    <div className="uno-demo-generator">
      <h2>Uno Batch Generator</h2>

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
          className="read-only-input"
        />
      </div>

      <div className="input-group">
        <label htmlFor="numberOfRecords">Number of Records per Batch</label>
        <select
          id="numberOfRecords"
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

      <div className="input-group">
        <label htmlFor="numberOfBatches">Number of Batches</label>
        <select
          id="numberOfBatches"
          value={numberOfBatches}
          onChange={(e) => setNumberOfBatches(parseInt(e.target.value))}
          className="dropdown-trigger"
        >
          {batchOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <Button
        onClick={generateAndDownload}
        disabled={isGenerating}
        className={`${
          isGenerating ? "loading" : ""
        } bg-[#121212] text-[#FFFFFF] hover:bg-[#2a2a2a]`}
      >
        {isGenerating ? "Generating..." : "Generate Files"}
      </Button>

      <div className="batch-history">
        <h3>Batch History</h3>
        {batchHistory.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Partner</th>
                  <th>Date</th>
                  <th>Records</th>
                  <th>Batches</th>
                  <th>Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {batchHistory.map((batch, index) => (
                  <tr key={index}>
                    <td>{batch.name}</td>
                    <td>{batch.partnerName}</td>
                    <td>{batch.date}</td>
                    <td>{batch.records}</td>
                    <td>{batch.batches}</td>
                    <td>{batch.size}</td>
                    <td>
                      <Button
                        onClick={() => window.open(batch.downloadUrl, "_blank")}
                      >
                        Download
                      </Button>
                      <button
                        onClick={() => deleteBatchHistory(index)}
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              variant="secondary"
              onClick={clearAllHistory}
              className="mt-4"
            >
              Clear All History
            </Button>
          </>
        ) : (
          <p>No batch history available.</p>
        )}
      </div>
    </div>
  );
};

export default UnoDemoGenerator;
