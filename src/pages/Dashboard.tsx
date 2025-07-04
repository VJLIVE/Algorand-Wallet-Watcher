import React from "react";
import WalletSummary from "../components/WalletSummary";
import NFTList from "../components/NFTList";
import HistoryGraph from "../components/HistoryGraph";
import AlertSettings from "../components/AlertSettings";

const Dashboard: React.FC = () => {
  return (
    <main className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Dashboard
      </h1>

      <section className="grid gap-6 md:grid-cols-2">
        <WalletSummary />
        <AlertSettings />
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <NFTList />
        <HistoryGraph />
      </section>
    </main>
  );
};

export default Dashboard;
