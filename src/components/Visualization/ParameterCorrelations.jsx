import React from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

const ParameterCorrelations = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Parameter Correlations with Biodiversity Index
        </h2>
        <div className="h-[350px] w-full flex items-center justify-center bg-gray-50 border border-dashed rounded-lg text-gray-400">
          No correlation data available.
        </div>
      </div>
    );
  }

  const tempVsBiodiversity = data.filter(d => d.tempBiodiversity !== null);
  const salinityVsBiodiversity = data.filter(d => d.salinityBiodiversity !== null);

  // Transform data for Scatter plot structure: { x: paramValue, y: biodiversity }
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
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 30, bottom: 20, left: 10 }} 
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            
            {/* X-Axis: Parameter Value */}
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Parameter Value" 
              domain={['dataMin', 'dataMax']}
              label={{ value: 'Parameter Value', position: 'bottom', dy: 15 }}
              tickCount={10}
              allowDecimals={false}
            />
            
            {/* Y-Axis: Biodiversity Index */}
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Biodiversity Index" 
              domain={[6.0, 7.6]}
              label={{ value: 'Biodiversity Index', angle: -90, position: 'left', dx: -10 }}
              allowDecimals={true}
            />
            
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }} 
              formatter={(value, name, props) => {
                if (name === 'X') return [`Parameter Value: ${value}`];
                if (name === 'Y') return [`Biodiversity Index: ${value}`];
                return [value];
              }}
            />
            
            <Legend 
              verticalAlign="top" 
              height={36} 
              wrapperStyle={{ marginBottom: '10px' }}
              layout="horizontal"
            />

            {/* Scatter points for Temperature */}
            <Scatter 
              name="Temperature vs Biodiversity" 
              data={tempScatterData} 
              fill="#F66F6A" 
              shape="circle"
            />
            
            {/* Scatter points for Salinity */}
            <Scatter 
              name="Salinity vs Biodiversity" 
              data={salinityScatterData} 
              fill="#3E99E9" 
              shape="circle"
            />

          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ParameterCorrelations;