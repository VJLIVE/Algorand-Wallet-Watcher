import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Algorand Wallet Watcher
        </Link>

        <nav className="space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
