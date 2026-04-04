import { useState } from "react";

export const TransactionTable = ({ transactions }) => {
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

      <table className="w-full text-sm">
        <thead className="text-slate-400">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};