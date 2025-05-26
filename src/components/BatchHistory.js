import React from 'react';

const BatchHistory = ({ history }) => {
  return (
    <div className="batch-history">
      <h3>Batch History</h3>
      <table>
        <thead>
          <tr>
            <th>Batch Name</th>
            <th>Date</th>
            <th>Size</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((batch, index) => (
            <tr key={index}>
              <td>{batch.name}</td>
              <td>{batch.date.toLocaleString()}</td>
              <td>{batch.size} records</td>
              <td>
                <a href={batch.downloadUrl} download={`${batch.name}.zip`}>
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchHistory;