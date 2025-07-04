import React from "react";

const WalletSummary: React.FC = () => {
  // mock data
  const walletAddress = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  const algoBalance = 120.45;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Wallet Summary
      </h2>

      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Address:</span>
        <p className="break-all text-blue-600">{walletAddress}</p>
      </div>

      <div className="text-lg font-semibold text-gray-700 mt-4">
        ALGO Balance:{" "}
        <span className="text-green-600">{algoBalance} ALGO</span>
      </div>
    </div>
  );
};

export default WalletSummary;
