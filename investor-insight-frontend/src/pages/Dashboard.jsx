// import { useEffect, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";

// export default function Dashboard() {
//   const [holdings, setHoldings] = useState([]);
//   const [summary, setSummary] = useState({
//     totalInvestment: 0,
//     currentValue: 0,
//     profitLoss: 0,
//     profitPercent: 0,
//   });

//   useEffect(() => {
//     fetch("http://localhost:8080/api/holdings")
//       .then((res) => res.json())
//       .then((data) => {
//         setHoldings(data);

//         const totalInvestment = data.reduce(
//           (sum, h) => sum + h.purchasePrice * h.quantity,
//           0
//         );
//         const currentValue = data.reduce((sum, h) => {
//           const randomChange =
//             h.type === "Crypto"
//               ? 1 + (Math.random() - 0.5) * 0.2
//               : 1 + (Math.random() - 0.5) * 0.05;
//           return sum + h.purchasePrice * randomChange * h.quantity;
//         }, 0);

//         const profitLoss = currentValue - totalInvestment;
//         const profitPercent = (profitLoss / totalInvestment) * 100;

//         setSummary({
//           totalInvestment,
//           currentValue,
//           profitLoss,
//           profitPercent,
//         });
//       });
//   }, []);

//   // Prepare data for pie chart
//   const chartData = holdings.map((h) => ({
//     name: h.assetName,
//     value: h.purchasePrice * h.quantity,
//     type: h.type,
//   }));

//   const COLORS = [
//     "#4ade80", // green
//     "#60a5fa", // blue
//     "#facc15", // yellow
//     "#f87171", // red
//     "#a78bfa", // violet
//     "#34d399", // teal
//   ];

//   // Generate mock performance line chart data
//   const performanceData = Array.from({ length: 8 }, (_, i) => ({
//     month: `M${i + 1}`,
//     portfolio: Math.round(summary.totalInvestment * (1 + Math.random() * 0.1)),
//   }));

//   return (
//     <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-900 dark:text-gray-100 transition-all duration-300 space-y-6">
//       <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
//         🚀 Dashboard Overview
//       </h2>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
//         <div className="p-5 rounded-lg shadow bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-950/40 dark:to-blue-900/30 border border-blue-400/20">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Total Investment
//           </p>
//           <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-1">
//             ₹{summary.totalInvestment.toFixed(2)}
//           </h3>
//         </div>

//         <div className="p-5 rounded-lg shadow bg-gradient-to-r from-green-100 to-green-50 dark:from-green-950/40 dark:to-green-900/30 border border-green-400/20">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Current Value
//           </p>
//           <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">
//             ₹{summary.currentValue.toFixed(2)}
//           </h3>
//         </div>

//         <div className="p-5 rounded-lg shadow bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-950/40 dark:to-yellow-900/30 border border-yellow-400/20">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Profit / Loss
//           </p>
//           <h3
//             className={`text-2xl font-semibold mt-1 ${
//               summary.profitLoss >= 0 ? "text-green-400" : "text-red-400"
//             }`}
//           >
//             {summary.profitLoss >= 0 ? "+" : "-"}₹
//             {Math.abs(summary.profitLoss).toFixed(2)}
//           </h3>
//         </div>

//         <div className="p-5 rounded-lg shadow bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-950/40 dark:to-purple-900/30 border border-purple-400/20">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Overall Growth
//           </p>
//           <h3
//             className={`text-2xl font-semibold mt-1 ${
//               summary.profitPercent >= 0 ? "text-green-400" : "text-red-400"
//             }`}
//           >
//             {summary.profitPercent.toFixed(2)}%
//           </h3>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Portfolio Composition */}
//         <div className="bg-gray-100 dark:bg-gray-800/60 rounded-lg p-5 border border-gray-300/20 dark:border-gray-700/40">
//           <h3 className="text-xl font-semibold mb-4">📈 Portfolio Composition</h3>
//           {chartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   label
//                   dataKey="value"
//                 >
//                   {chartData.map((_, i) => (
//                     <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-gray-400 italic">No data to show.</p>
//           )}
//         </div>

//         {/* Portfolio Trend */}
//         <div className="bg-gray-100 dark:bg-gray-800/60 rounded-lg p-5 border border-gray-300/20 dark:border-gray-700/40">
//           <h3 className="text-xl font-semibold mb-4">📊 Performance Over Time</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={performanceData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#555" />
//               <XAxis dataKey="month" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="portfolio"
//                 stroke="#3b82f6"
//                 strokeWidth={2}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//  {/* Enhanced Holdings Summary with Logos */}
// <div className="p-5 rounded-lg bg-gray-100 dark:bg-gray-800/60 border border-gray-300/20 dark:border-gray-700/40 shadow-sm">
//   <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//     💼 Holdings Summary
//   </h3>

