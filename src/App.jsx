import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { Wallet, TrendingUp, ArrowDownRight, Bell, Search, Filter, CreditCard } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MOCK_DATA } from './data';

export default function App() {
  const [view, setView] = useState('Overview'); // Global view state
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter logic for transactions
  const filteredTransactions = MOCK_DATA.transactions.filter(tx => {
    const matchesFilter = filterType === 'all' || tx.type === filterType;
    const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar with dynamic setView */}
      <Sidebar currentView={view} setView={setView} />
      
      <main className="flex-1 ml-64 p-10">
        {/* TOP BAR */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {view === 'Overview' ? `Hi, ${MOCK_DATA.user.name} 👋` : view}
            </h1>
            <p className="text-slate-500 font-medium">Dashboard / {view}</p>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-blue-50 transition-all w-72 shadow-sm" 
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all relative">
               <Bell size={20} />
               <span className="absolute top-3 right-3 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* VIEW CONDITIONAL RENDERING */}
        {view === 'Overview' && (
          <>
            {/* STATS - Clicking these filters the table below */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div onClick={() => setFilterType('all')} className="cursor-pointer">
                <StatCard title="Total Balance" value="$42,500" subtext="+12% vs last month" icon={Wallet} delay={0.1} />
              </div>
              <div onClick={() => setFilterType('income')} className="cursor-pointer">
                <StatCard title="Total Income" value="$12,400" subtext="+8% vs last month" icon={TrendingUp} delay={0.2} />
              </div>
              <div onClick={() => setFilterType('expense')} className="cursor-pointer">
                <StatCard title="Total Expenses" value="$3,200" subtext="-2% vs last month" icon={ArrowDownRight} delay={0.3} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* ANALYTICS PREVIEW */}
              <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">Activity Report</h3>
                  <button onClick={() => setView('Analytics')} className="text-blue-600 font-bold text-sm hover:underline">Full Analytics →</button>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_DATA.chartData.all}>
                      <defs>
                        <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                      <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                      <Area type="monotone" dataKey="income" stroke="#2563EB" strokeWidth={4} fill="url(#colorBlue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* DYNAMIC TRANSACTION LIST */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">Transactions</h3>
                  <span className="text-xs bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-500 uppercase tracking-widest">{filterType}</span>
                </div>
                <div className="space-y-6">
                  {filteredTransactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-transform group-hover:scale-110 ${tx.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {tx.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{tx.name}</p>
                          <p className="text-xs text-slate-400 font-medium">{tx.date} • {tx.category}</p>
                        </div>
                      </div>
                      <p className={`font-black ${tx.type === 'income' ? 'text-green-600' : 'text-slate-900'}`}>
                        {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount)}
                      </p>
                    </div>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <p className="text-center text-slate-400 py-10 font-medium">No records found</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {view === 'Balances' && (
          <div className="bg-white p-10 rounded-[2.5rem] text-center border border-dashed border-slate-300">
            <CreditCard size={48} className="mx-auto mb-4 text-slate-300" />
            <h2 className="text-2xl font-bold">Card Management</h2>
            <p className="text-slate-500 max-w-md mx-auto mt-2">In the full version, you would link your bank accounts and manage physical cards here.</p>
          </div>
        )}

        {view === 'Analytics' && (
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100">
            <h2 className="text-2xl font-bold mb-8">Deep Dive Analysis</h2>
            <div className="h-[400px]">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={MOCK_DATA.chartData.all}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="name" />
                   <Tooltip />
                   <Bar dataKey="income" fill="#2563EB" radius={[10, 10, 0, 0]} />
                   <Bar dataKey="expense" fill="#F87171" radius={[10, 10, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}