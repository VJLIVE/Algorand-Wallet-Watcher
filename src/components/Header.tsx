import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../context/WalletContext";

const shortAddr = (addr?: string) => {
  if (!addr) return "";
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

const Header: React.FC = () => {
  const { account, connect, disconnect } = useWallet();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">AW</div>
            <span className="text-lg font-bold text-gray-800">Algorand Wallet Watcher</span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {account ? (
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border">{shortAddr(account)}</div>
              <button
                onClick={disconnect}
                className="bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600 transition"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="p-2 rounded-md bg-gray-100"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link to="/" onClick={() => setOpen(false)} className="text-gray-700">Home</Link>
            <Link to="/dashboard" onClick={() => setOpen(false)} className="text-gray-700">Dashboard</Link>

            {account ? (
              <button
                onClick={() => { disconnect(); setOpen(false); }}
                className="text-left text-red-600 mt-2"
              >
                Disconnect ({shortAddr(account)})
              </button>
            ) : (
              <button
                onClick={() => { connect(); setOpen(false); }}
                className="text-left text-blue-600 mt-2"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
