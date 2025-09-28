import React, { useState } from "react";
import Papa from "papaparse";

const analysisOptions = ['PCA', 'CCA', 'PLS', 'RDA'];

const visualizationMap = {
  PCA: ['Scree Plot', 'Scatter Plot', 'Biplot'],
  CCA: ['Canonical Scatter', 'Biplot', 'Heatmap'],
  PLS: ['Latent Scatter', 'VIP Bar', 'Heatmap'],
  RDA: ['Ordination Plot', 'Biplot', 'Gradient Arrows'],
};



const MultivariateCrossDomain = () => {
  const [csvA, setCsvA] = useState([]);
  const [csvB, setCsvB] = useState([]);
  const [analysisType, setAnalysisType] = useState('PCA');
  const [visualizationType, setVisualizationType] = useState('Scree Plot');
  const [analysisRun, setAnalysisRun] = useState(false);

  const handleUpload = (e, setter) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => setter(results.data),
    });
    setAnalysisRun(false);
  };

  const handleRunAnalysis = () => {
    if (csvA.length && csvB.length && analysisType && visualizationType) {
      setAnalysisRun(true);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center text-slate-900 tracking-tight">
          Multivariate Cross Domain Analysis
        </h1>

        {/* Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-xl p-6">
          <div>
            <label className="block font-semibold mb-2 text-slate-800"> Dataset A (CSV)</label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleUpload(e, setCsvA)}
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-slate-800"> Dataset B (CSV)</label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleUpload(e, setCsvB)}
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Analysis Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white shadow-md rounded-xl p-6">
          <div>
            <label className="block font-semibold mb-2 text-slate-800">Select Analysis Method</label>
            <select
              value={analysisType}
              onChange={(e) => {
                setAnalysisType(e.target.value);
                setVisualizationType(visualizationMap[e.target.value][0]);
                setAnalysisRun(false);
              }}
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {analysisOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-slate-800">Select Visualization Type</label>
            <select
              value={visualizationType}
              onChange={(e) => {
                setVisualizationType(e.target.value);
                setAnalysisRun(false);
              }}
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={!analysisType}
            >
              {visualizationMap[analysisType].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRunAnalysis}
              disabled={!csvA.length || !csvB.length || !analysisType || !visualizationType}
              className="w-full bg-blue-600 text-white font-semibold py-4 px-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              🚀 Run Analysis
            </button>
          </div>
        </div>

        {/* Visualization Summary */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">📊 Visualization</h2>
          {analysisRun ? (
            <p className="text-slate-700 leading-relaxed">
              <strong>{visualizationType}</strong> for <strong>{analysisType}</strong> has been processed using both datasets.
              You can now interpret the results or render visual outputs.
            </p>
          ) : (
            <p className="text-slate-400">Upload both datasets, select options, and run analysis to view summary.</p>
          )}
        </div>

        {/* Numeric Summary */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">📈 Numeric Summary</h2>
          {analysisRun ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Metric A', 'Metric B', 'Metric C'].map((label, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
                  <p className="font-semibold text-slate-700">{label}</p>
                  <p className="text-blue-600 text-lg mt-1">[Insert value or interpretation]</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-400">Run analysis to view numeric summary.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultivariateCrossDomain;
