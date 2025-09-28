export const mockVisualizationData = {
  // Data for the top cards
  stats: [
    { 
      id: "temp", 
      title: "Sea S/f Temperature", 
      value: "24.7°C", 
      unit: "°C",
      change: "+0.8°C from last month", 
      trend: "up",
      timeSeries: [
        { month: 'Jan', value: 22.5 },
        { month: 'Feb', value: 23.0 },
        { month: 'Mar', value: 23.8 },
        { month: 'Apr', value: 24.5 },
        { month: 'May', value: 24.8 },
        { month: 'Jun', value: 25.4 },
      ]
    },
    { 
      id: "salinity", 
      title: "Salinity", 
      value: "35.2 PSU", 
      unit: "PSU",
      change: "-0.3 PSU from last month", 
      trend: "down",
      timeSeries: [
        { month: 'Jan', value: 35.50 },
        { month: 'Feb', value: 35.45 },
        { month: 'Mar', value: 35.35 },
        { month: 'Apr', value: 35.15 },
        { month: 'May', value: 35.25 },
        { month: 'Jun', value: 35.20 },
      ]
    },
    { 
      id: "ph", 
      title: "pH Level", 
      value: "8.12", 
      unit: "",
      change: "-0.04 from last year", 
      trend: "down",
      timeSeries: [
        { month: 'Jan', value: 8.145 },
        { month: 'Feb', value: 8.140 },
        { month: 'Mar', value: 8.130 },
        { month: 'Apr', value: 8.125 },
        { month: 'May', value: 8.120 },
        { month: 'Jun', value: 8.105 },
      ]
    },
  ],

  // scatter plot
  correlationData: [
    { paramValue: 22, tempBiodiversity: 6.2, salinityBiodiversity: null },
    { paramValue: 22.5, tempBiodiversity: 6.6, salinityBiodiversity: null },
    { paramValue: 23, tempBiodiversity: 7.0, salinityBiodiversity: null },
    { paramValue: 23.5, tempBiodiversity: 7.3, salinityBiodiversity: null },
    { paramValue: 24, tempBiodiversity: 7.5, salinityBiodiversity: null },
    { paramValue: 25, tempBiodiversity: 7.2, salinityBiodiversity: null },
    { paramValue: 26, tempBiodiversity: 7.1, salinityBiodiversity: null },
    { paramValue: 34, tempBiodiversity: null, salinityBiodiversity: 6.8 },
    { paramValue: 35, tempBiodiversity: null, salinityBiodiversity: 7.2 },
    { paramValue: 36, tempBiodiversity: null, salinityBiodiversity: 7.4 },
    { paramValue: 37, tempBiodiversity: null, salinityBiodiversity: 7.1 },
    { paramValue: 38, tempBiodiversity: null, salinityBiodiversity: 6.9 },
  ]
};