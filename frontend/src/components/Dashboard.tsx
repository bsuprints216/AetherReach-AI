import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, Zap, Clock, TrendingUp, Search, PlayCircle, ChevronRight, X } from 'lucide-react';
import AIInsight from './AIInsight';

const Dashboard = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const stats = [
    { label: "Total Leads", value: isSimulating ? "2,544" : "2,543", icon: Users, color: "text-blue-500" },
    { label: "Qualified", value: "1,204", icon: Target, color: "text-primary" },
    { label: "AI Response", value: "99.8%", icon: Zap, color: "text-amber-500" },
    { label: "Avg. Speed", value: "42s", icon: Clock, color: "text-emerald-500" },
  ];

  const leads = [
    { name: "Ismail Sajid", company: "AetherBridge", score: 98, status: "High Priority", time: "2m ago" },
    { name: "Sarah Connor", company: "Cyberdyne", score: 92, status: "Qualified", time: "15m ago" },
    { name: "Bruce Wayne", company: "Wayne Ent.", score: 85, status: "Follow-up", time: "1h ago" },
    { name: "John Doe", company: "Unknown", score: 42, status: "Low Priority", time: "3h ago" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Intelligence Dashboard</h2>
          <p className="text-slate-400">Real-time autonomous lead orchestration</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              setIsSimulating(true);
              setTimeout(() => setIsSimulating(false), 3000);
            }}
            disabled={isSimulating}
            className="flex items-center gap-2 px-6 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-bold hover:bg-primary/30 transition-all disabled:opacity-50"
          >
            <PlayCircle className="w-4 h-4" />
            {isSimulating ? "AI Analyzing..." : "Simulate New Lead"}
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="bg-slate-900 border border-slate-800 rounded-full pl-10 pr-6 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-morphism p-6 rounded-3xl"
          >
            <div className={`p-3 rounded-2xl bg-slate-900 w-fit mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="glass-morphism rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Active Sales Flow
          </h3>
          <button className="text-primary text-sm font-semibold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-6 font-medium">Lead Name</th>
                <th className="p-6 font-medium">Company</th>
                <th className="p-6 font-medium">AI Score</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium">Activity</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr 
                  key={i} 
                  onClick={() => setSelectedLead(lead)}
                  className="border-t border-slate-800/50 hover:bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-white font-medium group-hover:text-primary transition-colors">{lead.name}</span>
                    </div>
                  </td>
                  <td className="p-6 text-slate-400 text-sm">{lead.company}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${lead.score}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-300">{lead.score}%</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      lead.status === 'High Priority' ? 'bg-primary/20 text-primary' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-6 text-slate-500 text-xs italic">{lead.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Panel / AI Insight */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedLead(null)}
               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed right-0 top-0 h-screen w-full md:w-[450px] bg-slate-950 border-l border-slate-800 z-[70] shadow-2xl overflow-y-auto"
            >
               <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/80 backdrop-blur sticky top-0">
                  <h3 className="font-bold text-white uppercase text-xs tracking-widest">Lead Intelligence Detail</h3>
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
               </div>
               <AIInsight lead={selectedLead} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
