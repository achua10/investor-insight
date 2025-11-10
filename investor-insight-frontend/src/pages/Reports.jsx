// import { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// export default function Reports() {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     // Simulate 12 months of data
//     let base = 100000;
//     const data = Array.from({ length: 12 }).map((_, i) => {
//       base += (Math.random() - 0.5) * 8000;
//       return {
//         month: new Date(2024, i).toLocaleString("default", { month: "short" }),
//         value: Math.max(base, 0),
//       };
//     });
//     setChartData(data);
//   }, []);

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow transition-colors duration-300">
//       <h2 className="text-2xl font-semibold mb-4">Reports & Analytics</h2>

//       <ResponsiveContainer width="100%" height={350}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} />
//         </LineChart>
//       </ResponsiveContainer>

//       <p className="text-gray-500 mt-3 text-sm">
//         *Simulated monthly portfolio value (for visualization only)
//       </p>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const [chartData, setChartData] = useState([]);
  const [news, setNews] = useState([]);

  // 🧮 Simulate line chart data
  useEffect(() => {
    let base = 100000;
    const data = Array.from({ length: 12 }).map((_, i) => {
      base += (Math.random() - 0.5) * 8000;
      return {
        month: new Date(2024, i).toLocaleString("default", { month: "short" }),
        value: Math.max(base, 0),
      };
    });
    setChartData(data);
  }, []);

  // 📰 Generate random news items related to stocks, crypto, mutual funds, etc.
  useEffect(() => {
    const topics = [
      "Tesla",
      "Apple",
      "Bitcoin",
      "Nvidia",
      "Reliance",
      "Infosys",
      "Gold Bonds",
      "Mutual Funds",
      "NIFTY 50",
      "Ethereum",
    ];

    const sampleHeadlines = [
      "shares surge amid positive quarterly earnings report",
      "stock dips slightly as investors await policy updates",
      "posts record-breaking gains after strong Q3 results",
      "under pressure as market sentiment turns cautious",
      "continues upward momentum amid global market rally",
      "faces mild correction after weeks of strong growth",
      "analysts predict a bullish trend going into next quarter",
      "investors show renewed confidence after buyback news",
      "hits all-time high following optimistic market outlook",
      "sees increased institutional interest this week",
    ];

    const generatedNews = Array.from({ length: 6 }).map(() => {
      const company = topics[Math.floor(Math.random() * topics.length)];
      const headline =
        company + " " + sampleHeadlines[Math.floor(Math.random() * sampleHeadlines.length)];
      const timeAgo = Math.floor(Math.random() * 5) + 1 + "h ago";

      return {
        company,
        headline,
        timeAgo,
      };
    });

    setNews(generatedNews);
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow transition-colors duration-300 space-y-6">
      <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
        📈 Reports & Analytics
      </h2>

      {/* Portfolio Performance Chart */}
      <div className="bg-gray-100 dark:bg-gray-800/70 p-6 rounded-xl border border-gray-300/30 dark:border-gray-700/50 shadow">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              formatter={(v) => `₹${v.toLocaleString()}`}
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
                color: "#E2E8F0",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm italic">
          *Simulated monthly portfolio value (for visualization only)
        </p>
      </div>

      {/* Random Stock News Section */}
      <div className="bg-gray-100 dark:bg-gray-800/70 p-6 rounded-xl border border-gray-300/30 dark:border-gray-700/50 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          📰 Market Highlights
        </h3>

        <div className="space-y-3">
          {news.map((n, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 px-4 py-3 rounded-lg hover:bg-gray-200/60 dark:hover:bg-gray-700/50 transition"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {n.headline}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {n.timeAgo} • Source: FinScope News AI
                </p>
              </div>
              <span className="text-sm px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300">
                {n.company}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          *Generated news for display — not actual financial advice.
        </p>
      </div>
    </div>
  );
}
