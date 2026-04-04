import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { Wallet, TrendingUp, ArrowDownRight, Bell, Search, CreditCard } from 'lucide-react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MOCK_DATA } from './data';
import { calculateStats } from './utils/calculations';
import { Insights } from './components/Insights';
import { TransactionTable } from './components/TransactionTable';

export default function App() {
  const [view, setView] = useState('Overview');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const now = new Date();

  // ✅ FINAL FILTER LOGIC (REAL DATE FILTER)
  const filteredTransactions = MOCK_DATA.transactions.filter(tx => {
    const txDate = new Date(tx.date);

    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesDate = true;

    if (dateFilter === '7d') {
      const last7 = new Date();
      last7.setDate(now.getDate() - 7);
      matchesDate = txDate >= last7;
    }

    if (dateFilter === '30d') {
      const last30 = new Date();
      last30.setDate(now.getDate() - 30);
      matchesDate = txDate >= last30;
    }

    return matchesType && matchesSearch && matchesDate;
  });

  // ✅ STATS
  const stats = calculateStats(filteredTransactions);

  // ✅ CHART DATA
  const chartData = filteredTransactions.map(tx => ({
    name: new Date(tx.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    income: tx.type === 'income' ? tx.amount : 0,
    expense: tx.type === 'expense' ? Math.abs(tx.amount) : 0
  }));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar currentView={view} setView={setView} />

      <main className="flex-1 ml-64 p-10">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              {view === 'Overview' ? `Hi, ${MOCK_DATA.user.name} 👋` : view}
            </h1>
            <p className="text-slate-500">Dashboard / {view}</p>
          </div>

          <div className="flex items-center gap-5">

            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 border rounded-2xl w-64"
              />
            </div>

            {/* ✅ DATE FILTER */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 border rounded-2xl"
            >
              <option value="all">All Time</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>

            {/* NOTIFICATION */}
            <button className="p-3 border rounded-2xl relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* OVERVIEW */}
        {view === 'Overview' && (
          <>
            {/* ✅ STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div onClick={() => setFilterType('all')}>
                <StatCard title="Total Balance" value={`$${stats.balance}`} subtext={`${stats.growth}%`} icon={Wallet} />
              </div>
              <div onClick={() => setFilterType('income')}>
                <StatCard title="Total Income" value={`$${stats.income}`} subtext={`${stats.growth}%`} icon={TrendingUp} />
              </div>
              <div onClick={() => setFilterType('expense')}>
                <StatCard title="Total Expenses" value={`$${stats.expenses}`} subtext={`${stats.growth}%`} icon={ArrowDownRight} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* ✅ CHART */}
              <div className="lg:col-span-2 bg-white p-8 rounded-2xl border">
                <h3 className="mb-6 font-bold">Activity</h3>

                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#2563EB"
                      fillOpacity={0.1}
                      onClick={() => setFilterType('income')}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* ✅ TRANSACTION LIST */}
              <div className="bg-white p-8 rounded-2xl border">
                <h3 className="mb-6 font-bold">Recent</h3>

                {filteredTransactions.map(tx => (
                  <div key={tx.id} className="flex justify-between mb-4">
                    <div>
                      <p className="font-bold">{tx.name}</p>
                      <p className="text-xs text-slate-400">{tx.category}</p>
                    </div>
                    <p className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {tx.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ INSIGHTS */}
            <Insights transactions={filteredTransactions} />

            {/* ✅ FULL TABLE */}
            <TransactionTable transactions={filteredTransactions} />
          </>
        )}

        {/* BALANCES */}
        {view === 'Balances' && (
          <div className="bg-white p-10 text-center border rounded-2xl">
            <CreditCard size={48} className="mx-auto mb-4 text-slate-300" />
            <h2 className="text-xl font-bold">Card Management</h2>
          </div>
        )}

        {/* ANALYTICS */}
        {view === 'Analytics' && (
          <div className="bg-white p-10 rounded-2xl border">
            <h2 className="mb-6 font-bold">Analytics</h2>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="income" fill="#2563EB" />
                <Bar dataKey="expense" fill="#F87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

      </main>
    </div>
  );
}