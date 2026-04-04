export const Insights = ({ transactions }) => {
  const income = transactions.filter(tx => tx.type === 'income');
  const expenses = transactions.filter(tx => tx.type === 'expense');

  const totalIncome = income.reduce((a, b) => a + b.amount, 0);
  const totalExpense = expenses.reduce((a, b) => a + Math.abs(b.amount), 0);

  const categoryMap = {};
  expenses.forEach(tx => {
    categoryMap[tx.category] = (categoryMap[tx.category] || 0) + Math.abs(tx.amount);
  });

  const highestCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="bg-white p-6 rounded-2xl border">
      <h3 className="font-bold mb-4">Smart Insights</h3>

      <p className="text-sm text-slate-600">
        💸 You spent most on <b>{highestCategory?.[0]}</b>
      </p>

      <p className="text-sm text-slate-600 mt-2">
        📈 Income: <b>${totalIncome}</b>
      </p>

      <p className="text-sm text-slate-600 mt-2">
        📉 Expenses: <b>${totalExpense}</b>
      </p>

      <p className="text-sm text-slate-600 mt-2">
        💰 Net: <b>${totalIncome - totalExpense}</b>
      </p>
    </div>
  );
};