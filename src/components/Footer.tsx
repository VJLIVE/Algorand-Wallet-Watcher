import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Algorand Wallet Watcher — Built with ❤️
      </div>
    </footer>
  );
};

export default Footer;
