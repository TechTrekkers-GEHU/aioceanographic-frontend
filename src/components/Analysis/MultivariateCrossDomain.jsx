import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import CSVPreview from "./CSVPreview";

const analysisOptions = ['CCA', 'RCA'];

const visualizationMap = {
  CCA: ['Canonical Scatter', 'Scree Plot', 'Correlation Heatmap'],
  RCA: ['Ordination Plot', 'Biplot', 'Gradient Arrows'],
};

const visualizationKeyMap = {
  CCA: {
    'Canonical Scatter': 'scatter',
    'Scree Plot': 'scree',
    'Correlation Heatmap': 'heatmap',
  },
  RCA: {
    'Ordination Plot': 'ordination',
    'Biplot': 'biplot',
    'Gradient Arrows': 'gradients',
  }
};

const cleanCSV = (data) => {
  return data.filter(row =>
    Object.values(row).every(val => val !== null && val !== "" && !Number.isNaN(val))
  );
};

const MultivariateCrossDomain = () => {
  const [csvA, setCsvA] = useState([]);
  const [csvB, setCsvB] = useState([]);
  const [analysisType, setAnalysisType] = useState('CCA');
  const [visualizationType, setVisualizationType] = useState(visualizationMap['CCA'][0]);
  const [analysisRun, setAnalysisRun] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState({ visible: false, title: '', data: [] });
  const iframeRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = showPreview.visible ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showPreview.visible]);

  const handleUpload = (e, setter) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => setter(results.data),
    });
    setAnalysisRun(false);
    setIframeSrc(null);
    setMetrics(null);
  };

  const handleRunAnalysis = async () => {
    if (!csvA.length || !csvB.length || !analysisType || !visualizationType) return;

    const cleanedA = cleanCSV(csvA);
    const cleanedB = cleanCSV(csvB);

    if (!cleanedA.length || !cleanedB.length) {
      alert("⚠️ One or both datasets contain missing or invalid values. Please clean your CSVs.");
      return;
    }

    const formData = new FormData();
    formData.append("file1", new Blob([Papa.unparse(cleanedA)], { type: "text/csv" }), "datasetA.csv");
    formData.append("file2", new Blob([Papa.unparse(cleanedB)], { type: "text/csv" }), "datasetB.csv");

    const endpoint = analysisType.toLowerCase();
    const serverKey = visualizationKeyMap[analysisType][visualizationType];
    const url = `http://34.4.27.115:8010/${endpoint}?visualizationType=${encodeURIComponent(serverKey)}`;

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        const html = result.html;
        setMetrics(result.metrics || null);

        const blob = new Blob([html], { type: "text/html" });
        const blobUrl = URL.createObjectURL(blob);
        setIframeSrc(blobUrl);
      } else {
        const html = await response.text();
        setMetrics(null);
        const blob = new Blob([html], { type: "text/html" });
        const blobUrl = URL.createObjectURL(blob);
        setIframeSrc(blobUrl);
      }

      setAnalysisRun(true);
    } catch (err) {
      console.error("Analysis failed:", err);
      alert("❌ Analysis failed. Check server logs or input format.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (iframeRef.current && iframeSrc) {
      iframeRef.current.src = iframeSrc;
    }
  }, [iframeSrc]);

  return (
    <div className="space-y-6 w-full">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center text-slate-900 tracking-tight">
          Multivariate Cross Domain Analysis
        </h1>

        {/* Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-xl p-6">
          <div>
            <label className="block font-semibold mb-2 text-slate-800">Dataset A (CSV)</label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleUpload(e, setCsvA)}
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => setShowPreview({ visible: true, title: "Dataset A Preview", data: csvA })}
              disabled={!csvA.length}
              className="mt-2 inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md disabled:text-slate-400 disabled:bg-slate-100"
            >
              🔍 Preview Dataset A
            </button>
          </div>
          <div>
            <label className="block font-semibold mb-2 text-slate-800">Dataset B (CSV)</label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleUpload(e, setCsvB)}
              className="block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => setShowPreview({ visible: true, title: "Dataset B Preview", data: csvB })}
              disabled={!csvB.length}
              className="mt-2 inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md disabled:text-slate-400 disabled:bg-slate-100"
            >
              🔍 Preview Dataset B
            </button>
          </div>
        </div>

        {/* Analysis Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white shadow-md rounded-xl p-6">
          <div>
            <label className="block font-semibold mb-2 text-slate-800">Select Analysis Method</label>
            <select
              value={analysisType}
              onChange={(e) => {
                const selected = e.target.value;
                setAnalysisType(selected);
                setVisualizationType(visualizationMap[selected][0]);
                setAnalysisRun(false);
                setIframeSrc(null);
                setMetrics(null);
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
                setIframeSrc(null);
                setMetrics(null);
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
              disabled={!csvA.length || !csvB.length || loading}
              className="w-full bg-blue-600 text-white font-semibold py-4 px-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              🚀 {loading ? "Running..." : "Run Analysis"}
            </button>
          </div>
        </div>

        {/* Numeric Summary */}
        <div className="bg-white shadow-md rounded-xl p-6">
                   <h2 className="text-2xl font-semibold text-slate-900 mb-4">📈 Numeric Summary</h2>
          {metrics ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(metrics).map(([label, value]) => (
                <div key={label} className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
                  <p className="font-semibold text-slate-700">{label}</p>
                  <p className="text-blue-600 text-lg mt-1">
                    {value !== null && value !== undefined ? Number(value).toFixed(2) : "Not Available"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Metric A", "Metric B", "Metric C"].map((label) => (
                <div key={label} className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
                  <p className="font-semibold text-slate-700">{label}</p>
                  <p className="text-slate-400 text-lg mt-1">Not Available</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visualization Summary */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">📊 Visualization</h2>
          {analysisRun ? (
            <>
              <p className="text-slate-700 leading-relaxed">
                <strong>{visualizationType}</strong> for <strong>{analysisType}</strong> has been processed using both datasets.
                You can now interpret the results or render visual outputs.
              </p>
              <iframe
                ref={iframeRef}
                title="Analysis Visualization"
                style={{
                  width: "100%",
                  maxWidth: "900px",
                  height: "600px",
                  border: "none",
                  marginTop: "2rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
            </>
          ) : (
            <p className="text-slate-400">Upload both datasets, select options, and run analysis to view summary.</p>
          )}
        </div>

        {/* CSV Preview Modal */}
        {showPreview.visible && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/30 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 md:mx-0 max-h-[85vh] overflow-y-auto p-6 relative border border-slate-200">
              <button
                onClick={() => setShowPreview({ visible: false, title: '', data: [] })}
                className="absolute top-4 right-4 text-slate-500 hover:text-red-500 text-xl font-bold"
                aria-label="Close preview"
              >
                &times;
              </button>
              <CSVPreview data={showPreview.data} title={showPreview.title} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultivariateCrossDomain;
