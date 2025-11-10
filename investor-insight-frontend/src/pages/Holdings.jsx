import { useEffect, useState } from "react";

export default function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [livePrices, setLivePrices] = useState({});
  const [newHolding, setNewHolding] = useState({
    assetName: "",
    type: "Stock",
    quantity: 0,
    purchasePrice: 0,
  });

  // Fetch holdings
  useEffect(() => {
    fetch("http://localhost:8080/api/holdings")
      .then((res) => res.json())
      .then((data) => {
        setHoldings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
        setLoading(false);
      });
  }, []);

  // Fetch live / simulated prices
  useEffect(() => {
    async function fetchPrices() {
      const prices = {};
      holdings.forEach((h) => {
        // For stocks: random ±5–20 range change
        const variation =
          h.type.toLowerCase() === "crypto"
            ? 1 + (Math.random() - 0.5) * 0.15
            : 1 + (Math.random() - 0.5) * 0.05;

        prices[h.assetName] = parseFloat(
          (h.purchasePrice * variation).toFixed(2)
        );
      });
      setLivePrices(prices);
    }

    if (holdings.length > 0) fetchPrices();
  }, [holdings]);

  // Add new holding
  const handleAdd = async () => {
    if (!newHolding.assetName || !newHolding.purchasePrice || !newHolding.quantity)
      return alert("Please fill all fields before adding.");

    const res = await fetch("http://localhost:8080/api/holdings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHolding),
    });

    const saved = await res.json();
    setHoldings([...holdings, saved]);

    // Reset form
    setNewHolding({ assetName: "", type: "Stock", quantity: 0, purchasePrice: 0 });
  };

  // Delete holding
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/holdings/${id}`, { method: "DELETE" });
    setHoldings(holdings.filter((h) => h.id !== id));
  };

  if (loading) return <p>Loading holdings...</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-lg transition-all duration-300">
      <h2 className="text-3xl font-semibold mb-6">Holdings Overview</h2>

      {/* Add New Holding Section */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="e.g. Bitcoin"
          className="border rounded-md px-3 py-2 w-40 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={newHolding.assetName}
          onChange={(e) =>
            setNewHolding({ ...newHolding, assetName: e.target.value })
          }
        />
        <select
          className="border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={newHolding.type}
          onChange={(e) =>
            setNewHolding({ ...newHolding, type: e.target.value })
          }
        >
          <option>Stock</option>
          <option>Crypto</option>
          <option>Bond</option>
          <option>MutualFund</option>
        </select>
        <input
          type="number"
          placeholder="Quantity"
          className="border rounded-md px-3 py-2 w-28 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={newHolding.quantity}
          onChange={(e) =>
            setNewHolding({ ...newHolding, quantity: parseFloat(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Buy Price (₹)"
          className="border rounded-md px-3 py-2 w-32 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={newHolding.purchasePrice}
          onChange={(e) =>
            setNewHolding({ ...newHolding, purchasePrice: parseFloat(e.target.value) })
          }
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition font-semibold"
        >
          Add
        </button>
      </div>

      {/* Holdings Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-300/20 dark:border-gray-700/50">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800/80">
            <tr className="text-left text-gray-700 dark:text-gray-300">
              <th className="border-b p-3">Asset Name</th>
              <th className="border-b p-3">Type</th>
              <th className="border-b p-3">Quantity</th>
              <th className="border-b p-3">Buy Price (₹)</th>
              <th className="border-b p-3">Live Price (₹)</th>
              <th className="border-b p-3">Profit / Loss</th>
              <th className="border-b p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => {
              const live = livePrices[h.assetName] || 0;
              const pl = (live - h.purchasePrice) * h.quantity;
              const plColor =
                pl >= 0
                  ? "text-green-400 font-semibold"
                  : "text-red-400 font-semibold";

              return (
                <tr
                  key={h.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                >
                  <td className="border-b p-3">{h.assetName}</td>
                  <td className="border-b p-3">{h.type}</td>
                  <td className="border-b p-3">{h.quantity}</td>
                  <td className="border-b p-3">₹{h.purchasePrice}</td>
                  <td className="border-b p-3">₹{live}</td>
                  <td className={`border-b p-3 ${plColor}`}>
                    {pl >= 0 ? "+" : ""}
                    {pl.toFixed(2)}
                  </td>
                  <td className="border-b p-3 text-center space-x-2">
                    <button className="px-2 py-1 rounded-md bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold transition">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(h.id)}
                      className="px-2 py-1 rounded-md bg-red-500 hover:bg-red-400 text-white font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
