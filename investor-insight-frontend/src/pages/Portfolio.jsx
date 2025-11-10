// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// export default function Portfolio() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/holdings")
//       .then((res) => res.json())
//       .then((holdings) => {
//         const typeMap = {};
//         holdings.forEach((h) => {
//           const value = h.purchasePrice * h.quantity;
//           typeMap[h.type] = (typeMap[h.type] || 0) + value;
//         });

//         const chartData = Object.entries(typeMap).map(([name, value]) => ({
//           name,
//           value,
//         }));
//         setData(chartData);
//       });
//   }, []);

//   const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow transition-colors duration-300">
//       <h2 className="text-2xl font-semibold mb-4">Portfolio Breakdown</h2>

//       {data.length === 0 ? (
//         <p>No data available</p>
//       ) : (
//         <ResponsiveContainer width="100%" height={350}>
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               outerRadius={130}
//               fill="#8884d8"
//               dataKey="value"
//               label
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Portfolio() {
  const [holdings, setHoldings] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

  // ✅ Fetch holdings and build chart data
  useEffect(() => {
    fetch("http://localhost:8080/api/holdings")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Holdings fetched:", data);
        const normalized = data.map((h) => ({
          id: h.id,
          asset_name: h.asset_name || h.assetName || "Unnamed",
          type: h.type || "Unknown",
          quantity: Number(h.quantity) || 0,
          purchase_price:
            Number(h.purchase_price || h.purchasePrice || 0) || 0,
        }));

        setHoldings(normalized);

        // 🧮 Create chart data by grouping holdings by type
        const typeMap = {};
        normalized.forEach((h) => {
          const value = h.purchase_price * h.quantity;
          typeMap[h.type] = (typeMap[h.type] || 0) + value;
        });

        const chart = Object.entries(typeMap).map(([name, value]) => ({
          name,
          value,
        }));
        setChartData(chart);

        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching holdings:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-300 mt-10 text-lg">
        Loading your portfolio...
      </div>
    );

  if (!holdings.length)
    return (
      <div className="text-center text-gray-400 mt-10 text-lg">
        No holdings found in database 🚀
      </div>
    );

  // 💰 Simulate live prices for display in tables
  const simulated = holdings.map((h) => {
    const safePrice = Number(h.purchase_price) || 100;
    const live =
      (h.type?.toLowerCase() || "") === "crypto"
        ? safePrice * (1 + Math.random() * 0.5 - 0.25)
        : safePrice + (Math.random() * 40 - 20);
    return { ...h, livePrice: live };
  });

  // 🧩 Group holdings by type
  const grouped = simulated.reduce((acc, h) => {
    const key = h.type || "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(h);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        📊 Portfolio Overview
      </h1>

      {/* PIE CHART SECTION */}
      <div className="bg-slate-800 rounded-xl p-6 shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">
          Portfolio Breakdown
        </h2>

        {chartData.length === 0 ? (
          <p className="text-gray-400">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => {
                  const total = chartData.reduce((sum, d) => sum + d.value, 0);
                  const percent = total
                    ? ((value / total) * 100).toFixed(1)
                    : 0;
                  return `${name} ${percent}%`;
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
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
        )}
      </div>

      {/* HOLDINGS TABLES */}
      {Object.keys(grouped).map((type) => (
        <div key={type} className="bg-slate-800 p-6 mb-8 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">{type}</h2>
          <table className="min-w-full border border-slate-700 text-sm">
            <thead className="bg-slate-700 text-gray-300">
              <tr>
                <th className="p-2 text-left border border-slate-700">
                  Asset Name
                </th>
                <th className="p-2 text-right border border-slate-700">
                  Quantity
                </th>
                <th className="p-2 text-right border border-slate-700">
                  Buy Price (₹)
                </th>
                <th className="p-2 text-right border border-slate-700">
                  Live Price (₹)
                </th>
                <th className="p-2 text-right border border-slate-700">
                  Total Value (₹)
                </th>
                <th className="p-2 text-right border border-slate-700">P/L</th>
              </tr>
            </thead>
            <tbody>
              {grouped[type].map((a) => {
                const buy = Number(a.purchase_price) || 0;
                const live = Number(a.livePrice) || 0;
                const qty = Number(a.quantity) || 0;
                const total = live * qty;
                const pl = (live - buy) * qty;
                const color = pl >= 0 ? "text-green-400" : "text-red-400";

                return (
                  <tr key={a.id} className="hover:bg-slate-700/40">
                    <td className="p-2 border border-slate-800">
                      {a.asset_name}
                    </td>
                    <td className="p-2 text-right border border-slate-800">
                      {qty}
                    </td>
                    <td className="p-2 text-right border border-slate-800">
                      ₹{buy.toLocaleString()}
                    </td>
                    <td className="p-2 text-right border border-slate-800">
                      ₹{live.toFixed(2)}
                    </td>
                    <td className="p-2 text-right border border-slate-800">
                      ₹{total.toLocaleString()}
                    </td>
                    <td
                      className={`p-2 text-right border border-slate-800 ${color}`}
                    >
                      {pl >= 0 ? "+" : ""}
                      ₹{pl.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}

      <p className="text-center text-sm text-gray-500 mt-10">
        © 2025 FinScope — Smart Portfolio Insights.
      </p>
    </div>
  );
}
