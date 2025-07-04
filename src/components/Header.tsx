import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../context/WalletContext";

const Header: React.FC = () => {
  const { account, connect, disconnect } = useWallet();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Algorand Wallet Watcher
        </Link>

        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>

          {account ? (
            <button
              onClick={disconnect}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={connect}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
