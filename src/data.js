// src/data.js

const today = new Date();

// helper to generate dynamic dates
const getDate = (daysAgo) => {
  const d = new Date();
  d.setDate(today.getDate() - daysAgo);
  return d.toISOString();
};

export const MOCK_DATA = {
  user: { name: "Samuel", currency: "USD", avatar: "S" },

  // ⚠️ stats & chartData are now unused but kept if needed
  stats: {},
  chartData: {},

  transactions: [
    { id: 1, name: 'Apple Store', category: 'Tech', amount: -999, type: 'expense', date: getDate(1), status: 'Completed' },
    { id: 2, name: 'Salary Drop', category: 'Income', amount: 5500, type: 'income', date: getDate(2), status: 'Completed' },
    { id: 3, name: 'Netflix', category: 'Entertainment', amount: -15, type: 'expense', date: getDate(3), status: 'Pending' },
    { id: 4, name: 'Freelance Project', category: 'Income', amount: 1200, type: 'income', date: getDate(5), status: 'Completed' },
    { id: 5, name: 'Starbucks', category: 'Food', amount: -12, type: 'expense', date: getDate(10), status: 'Completed' },
    { id: 6, name: 'Groceries', category: 'Food', amount: -120, type: 'expense', date: getDate(15), status: 'Completed' },
    { id: 7, name: 'Gym Membership', category: 'Health', amount: -60, type: 'expense', date: getDate(20), status: 'Completed' },
    { id: 8, name: 'Bonus', category: 'Income', amount: 2000, type: 'income', date: getDate(25), status: 'Completed' }
  ]
};