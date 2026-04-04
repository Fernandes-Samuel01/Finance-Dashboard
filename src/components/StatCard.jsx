// src/components/StatCard.jsx
import { motion } from 'framer-motion';

export const StatCard = ({ title, value, subtext, icon: Icon, delay = 0 }) => (
  <motion.div 
    // This is where motion is used
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-default"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
        {/* Using the Icon prop here */}
        <Icon size={22} />
      </div>
      <div className="h-2 w-8 bg-slate-50 rounded-full" />
    </div>
    
    <div>
      <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-black mt-1 text-slate-900 tracking-tight">{value}</h3>
      <div className="flex items-center gap-2 mt-3">
        <span className="flex items-center text-xs font-bold px-2 py-1 bg-green-50 text-green-600 rounded-lg">
          {subtext.split(' ')[0]}
        </span>
        <span className="text-[10px] text-slate-400 font-medium uppercase italic">
          {subtext.split(' ').slice(1).join(' ')}
        </span>
      </div>
    </div>
  </motion.div>
);