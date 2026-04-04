export const MOCK_DATA = {
  user: { name: "Samuel", currency: "USD", avatar: "S" },
  stats: {
    balance: { value: 42500.50, trend: "+12.5%", color: "text-blue-600" },
    income: { value: 12400.00, trend: "+8.2%", color: "text-green-600" },
    expenses: { value: 3200.00, trend: "-2.1%", color: "text-red-600" }
  },
  chartData: {
    all: [
      { name: 'Mon', income: 4000, expense: 2400 },
      { name: 'Tue', income: 3000, expense: 1398 },
      { name: 'Wed', income: 5000, expense: 3800 },
      { name: 'Thu', income: 2780, expense: 3908 },
      { name: 'Fri', income: 1890, expense: 4800 },
    ],
    incomeOnly: [
      { name: 'Mon', value: 4000 }, { name: 'Tue', value: 3000 }, { name: 'Wed', value: 5000 }
    ]
  },
  transactions: [
    { id: 1, name: 'Apple Store', category: 'Tech', amount: -999, type: 'expense', date: 'Oct 24', status: 'Completed' },
    { id: 2, name: 'Salary Drop', category: 'Income', amount: 5500, type: 'income', date: 'Oct 23', status: 'Completed' },
    { id: 3, name: 'Netflix', category: 'Entertainment', amount: -15, type: 'expense', date: 'Oct 22', status: 'Pending' },
    { id: 4, name: 'Freelance Project', category: 'Income', amount: 1200, type: 'income', date: 'Oct 21', status: 'Completed' },
    { id: 5, name: 'Starbucks', category: 'Food', amount: -12, type: 'expense', date: 'Oct 20', status: 'Completed' },
  ]
};