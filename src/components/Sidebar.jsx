// src/components/Sidebar.jsx
import { LayoutDashboard, Wallet, PieChart, Settings, LogOut } from 'lucide-react';

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
      active 
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-105' 
        : 'text-slate-400 hover:bg-slate-50 hover:text-blue-600'
    }`}
  >
    <Icon size={22} strokeWidth={active ? 2.5 : 2} />
    <span className="font-bold tracking-tight">{label}</span>
  </div>
);

export const Sidebar = ({ currentView, setView }) => (
  <aside className="w-64 h-screen bg-white border-r border-slate-50 p-8 flex flex-col fixed left-0 top-0 z-50">
    <div className="flex items-center gap-3 mb-12 px-2">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl shadow-lg" />
      <span className="text-2xl font-black text-slate-800 tracking-tighter">Zorvyn</span>
    </div>
    
    <nav className="flex-1 space-y-3">
      <NavItem icon={LayoutDashboard} label="Overview" active={currentView === 'Overview'} onClick={() => setView('Overview')} />
      <NavItem icon={Wallet} label="Balances" active={currentView === 'Balances'} onClick={() => setView('Balances')} />
      <NavItem icon={PieChart} label="Analytics" active={currentView === 'Analytics'} onClick={() => setView('Analytics')} />
      <NavItem icon={Settings} label="Settings" active={currentView === 'Settings'} onClick={() => setView('Settings')} />
    </nav>

    <div className="pt-8 border-t border-slate-100">
      <NavItem icon={LogOut} label="Sign Out" onClick={() => alert('Logged out safely')} />
    </div>
  </aside>
);