import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Sector, // ✅ FIX: import Sector
} from "recharts";

// -------- Dummy Data --------
const healthIndex = 72;
const domainData = [
  { name: "Oceanography", value: 85 },
  { name: "Taxonomy", value: 65 },
  { name: "Molecular / eDNA", value: 50 },
  { name: "Morphology", value: 70 },
];
const COLORS = ["#0ea5e9", "#22c55e", "#f97316", "#6366f1"];

const correlationData = [
  { x: 24, y: 50 },
  { x: 26, y: 47 },
  { x: 27, y: 44 },
  { x: 28, y: 39 },
  { x: 29, y: 36 },
  { x: 30, y: 32 },
];

const userProgressData = [
  { week: "Week 1", activity: 5 },
  { week: "Week 2", activity: 8 },
  { week: "Week 3", activity: 12 },
  { week: "Week 4", activity: 15 },
  { week: "Week 5", activity: 10 },
  { week: "Week 6", activity: 18 },
];

const healthBreakdownData = [
  { name: "Water Quality", value: 40 },
  { name: "Species Diversity", value: 30 },
  { name: "Pollution Levels", value: 20 },
  { name: "Climate Stability", value: 10 },
];
const BREAKDOWN_COLORS = ["#0ea5e9", "#22c55e", "#f97316", "#6366f1"];

// -------- Icons --------
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);
const PlaceholderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="12"></line>
    <line x1="5" y1="18" x2="5" y2="22"></line>
    <line x1="19" y1="18" x2="19" y2="22"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
  </svg>
);

// -------- Components --------
const HealthGauge = ({ score }) => {
  const pieData = [
    { name: "Health", value: score },
    { name: "Remaining", value: 100 - score },
  ];
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Ecosystem Health Index</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={pieData} innerRadius={60} outerRadius={80}
            startAngle={180} endAngle={0} paddingAngle={5} dataKey="value">
            <Cell fill="#16a34a" />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-2">
        <span className="text-xl font-bold text-green-600">{score}%</span>
      </div>
    </div>
  );
};

const HealthBreakdown = () => (
  <div className="bg-white shadow-md rounded-2xl p-4 w-full">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">Ecosystem Health Breakdown</h3>
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={healthBreakdownData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          paddingAngle={3}
          isAnimationActive={true}
          animationBegin={300}
          animationDuration={2000}
          activeIndex={0}
          activeShape={(props) => {
            const { cx, cy, midAngle, innerRadius, outerRadius,
              startAngle, endAngle, fill, value } = props;
            return (
              <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                  {`${value}%`}
                </text>
                <Sector
                  cx={cx}
                  cy={cy}
                  innerRadius={innerRadius}
                  outerRadius={outerRadius + 8}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  fill={fill}
                />
              </g>
            );
          }}
        >
          {healthBreakdownData.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={BREAKDOWN_COLORS[i % BREAKDOWN_COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const DomainProgress = () => (
  <div className="bg-white shadow-md rounded-2xl p-4 w-full">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Data Source Integration</h3>
    <div className="space-y-3">
      {domainData.map((d, i) => (
        <div key={d.name}>
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span>{d.name}</span>
            <span>{d.value}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="h-2.5 rounded-full"
              style={{ width: `${d.value}%`, backgroundColor: COLORS[i % COLORS.length] }}>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CorrelationChart = () => (
  <div className="bg-white shadow-md rounded-2xl p-4 w-full">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">Correlation: Temp vs Diversity</h3>
    <ResponsiveContainer width="100%" height={220}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis dataKey="x" type="number" name="Temperature (°C)" domain={[24, 31]} />
        <YAxis dataKey="y" type="number" name="Diversity Index" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter name="Observations" data={correlationData} fill="#0ea5e9" />
      </ScatterChart>
    </ResponsiveContainer>
  </div>
);

const UserProgressChart = () => (
  <div className="bg-white shadow-md rounded-2xl p-6 w-full">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">User Progress & Activeness</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={userProgressData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="activity" stroke="#007bff" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const AnalysisResults = () => (
  <div className="bg-white p-6 rounded-lg shadow-md w-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-blue-800">Analysis Results</h2>
      <button className="text-gray-400 hover:text-blue-800 transition-colors"
        onClick={() => console.log("Download triggered.")} aria-label="Download results">
        <DownloadIcon />
      </button>
    </div>
    <div className="flex flex-col items-center justify-center p-12 text-gray-500 border border-gray-100 rounded-lg bg-gray-50">
      <div className="mb-2 text-blue-400">
        <PlaceholderIcon />
      </div>
      <p className="text-sm">Your analysis results will appear here</p>
    </div>
  </div>
);

// -------- Main Page --------
const Home = () => {
  const [query, setQuery] = useState("");
  const handleChipClick = (chipText) => setQuery(`Analyze: ${chipText}`);
  const handleAnalysis = () => console.log(`Initiating analysis for: ${query}`);
  const canAnalyze = query.trim().length > 0;

  return (
    <div className="space-y-10 w-full mx-auto p-4 bg-gray-100 min-h-screen">
      {/* ===== Platform Header ===== */}
      <header className="w-full flex flex-center flex-col text-center mb-6">
        <h1 className="text-3xl xl:text-4xl  font-sans  font-bold text-[#4c9bf0] mb-3">
          AI Oceanographic Data Platform
        </h1>
        <p className="text-gray-700 text-base xl:text-lg font-sans leading-relaxed">
          Ask natural language questions to analyze marine ecosystems, track biodiversity changes, and explore conservation insights.
        </p>
      </header>

      {/* ===== Stats Section ===== */} 
      <section className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-4"> {[ { label: "Active Data Sources", value: "12" }, { label: "Experiments Conducted", value: "58" }, { label: "Species Identified", value: "135" }, { label: "Ongoing Research Projects", value: "7" }, ].map((stat, idx) => ( <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 text-center">
         <p className="text-2xl font-bold text-sky-700">{stat.value}</p>
       <p className="text-sm text-gray-600">{stat.label}</p> </div> ))}
       </section>


      {/* ===== Dashboard Section ===== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HealthGauge score={healthIndex} />
        <HealthBreakdown /> {/* ✅ Added breakdown chart */}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4">
        <DomainProgress />
        {/* ===== Research Projects Tracker ===== */}
        <div className="bg-white shadow-md rounded-2xl p-4 h-64 w-full">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Research Projects / Experiments Tracker
          </h3>
          <p className="text-sm text-gray-400">(Coming Soon)</p>
        </div>
      </section>

      {/* ===== User Progress + Analysis Results ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserProgressChart />
        <AnalysisResults />
      </section>
    </div>
  );
};

export default Home;
