import React, { useState, useEffect } from "react";
import { cn } from "../../utils/cn";
import MultivariateCrossDomain from "./MultivariateCrossDomain";
// ----------------------------------------------------------------------

const Analysis = ({ activeAnalysisId = 'multivarentCrossDomain' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  if (isLoading) {
    return <div className="p-8 text-center text-blue-500">Loading Analysis Engine</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  const renderMainContent = (currentAnalysisId) => {
    switch (currentAnalysisId) {
      case "multivarentCrossDomain":
        return <MultivariateCrossDomain/>
      default:
        return <div className="text-xl text-gray-500 p-6">Select a Analysis Engine from the sidebar to begin.</div>;
    }
  };

  return (
    <div className="flex w-full min-h-full bg-gray-50">
      <div className={cn("flex-1 p-8 transition-all duration-300 ease-in-out")}>
        {renderMainContent(activeAnalysisId)}
      </div>
    </div>
  );
};

export default Analysis;