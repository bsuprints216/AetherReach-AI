import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';

interface AIInsightProps {
  lead: {
    name: string;
    company: string;
    score: number;
    sentiment?: string;
    intent?: string;
    summary?: string;
  };
}

const AIInsight = ({ lead }: AIInsightProps) => {
  const getSentimentColor = (s?: string) => {
    if (s === 'Positive') return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (s === 'Negative') return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">AI Sales Intelligence</h3>
        </div>
        <div className="px-3 py-1 glass-morphism rounded-full flex items-center gap-2 border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live Reasoning</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-2xl border ${getSentimentColor(lead.sentiment)}`}>
           <p className="text-[10px] uppercase tracking-wider font-bold opacity-60 mb-1">Sentiment</p>
           <p className="font-bold">{lead.sentiment || 'Neutral'}</p>
        </div>
        <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 text-primary">
           <p className="text-[10px] uppercase tracking-wider font-bold opacity-60 mb-1">Predicted Intent</p>
           <p className="font-bold">{lead.intent || 'Potential Demo'}</p>
        </div>
      </div>

      <div className="glass-morphism p-6 rounded-3xl border-white/5">
        <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Strategic Summary
        </h4>
        <p className="text-sm text-slate-400 leading-relaxed italic">
          "{lead.summary || `Lead from ${lead.company} shows high engagement patterns. Initial research suggests an 84% probability of conversion if a demo is offered within the next 24 hours.`}"
        </p>
      </div>

      <div className="space-y-4">
         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recommended Next Steps</h4>
         <div className="space-y-2">
            {[
              "Trigger autonomous demo invitation",
              "Research CEO's recent LinkedIn activity",
              "Draft hyper-personalized case study"
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-sm text-slate-300 hover:border-primary/30 cursor-pointer transition-all">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {step}
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AIInsight;
