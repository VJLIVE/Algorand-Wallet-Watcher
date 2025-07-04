import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Algorand Wallet Watcher
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Monitor your Algorand wallets, track ALGO & NFTs, and receive alerts for transactions.
        </p>

        <div className="space-x-4">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
          <a
            href="https://developer.algorand.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Learn more
          </a>
        </div>
      </div>
    </main>
  );
};

export default Home;
