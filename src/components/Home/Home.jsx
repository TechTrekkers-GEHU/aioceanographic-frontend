import React, { useState } from 'react';

// Inline SVG Icons
const AnalysisIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
const PlaceholderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="12"></line>
    <line x1="5" y1="18" x2="5" y2="22"></line>
    <line x1="19" y1="18" x2="19" y2="22"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
  </svg>
);

const SUGGESTION_CHIPS = [
  { label: 'Coral reef health in Ocean', id: 1 },
  { label: 'Fish population trends 2024-2025', id: 2 },
  { label: 'Impact of temperature on plankton', id: 3 }
];

const Home = () => {
  // Start empty; use placeholder for hint
  const [query, setQuery] = useState('');

  const handleChipClick = (chipText) => setQuery(`Analyze: ${chipText}`);
  const handleAnalysis = () => console.log(`Initiating analysis for: ${query}`);

  const canAnalyze = query.trim().length > 0;

  return (
    // Wider desktop container; grows to 1400px, centered
    <div className="space-y-10 w-full mx-auto p-3">
      {/* Header */}
      <div className="w-full">
        <h1 className="text-3xl xl:text-4xl font-semibold text-[#007bff] mb-3">
          AI Oceanographic Data Platform
        </h1>
        <p className="text-gray-700 text-base xl:text-lg leading-relaxed">
          Ask natural language questions to analyze marine ecosystems, track biodiversity changes, and explore conservation insights.
        </p>
      </div>

      {/* Analysis Input Card */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          What would you like to analyze?
        </h2>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTION_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleChipClick(chip.label)}
              className="px-3 py-1 text-sm rounded-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Query Input + Button in responsive grid */}
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] items-start">
          <div className="input-box-wrapper p-4 bg-gray-50/50 rounded-lg border border-gray-200">
            <textarea
              className="w-full h-28 p-0 border-none resize-y focus:ring-0 text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
              placeholder="e.g. Analyze coral reef data in Indian Ocean over the last 5 years"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button
            className="px-5 py-2 bg-[#2d9a92] text-white rounded-md font-medium inline-flex items-center gap-2 hover:bg-[#20807b] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            onClick={handleAnalysis}
            disabled={!canAnalyze}
          >
            <AnalysisIcon />
            Analyze Data
          </button>
        </div>
      </div>

      {/* Analysis Results Card */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-800">Analysis Results</h2>
          <button
            className="text-gray-400 hover:text-blue-800 transition-colors"
            onClick={() => console.log('Download triggered.')}
            aria-label="Download results"
          >
            <DownloadIcon />
          </button>
        </div>

        {/* Results Placeholder */}
        <div className="flex flex-col items-center justify-center p-12 text-gray-500 border border-gray-100 rounded-lg bg-gray-50">
          <div className="mb-2 text-blue-400">
            <PlaceholderIcon />
          </div>
          <p className="text-sm">Your analysis results will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
