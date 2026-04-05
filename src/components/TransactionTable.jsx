import { useState } from "react";

export const TransactionTable = ({ transactions, role }) => {
  const [sortType, setSortType] = useState("date");

  const sorted = [...transactions].sort((a, b) => {
    if (sortType === "amount") return b.amount - a.amount;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="bg-white p-6 rounded-2xl border mt-10">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold">All Transactions</h3>

        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {/* ✅ Admin Add Button */}
      {role === "admin" && (
        <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-xl">
          + Add Transaction
        </button>
      )}

      {/* ✅ EMPTY STATE */}
      {transactions.length === 0 ? (
        <p className="text-center text-slate-400 py-6">
          No transactions found
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-slate-400">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {sorted.map(tx => (
              <tr key={tx.id} className="border-t">
                <td>{tx.name}</td>
                <td>{tx.category}</td>
                <td>{tx.date}</td>
                <td className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                  {tx.amount}
                </td>

                {/* ✅ Admin Actions */}
                {role === "admin" && (
                  <td>
                    <button className="text-blue-600 mr-2">Edit</button>
                    <button className="text-red-600">Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};