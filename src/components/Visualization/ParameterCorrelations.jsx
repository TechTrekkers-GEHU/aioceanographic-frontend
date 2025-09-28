import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label, 
} from 'recharts';

const ParameterCorrelations = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-4 h-[400px] flex items-center justify-center bg-gray-50 border-dashed rounded-lg">
        No correlation data available.
      </div>
    );
  }
  
  const tempVsBiodiversity = data.filter(d => d.tempBiodiversity !== null);
  const salinityVsBiodiversity = data.filter(d => d.salinityBiodiversity !== null);

  const tempScatterData = tempVsBiodiversity.map(item => ({
    x: item.paramValue,
    y: item.tempBiodiversity
  }));

  const salinityScatterData = salinityVsBiodiversity.map(item => ({
    x: item.paramValue,
    y: item.salinityBiodiversity
  }));

  return (


    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Parameter Correlations with Biodiversity Index
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 30,
            bottom: 20,
            left: 30, 
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* X-Axis */}
          <XAxis type="number" dataKey="x" name="Parameter Value" domain={['dataMin - 1', 'dataMax + 1']}>
              <Label value="Ocean Parameter Value (Temp/Salinity)" offset={-15} position="insideBottom" />
          </XAxis>
          
          {/* Y-Axis */}
          <YAxis type="number" dataKey="y" name="Biodiversity Index">
            <Label angle={-90} value="Biodiversity Index" position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>

          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend verticalAlign="top" height={36} />

          <Scatter
            name="Temperature vs Biodiversity"
            data={tempScatterData}
            fill="#F66F6A" 
          />
          
          <Scatter
            name="Salinity vs Biodiversity"
            data={salinityScatterData}
            fill="#3E99E9" 
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParameterCorrelations;