import React from "react";

const AlertSettings: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Alert Settings
      </h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Email for alerts:
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="txnAlerts"
            className="mr-2"
          />
          <label htmlFor="txnAlerts" className="text-sm text-gray-700">
            Notify me on transactions
          </label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AlertSettings;
