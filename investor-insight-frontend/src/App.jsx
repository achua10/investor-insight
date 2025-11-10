import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Holdings from "./pages/Holdings";
import Portfolio from "./pages/Portfolio";
import Reports from "./pages/Reports";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // load preference from localStorage
    return localStorage.getItem("theme") === "dark";
  });

  // ✅ Apply theme class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex transition-colors duration-300 
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
        
        {/* Sidebar */}
        <aside className={`w-56 p-5 flex flex-col justify-between
          ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-500">FinScope</h2>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-blue-400">Dashboard</Link>
              <Link to="/holdings" className="hover:text-blue-400">Holdings</Link>
              <Link to="/portfolio" className="hover:text-blue-400">Portfolio</Link>
              <Link to="/reports" className="hover:text-blue-400">Reports</Link>
            </nav>
          </div>

          {/* ✅ Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`mt-6 px-4 py-2 rounded-md transition-all duration-300 font-medium
              ${darkMode 
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-300" 
                : "bg-gray-300 hover:bg-gray-400 text-gray-800"}`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
