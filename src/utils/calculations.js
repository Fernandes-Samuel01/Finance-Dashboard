export const calculateStats = (transactions) => {
  const income = transactions
    .filter(tx => tx.type === 'income')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => acc + Math.abs(tx.amount), 0);

  const balance = income - expenses;

  // ✅ ADD THIS (basic growth logic)
  const growth = expenses === 0 ? 0 : ((income - expenses) / expenses) * 100;

  return {
    income,
    expenses,
    balance,
    growth: growth.toFixed(1)
  };
};