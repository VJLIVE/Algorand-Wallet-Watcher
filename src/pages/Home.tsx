import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="min-h-screen flex items-center px-4 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: copy + quick add */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Algorand Wallet Watcher
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Keep an eye on your Algorand addresses, ALGO balances and NFTs. Get instant,
              non-custodial alerts for transactions and large movements — fast and privacy-first.
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Open Dashboard
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

            {/* Quick-add form to jump to dashboard with an address */}
            <QuickAdd />
          </div>

          {/* Right: mock wallet preview */}
          <div className="mx-auto w-full max-w-md">
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm text-gray-500">Example wallet</h3>
                  <p className="font-semibold text-lg">ALGO • 2 addresses</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-bold text-xl">1,234.56 ALGO</p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">$ALGO • 1001...cdef</div>
                  <div className="text-sm text-gray-500">+12.5</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">$ALGO • 1002...abcd</div>
                  <div className="text-sm text-gray-500">-3.2</div>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400">Mock preview — real data appears in the Dashboard when you add addresses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Why use Wallet Watcher?</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Real-time alerts</h3>
              <p className="text-gray-600 text-sm">
                Receive notifications when transactions occur on any of your watched accounts so you
                never miss activity.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">ALGO balance tracking</h3>
              <p className="text-gray-600 text-sm">
                Track ALGO balances across multiple addresses with historical changes and quick
                insights into movements.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">NFT overview</h3>
              <p className="text-gray-600 text-sm">
                View NFTs held by your addresses with metadata (where available) and quick links to
                IPFS-hosted assets.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Privacy-first</h3>
              <p className="text-gray-600 text-sm">
                No custodial wallets: Wallet Watcher only reads public chain data and never stores
                private keys.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Custom alerts</h3>
              <p className="text-gray-600 text-sm">
                Set thresholds and notify channels for large transfers or specific transaction
                types.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Lightweight & fast</h3>
              <p className="text-gray-600 text-sm">
                Built with Vite and React, Wallet Watcher is optimized for speed and low resource
                usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 bg-white/50 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">How it works</h2>

          <ol className="space-y-6">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-medium">Add addresses</h4>
                <p className="text-gray-600 text-sm">Add the Algorand addresses you want to monitor in the Dashboard.</p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-medium">Track activity</h4>
                <p className="text-gray-600 text-sm">Wallet Watcher polls the Algorand indexer to fetch balances, transactions and NFTs for the addresses you added.</p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-medium">Receive alerts</h4>
                <p className="text-gray-600 text-sm">Configure alert rules and get notified when interesting events occur.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 mb-4">Ready to start monitoring your Algorand wallets?</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Open Dashboard
            </Link>
            <a
              href="https://github.com/VJLIVE/Algorand-Wallet-Watcher"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
            >
              View source
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-6">Built on Algorand • Non-custodial • Privacy-focused</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;

/* QuickAdd component: small form to jump to the dashboard with an address query param */
const QuickAdd: React.FC = () => {
  const [addr, setAddr] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleaned = addr.trim();
    if (!cleaned) return;
    // navigate to dashboard with address as a query param
    navigate(`/dashboard?addr=${encodeURIComponent(cleaned)}`);
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 flex items-center justify-center md:justify-start gap-2">
      <input
        aria-label="Algorand address"
        value={addr}
        onChange={(e) => setAddr(e.target.value)}
        placeholder="Enter Algorand address (e.g. 1001...cdef)"
        className="w-full md:w-72 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Add & View
      </button>
    </form>
  );
};
