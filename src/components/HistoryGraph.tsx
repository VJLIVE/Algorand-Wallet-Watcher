import React from "react";

const HistoryGraph: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        History Graph
      </h2>

      <div className="flex items-center justify-center h-48 bg-gray-100 rounded">
        <span className="text-gray-500">[Graph will render here]</span>
      </div>
    </div>
  );
};

export default HistoryGraph;
