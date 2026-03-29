import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Shield, 
  Zap, 
  Cpu, 
  BarChart3, 
  MessageSquare, 
  Calendar, 
  Users,
  ChevronRight,
  Globe,
  Facebook,
  Instagram
} from 'lucide-react';

import Dashboard from './components/Dashboard';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen hero-gradient">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-morphism py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center glow-purple">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">AetherReach <span className="text-primary">AI</span></span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
            <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
            <a href="#docs" className="hover:text-primary transition-colors">Documentation</a>
          </div>
          <button className="px-6 py-2 bg-primary hover:bg-accent text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-primary/20">
            Launch Engine
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-2 rounded-full glass-morphism text-primary text-xs font-bold tracking-widest uppercase mb-6 inline-block">
              v1.0.0 Now Live • Enterprise-Grade Intelligence
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight">
              Scale Your Sales <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">With Autonomous AI</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              AetherReach AI qualifies, engages, and schedules leads across global channels in under 60 seconds. High-performance sales intelligence on auto-pilot.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <button className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:scale-105 transition-transform glow-purple">
                <span>Start Free Trial</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="w-full md:w-auto px-8 py-4 glass-morphism text-white rounded-2xl font-bold hover:bg-white/10 transition-colors">
                Book Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "60s Response", desc: "Never lose a lead again. AI responds to every inbound query instantly across Email and SMS." },
              { icon: Shield, title: "Smart Qualification", desc: "Automated scoring based on intent, urgency, and predicted lifetime value." },
              { icon: Calendar, title: "Auto Scheduling", desc: "Seamlessly integrates with your calendar to book qualified meetings 24/7." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 glass-morphism rounded-3xl"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" className="py-20 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="glass-morphism rounded-[3rem] p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -mr-48 -mt-48 transition-all"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: "Response Time", val: "< 60s" },
                { label: "Conversion Lift", val: "+35%" },
                { label: "Leads Processed", val: "10M+" },
                { label: "ROI Delivered", val: "22x" }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.val}</p>
                  <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Engine Preview Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Autonomous Intelligence in Action</h2>
            <p className="text-slate-400">Sneak peak into the AetherReach control center</p>
            <button 
              onClick={() => setShowDashboard(!showDashboard)}
              className="mt-6 px-6 py-3 bg-white/5 hover:bg-white/10 text-primary rounded-xl font-bold transition-all border border-primary/20"
            >
              {showDashboard ? "Hide Engine Preview" : "Show Engine Preview"}
            </button>
          </div>
          
          {showDashboard && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-morphism rounded-[3rem] p-4 md:p-8"
            >
              <Dashboard />
            </motion.div>
          )}
        </div>
      </section>

      {/* Solutions / Multi-Model Section */}
      <section id="solutions" className="py-20 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Powered by Multi-Model <br />
              <span className="text-primary">Intelligence</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              AetherReach AI doesn't just use one model. It dynamically routes tasks to GPT-4o, Claude 3.5, or Gemini depending on the complexity of the lead engagement.
            </p>
            <ul className="space-y-4">
              {[
                "Adaptive Context Awareness",
                "Cross-Channel Conversation Sync",
                "Sentiment Analysis & Intent Prediction",
                "Enterprise Security & Compliance"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-300 space-x-3">
                  <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 glass-morphism p-8 rounded-4xl border-primary/20 relative group">
             <div className="absolute inset-0 bg-primary/5 rounded-4xl group-hover:bg-primary/10 transition-colors"></div>
             <BarChart3 className="w-64 h-64 text-primary/20 mx-auto" />
             <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary glow-purple"></div>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-accent"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center md:text-left">
            <div>
              <div className="flex items-center space-x-2 mb-4 justify-center md:justify-start">
                <Cpu className="text-primary w-6 h-6" />
                <span className="text-xl font-bold text-white">AetherReach AI</span>
              </div>
              <p className="text-slate-500 max-w-sm">
                The future of autonomous sales engagement. Built for high-volume high-growth teams.
              </p>
            </div>
            <div className="flex space-x-6 text-slate-400">
              <Globe className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
              <Facebook className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
              <Instagram className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between text-slate-600 text-sm italic items-center">
            <p>© 2026 AetherReach AI. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
