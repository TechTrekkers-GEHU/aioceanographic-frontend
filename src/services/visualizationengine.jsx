import { mockVisualizationData } from "../utils/mockData";

/**
 * Fetches all necessary data for the main Visualization dashboard (Parameter Correlations).
 * * @returns {Promise<object>} The dashboard data (simulating an API response).
 */
export const fetchParameterCorrelationsData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVisualizationData);
    }, 500);
  });
};