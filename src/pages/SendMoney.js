import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function SendMoney() {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/account/users", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data)).catch(() => {});
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!receiver) { setError("Please select a receiver."); return; }
    if (!amount || Number(amount) <= 0) { setError("Enter a valid amount."); return; }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/account/transfer",
        { receiverId: receiver, receiver_id: receiver, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Money sent successfully!");
      setReceiver("");
      setAmount("");
    } catch (err) {
      setError(err.response?.data?.message || "Transfer failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-8">
        <Link to="/dashboard" className="text-sm text-indigo-600 hover:underline mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Send Money</h2>

          {success && (
            <div className="bg-green-50 text-green-700 border border-green-200 rounded-lg px-4 py-3 mb-4 text-sm">
              ✅ {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Receiver</label>
              <select
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">-- Select a user --</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                min="1"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Money"}
            </button>
          </form>
        </div>


        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-700">
          ⚠️ Double-check the receiver before sending. Transfers cannot be reversed.
        </div>
      </div>
    </div>
  );
}

export default SendMoney;
