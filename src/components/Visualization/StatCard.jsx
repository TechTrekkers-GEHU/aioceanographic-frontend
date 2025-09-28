import React from 'react';
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

const StatCard = ({ title, value, change, trend, children }) => {
  const isUp = trend === 'up';
  
  // Custom colors for styling
  const valueColor = '#2b9cd8'; 
  const upColor = 'text-green-600'; 
  const downColor = 'text-red-600'; 

  const changeColor = isUp ? upColor : downColor;
  const ArrowIcon = isUp ? BiSolidUpArrow : BiSolidDownArrow;

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col h-[280px] border border-gray-100"> 
      
      {/* Header Area */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>

        <span className="text-3xl font-bold" style={{ color: valueColor }}>{value}</span> 
      </div>
      

      <div className={`text-sm flex items-center mb-4 ${changeColor}`}>
        <ArrowIcon className="mr-1 text-sm" />
        {change}
      </div>

      <div className="flex-1 min-h-[150px] w-full"> 
        {children}
      </div>
    </div>
  );
};

export default StatCard;