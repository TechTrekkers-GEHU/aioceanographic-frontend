import React from "react";

const CSVPreview = ({ data, title }) => {
  if (!data || !data.length) return null;

  const headers = Object.keys(data[0]);
  const previewRows = data.slice(0, 10);

  return (
    <>
      <h3 className="text-xl font-semibold text-slate-800 mb-4">{title}</h3>
      <div className="overflow-auto border border-slate-200 rounded-lg">
        <table className="table-auto w-full text-sm text-left">
          <thead className="bg-slate-100">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-3 py-2 border-b border-slate-300">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewRows.map((row, idx) => (
              <tr key={idx} className="even:bg-slate-50">
                {headers.map((h) => (
                  <td key={h} className="px-3 py-2 border-b border-slate-200">{row[h]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CSVPreview;