//   {holdings.length === 0 ? (
//     <p className="text-gray-500 dark:text-gray-400 italic">
//       No holdings available.
//     </p>
//   ) : (
//     <div className="overflow-x-auto rounded-lg border border-gray-700/30">
//       <table className="min-w-full text-sm">
//         <thead className="bg-gray-200 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wide">
//           <tr>
//             <th className="py-3 px-4 text-left">Asset</th>
//             <th className="py-3 px-4 text-left">Type</th>
//             <th className="py-3 px-4 text-right">Qty</th>
//             <th className="py-3 px-4 text-right">Buy Price (₹)</th>
//             <th className="py-3 px-4 text-right">Value (₹)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {holdings.map((h, i) => {
//             const totalValue = (h.purchasePrice * h.quantity).toFixed(2);

//             // Small emoji/icon based on type or name
//             const iconMap = {
//               bitcoin: "🪙",
//               ethereum: "💎",
//               tesla: "🚗",
//               apple: "🍎",
//               netflix: "🎬",
//               nvidia: "💻",
//               infosys: "🏢",
//               reliance: "🏭",
//               bond: "🏦",
//               nifty: "📈",
//               mutualfund: "📊",
//               default: "💠",
//             };

//             const nameKey = h.assetName?.toLowerCase().replace(/\s+/g, "");
//             const assetIcon =
//               iconMap[nameKey] || iconMap[h.type?.toLowerCase()] || iconMap.default;

//             const typeColor =
//               h.type === "Stock"
//                 ? "text-blue-400"
//                 : h.type === "Crypto"
//                 ? "text-yellow-400"
//                 : h.type === "Bond"
//                 ? "text-green-400"
//                 : "text-purple-400";

//             const rowBg =
//               i % 2 === 0
//                 ? "bg-gray-50 dark:bg-gray-800/40"
//                 : "bg-white/5 dark:bg-gray-800/20";

//             return (
//               <tr
//                 key={h.id}
//                 className={`${rowBg} hover:bg-gray-200/70 dark:hover:bg-gray-700/50 transition`}
//               >
//                 <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-100 flex items-center gap-2">
//                   <span className="text-lg">{assetIcon}</span> {h.assetName}
//                 </td>
//                 <td className={`py-3 px-4 font-semibold ${typeColor}`}>
//                   {h.type}
//                 </td>
//                 <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
//                   {h.quantity}
//                 </td>
//                 <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
//                   ₹{h.purchasePrice.toLocaleString()}
//                 </td>
//                 <td className="py-3 px-4 text-right font-semibold text-green-400">
//                   ₹{parseFloat(totalValue).toLocaleString()}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   )}

//   {/* Summary Footer */}
//   <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-600/30 pt-3">
//     <span>Total Holdings: {holdings.length}</span>
//     <span>
//       Overall Value:{" "}
//       <span className="text-green-400 font-semibold">
//         ₹
//         {holdings
//           .reduce((sum, h) => sum + h.purchasePrice * h.quantity, 0)
//           .toLocaleString()}
//       </span>
//     </span>
//   </div>
// </div>

