import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useWallet } from "../context/WalletContext";
import { fetchTransactionsForAddress } from "../services/algorand"; // You'll implement this
import dayjs from "dayjs";

type TxDataPoint = {
  date: string;
  count: number;
};

const HistoryGraph: React.FC = () => {
  const { account } = useWallet();
  const [data, setData] = useState<TxDataPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!account) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const txns = await fetchTransactionsForAddress(account);

        const grouped = txns.reduce((acc: Record<string, number>, txn: any) => {
          const date = dayjs(txn["round-time"] * 1000).format("YYYY-MM-DD");
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(grouped)
          .sort(([a], [b]) => (a > b ? 1 : -1))
          .map(([date, count]) => ({ date, count }));

        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch tx history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [account]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Transaction History</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HistoryGraph;
