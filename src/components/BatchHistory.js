import React from 'react';

const BatchHistory = ({ history, onDelete, onClearAll }) => {
  return (
    <div className="batch-history-container">
      <div className="batch-history-header">
        <h3>Batch History</h3>
        <button onClick={onClearAll} className="clear-history-btn">Clear All</button>
      </div>
      <div className="table-responsive">
        <table className="batch-history-table">
          <thead>
            <tr>
              <th>Batch Name</th>
              <th>Partner Name</th>
              <th>Date</th>
              <th>Records</th>
              <th>Batches</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((batch, index) => (
              <tr key={index}>
                <td data-label="Batch Name">{batch.name}</td>
                <td data-label="Partner Name">{batch.partnerName}</td>
                <td data-label="Date">{new Date(batch.date).toLocaleString()}</td>
                <td data-label="Records">{batch.records}</td>
                <td data-label="Batches">{batch.batches}</td>
                <td data-label="Actions" className="action-buttons">
                  <a href={batch.downloadUrl} download={batch.name} className="download-btn">Download</a>
                  <button onClick={() => onDelete(index)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatchHistory;