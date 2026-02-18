"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Download, CheckCircle, FileText, Loader2, ArrowRight } from "lucide-react";
import { generateDossier } from "@/lib/dossier-factory";
import { AuditResult } from "@/lib/audit-engine";

interface DossierUnlockProps {
  carrier: string;
  drug: string;
  result: AuditResult;
}

export function DossierUnlock({ carrier, drug, result }: DossierUnlockProps) {
  const [status, setStatus] = useState<"locked" | "processing" | "unlocked">("locked");

  const handleUnlock = async () => {
    setStatus("processing");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
           auditId: "294-AMD-01", // Dynamic in reality
           carrier, 
           drug 
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        console.error("Stripe Error:", data.error);
        setStatus("locked");
      }
    } catch (err) {
      console.error("Checkout Request Error:", err);
      setStatus("locked");
    }
  };

  const handleDownload = () => {
    generateDossier(carrier, drug, result, "294-AMD-01"); // Dynamic ID in prod
  };

  if (status === "unlocked") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-premium rounded-[40px] p-8 bg-emerald-900/20 border-emerald-500/30 sticky top-32"
      >
        <div className="flex justify-center -mt-16 mb-8">
           <div className="w-20 h-20 rounded-3xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 scale-110">
              <CheckCircle className="w-10 h-10" />
           </div>
        </div>
        
        <div className="text-center mb-8">
          <h4 className="text-2xl font-outfit font-black text-white mb-2 uppercase tracking-tighter">Dossier Unlocked</h4>
          <p className="text-emerald-400 text-sm font-light">
            Your evidence packet is ready.
          </p>
        </div>

        <button 
          onClick={handleDownload}
          className="w-full h-16 rounded-2xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-400 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3"
        >
          <Download className="w-5 h-5" /> Download PDF
        </button>
      </motion.div>
    );
  }

  return (
    <div className="glass-premium rounded-[40px] p-8 bg-gradient-to-b from-navy-800/50 to-navy-900/50 border-gold-500/30 sticky top-32">
      <div className="flex justify-center -mt-16 mb-8">
         <div className="w-20 h-20 rounded-3xl bg-gold-500 flex items-center justify-center text-navy-900 shadow-xl shadow-gold-500/20 scale-110">
            {status === "processing" ? <Loader2 className="w-10 h-10 animate-spin" /> : <Lock className="w-10 h-10" />}
         </div>
      </div>
      
      <div className="text-center mb-8">
        <h4 className="text-2xl font-outfit font-black text-white mb-2 uppercase tracking-tighter">Unlock Dossier</h4>
        <p className="text-slate-500 text-sm font-light leading-relaxed">
          Download the authoritative Evidence Packet containing all citations and your generated appeal strategy.
        </p>
      </div>

      <div className="space-y-3 mb-8">
         {[
           { label: "Clinical Evidence Packet", icon: <DnaIcon /> },
           { label: "Carrier Manual Citations", icon: <QuoteIcon /> },
           { label: "Pre-filled Appeal Script", icon: <FileCheckIcon /> }
         ].map((item, i) => (
           <div key={i} className="flex items-center gap-3 text-xs font-medium text-slate-300 p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-gold-500">{item.icon}</span>
              {item.label}
           </div>
         ))}
      </div>

      <div className="flex flex-col items-center gap-4">
         <div className="flex items-baseline gap-2">
            <span className="text-4xl font-outfit font-black text-white tracking-tighter">$49</span>
            <span className="text-slate-600 text-sm font-mono tracking-widest uppercase">One-Time_Fee</span>
         </div>
         <button 
           onClick={handleUnlock}
           disabled={status === "processing"}
           className="w-full h-16 rounded-2xl bg-gold-500 text-navy-900 font-bold text-lg hover:bg-gold-400 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
         >
           {status === "processing" ? "Securing..." : (
             <>Launch Reversal Process <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
           )}
         </button>
      </div>
    </div>
  );
}

// Simple Icon Wrappers to avoid cluttering main component
const DnaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M17 12a5 5 0 0 0-5 5"/><path d="M12 7a5 5 0 0 1 5-5"/></svg>
);
const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>
);
const FileCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
);
