import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/account/balance", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBalance(res.data.balance))
    .catch(() => setBalance(0))
    .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

        {/* Balance card */}
        <div className="bg-indigo-600 text-white rounded-xl p-6 mb-6 shadow">
          <p className="text-sm text-indigo-200 mb-1">Available Balance</p>
          {loading ? (
            <p className="text-3xl font-bold">Loading...</p>
          ) : (
            <p className="text-4xl font-bold">₹{Number(balance).toLocaleString("en-IN")}</p>
          )}
          <p className="text-indigo-200 text-sm mt-1">Savings Account</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/send"
            className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-shadow border border-gray-200 text-center"
          >
            <p className="text-2xl mb-2">💸</p>
            <p className="font-semibold text-gray-800">Send Money</p>
            <p className="text-sm text-gray-500 mt-1">Transfer funds instantly</p>
          </Link>

          <Link
            to="/statement"
            className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-shadow border border-gray-200 text-center"
          >
            <p className="text-2xl mb-2">📄</p>
            <p className="font-semibold text-gray-800">View Statement</p>
            <p className="text-sm text-gray-500 mt-1">See transaction history</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
