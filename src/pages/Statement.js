import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Statement() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/account/statement", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTransactions(res.data))
    .catch(() => setTransactions([]))
    .finally(() => setLoading(false));
  }, [token]);

  const filtered = filter === "all"
    ? transactions
    : transactions.filter(t => t.transaction_type === filter);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/dashboard" className="text-sm text-indigo-600 hover:underline mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Statement</h2>

        
        <div className="flex gap-2 mb-4">
          {["all", "credit", "debit"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? f === "credit" ? "bg-green-600 text-white"
                  : f === "debit"  ? "bg-red-500 text-white"
                  : "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {f === "all" ? "All" : f === "credit" ? "Credits" : "Debits"}
            </button>
          ))}
        </div>

    
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading transactions...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No transactions found.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">From</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">To</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Balance After</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr
                    key={t.id}
                    className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(t.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric"
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        t.transaction_type === "credit"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {t.transaction_type}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-semibold ${
                      t.transaction_type === "credit" ? "text-green-600" : "text-red-500"
                    }`}>
                      {t.transaction_type === "credit" ? "+" : "-"}₹{Number(t.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{t.sender_id}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{t.receiver_id}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">
                      {t.balance_after != null
                        ? `₹${Number(t.balance_after).toLocaleString("en-IN")}`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Statement;
