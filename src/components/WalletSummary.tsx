import React, { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import axios from "axios";

const WalletSummary: React.FC = () => {
  const { account } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!account) return;

    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          `https://testnet-api.algonode.cloud/v2/accounts/${account}`
        );
        setBalance(res.data.amount / 1e6); // convert microalgos to algos
      } catch (err) {
        console.error(err);
      }
    };

    fetchBalance();
  }, [account]);

  if (!account) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-700">
          Please connect your wallet to see summary.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Wallet Summary</h2>

      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Address:</span>
        <p className="break-all text-blue-600">{account}</p>
      </div>

      <div className="text-lg font-semibold text-gray-700 mt-4">
        ALGO Balance:{" "}
        <span className="text-green-600">
          {balance !== null ? `${balance} ALGO` : "Loading..."}
        </span>
      </div>
    </div>
  );
};

export default WalletSummary;