//     </div>
//   );
// }
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [holdings, setHoldings] = useState([]);
  const [summary, setSummary] = useState({
    totalInvestment: 0,
    currentValue: 0,
    profitLoss: 0,
    profitPercent: 0,
  });
  const [chartData, setChartData] = useState([]);

  const COLORS = [
    "#4F46E5", // violet
    "#10B981", // green
    "#F59E0B", // yellow
    "#EF4444", // red
    "#3B82F6", // blue
    "#A855F7", // purple
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/holdings")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((h) => ({
          id: h.id,
          assetName: h.asset_name || h.assetName || "Unnamed",
          type: h.type || "Unknown",
          quantity: Number(h.quantity) || 0,
          purchasePrice:
            Number(h.purchase_price || h.purchasePrice || 0) || 0,
        }));

        setHoldings(normalized);

        // 💰 Calculate investment summaries
        const totalInvestment = normalized.reduce(
          (sum, h) => sum + h.purchasePrice * h.quantity,
          0
        );
        const currentValue = normalized.reduce((sum, h) => {
          const randomChange =
            h.type === "Crypto"
              ? 1 + (Math.random() - 0.5) * 0.2
              : 1 + (Math.random() - 0.5) * 0.05;
          return sum + h.purchasePrice * randomChange * h.quantity;
        }, 0);
        const profitLoss = currentValue - totalInvestment;
        const profitPercent =
          totalInvestment > 0
            ? (profitLoss / totalInvestment) * 100
            : 0;

        setSummary({
          totalInvestment,
          currentValue,
          profitLoss,
          profitPercent,
        });

        // 📊 Build Pie Chart Data
        const typeMap = {};
        normalized.forEach((h) => {
          const value = h.purchasePrice * h.quantity;
          typeMap[h.type] = (typeMap[h.type] || 0) + value;
        });
        const chart = Object.entries(typeMap).map(([name, value]) => ({
          name,
          value,
        }));
        setChartData(chart);
      });
  }, []);

  // 📈 Mock portfolio trend data
  const performanceData = Array.from({ length: 8 }, (_, i) => ({
    month: `M${i + 1}`,
    portfolio: Math.round(
      summary.totalInvestment * (1 + Math.random() * 0.1)
    ),
  }));

  return (
    <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-900 dark:text-gray-100 transition-all duration-300 space-y-6">
      <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
        🚀 FinScope Dashboard
      </h2>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-5 rounded-lg shadow bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-950/40 dark:to-blue-900/30 border border-blue-400/20">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Total Investment
          </p>
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-1">
            ₹{summary.totalInvestment.toFixed(2)}
          </h3>
        </div>

        <div className="p-5 rounded-lg shadow bg-gradient-to-r from-green-100 to-green-50 dark:from-green-950/40 dark:to-green-900/30 border border-green-400/20">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Current Value
          </p>
          <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">
            ₹{summary.currentValue.toFixed(2)}
          </h3>
        </div>

        <div className="p-5 rounded-lg shadow bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-950/40 dark:to-yellow-900/30 border border-yellow-400/20">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Profit / Loss
          </p>
          <h3
            className={`text-2xl font-semibold mt-1 ${
              summary.profitLoss >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {summary.profitLoss >= 0 ? "+" : "-"}₹
            {Math.abs(summary.profitLoss).toFixed(2)}
          </h3>
        </div>

        <div className="p-5 rounded-lg shadow bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-950/40 dark:to-purple-900/30 border border-purple-400/20">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Overall Growth
          </p>
          <h3
            className={`text-2xl font-semibold mt-1 ${
              summary.profitPercent >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {summary.profitPercent.toFixed(2)}%
          </h3>
        </div>
      </div>

      {/* 🔸 Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Composition Pie Chart */}
        <div className="bg-gray-100 dark:bg-gray-800/60 rounded-lg p-5 border border-gray-300/20 dark:border-gray-700/40">
          <h3 className="text-xl font-semibold mb-4">📈 Portfolio Composition</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => {
                    const total = chartData.reduce((s, d) => s + d.value, 0);
                    const percent = total
                      ? ((value / total) * 100).toFixed(1)
                      : 0;
                    return `${name} ${percent}%`;
                  }}
                >
                  {chartData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => `₹${v.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    border: "1px solid #334155",
                    color: "#E2E8F0",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 italic">No data to show.</p>
          )}
        </div>

        {/* Line Chart - Performance */}
        <div className="bg-gray-100 dark:bg-gray-800/60 rounded-lg p-5 border border-gray-300/20 dark:border-gray-700/40">
          <h3 className="text-xl font-semibold mb-4">📊 Performance Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 💼 Holdings Summary Table */}
      <div className="p-5 rounded-lg bg-gray-100 dark:bg-gray-800/60 border border-gray-300/20 dark:border-gray-700/40 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          💼 Holdings Summary
        </h3>

        {holdings.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">
            No holdings available.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-700/30">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-200 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wide">
                <tr>
                  <th className="py-3 px-4 text-left">Asset</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-right">Qty</th>
                  <th className="py-3 px-4 text-right">Buy Price (₹)</th>
                  <th className="py-3 px-4 text-right">Value (₹)</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h, i) => {
                  const totalValue = (h.purchasePrice * h.quantity).toFixed(2);

                  const iconMap = {
                    bitcoin: "🪙",
                    ethereum: "💎",
                    tesla: "🚗",
                    apple: "🍎",
                    netflix: "🎬",
                    nvidia: "💻",
                    infosys: "🏢",
                    reliance: "🏭",
                    bond: "🏦",
                    nifty: "📈",
                    mutualfund: "📊",
                    default: "💠",
                  };

                  const nameKey = h.assetName?.toLowerCase().replace(/\s+/g, "");
                  const assetIcon =
                    iconMap[nameKey] ||
                    iconMap[h.type?.toLowerCase()] ||
                    iconMap.default;

                  const typeColor =
                    h.type === "Stock"
                      ? "text-blue-400"
                      : h.type === "Crypto"
                      ? "text-yellow-400"
                      : h.type === "Bond"
                      ? "text-green-400"
                      : "text-purple-400";

                  const rowBg =
                    i % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800/40"
                      : "bg-white/5 dark:bg-gray-800/20";

                  return (
                    <tr
                      key={h.id}
                      className={`${rowBg} hover:bg-gray-200/70 dark:hover:bg-gray-700/50 transition`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <span className="text-lg">{assetIcon}</span>{" "}
                        {h.assetName}
                      </td>
                      <td className={`py-3 px-4 font-semibold ${typeColor}`}>
                        {h.type}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                        {h.quantity}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                        ₹{h.purchasePrice.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-green-400">
                        ₹{parseFloat(totalValue).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary Footer */}
        <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-600/30 pt-3">
          <span>Total Holdings: {holdings.length}</span>
          <span>
            Overall Value:{" "}
            <span className="text-green-400 font-semibold">
              ₹
              {holdings
                .reduce((sum, h) => sum + h.purchasePrice * h.quantity, 0)
                .toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
