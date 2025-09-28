import React from 'react';
import { FiRefreshCw } from 'react-icons/fi'; 
import './DataSourceConfig.css'; 

const DataSourceConfig = () => {
  return (
    <div className="data-source-config-card">
      <div className="data-source-header">
        <h2 className="data-source-title">Data Source Configuration</h2>
        <button className="refresh-data-btn">
          <FiRefreshCw className="refresh-icon" /> Refresh Data
        </button>
      </div>

      <div className="config-grid">
        <div className="config-item">
          <label htmlFor="data-pipeline" className="config-label">Data Pipeline</label>
          <input
            type="text"
            id="data-pipeline"
            className="config-input"
            defaultValue="Real-time Sensor Data"
            readOnly
          />
        </div>

        <div className="config-item">
          <label htmlFor="time-range" className="config-label">Time Range</label>
          <input
            type="text"
            id="time-range"
            className="config-input"
            defaultValue="Last 24 hours"
            readOnly
          />
        </div>

        <div className="config-item">
          <label htmlFor="region" className="config-label">Region</label>
          <input
            type="text"
            id="region"
            className="config-input"
            defaultValue="Global"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default DataSourceConfig;