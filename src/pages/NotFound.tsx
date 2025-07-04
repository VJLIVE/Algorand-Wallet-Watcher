import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">
        404
      </h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! Page not found.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go back Home
      </Link>
    </main>
  );
};

export default NotFound;
