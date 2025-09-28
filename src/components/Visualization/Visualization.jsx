import React, { useState, useEffect } from "react";
import { cn } from "../../utils/cn";
import { fetchParameterCorrelationsData } from "../../services/visualizationengine";
import ParameterCorrelations from "./ParameterCorrelations";
import StatCard from "./StatCard";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { FiDownload, FiSave } from 'react-icons/fi';

import DataSourceConfig from "./DataSourceConfig";
import './DataSourceConfig.css';


const OceanStatChart = ({ data, color, unit, title, decimalPlaces = 1 }) => {
  if (!data || data.length === 0) return <div className="h-full flex items-center justify-center text-gray-400">No data available</div>;

  const maxVal = Math.max(...data.map(d => d.value));
  const minVal = Math.min(...data.map(d => d.value));
  const buffer = (maxVal - minVal) * 0.05 || 0.01;

  const lineColor = color || '#3E99E9';
  const gradientId = `color${title.replace(/\s/g, '')}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lineColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />

        <Tooltip
          formatter={(value) => [`${Number(value).toFixed(decimalPlaces)} ${unit}`]}
          labelFormatter={(label) => `Month: ${label}`}
          contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px' }}
        />

        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{ fontSize: '12px', marginBottom: '10px', paddingTop: '10px' }}
          payload={[{
            value: title + (unit ? ` (${unit})` : ''),
            type: 'square',
            color: lineColor
          }]}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke={lineColor}
          strokeWidth={3}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{ r: 4, fill: lineColor, stroke: 'white', strokeWidth: 2 }}
        />

        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={true}
          fontSize={10}
          padding={{ left: 10, right: 10 }}
        />

        <YAxis
          domain={[minVal - buffer, maxVal + buffer]}
          tickLine={false}
          axisLine={false}
          fontSize={10}
          orientation="left"
          width={40}
          tickFormatter={(tick) => tick.toFixed(decimalPlaces)}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
// ----------------------------------------------------------------------

const Visualization = ({ activeVizId = 'param' }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchParameterCorrelationsData();
        setData(fetchedData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch visualization data:", err);
        setError("Could not load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (activeVizId === 'param' || activeVizId === 'biodiversity') {
      loadData();
    }
  }, [activeVizId]);


  if (isLoading) {
    return <div className="p-8 text-center text-blue-500">Loading Visualization Data...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }
  
  const { stats, correlationData } = data || { stats: [], correlationData: [] };

  const renderMainContent = (currentVizId) => {
    switch (currentVizId) {
      case 'param':
      case 'biodiversity':
        return (
          <div className="space-y-6 w-full">
            <DataSourceConfig />

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-700">Parameter Correlations</h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">
                  <FiDownload size={16} />
                  <span>Export Data</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">
                  <FiSave size={16} />
                  <span>Save Visualization</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <StatCard
                  key={stat.id}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  trend={stat.trend}
                >
                  <OceanStatChart
                    data={stat.timeSeries}
                    title={stat.title.split(' ')[0]}
                    unit={stat.unit}
                    color={stat.id === 'temp' ? '#F66F6A' : stat.id === 'salinity' ? '#3E99E9' : '#6AD3CF'}
                    
                    decimalPlaces={stat.id === 'ph' ? 2 : 1}
                  />
                </StatCard>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg min-h-[400px]">
              <ParameterCorrelations data={correlationData} />
            </div>
          </div>
        );
      
      default:
        return <div className="text-xl text-gray-500 p-6">Select a visualization from the sidebar to begin.</div>;
    }
  };

  return (
    <div className="flex w-full min-h-full bg-gray-50">
      <div className={cn("flex-1 p-8 transition-all duration-300 ease-in-out")}>
        {renderMainContent(activeVizId)}
      </div>
    </div>
  );
};

export default Visualization;