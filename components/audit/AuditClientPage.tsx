"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";
import { Shield, AlertCircle, CheckCircle2, Lock, ArrowRight, Dna, FileSearch, Quote, FileCheck } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: any = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

interface AuditClientPageProps {
  carrier: string;
  drug: string;
}

export default function AuditClientPage({ carrier, drug }: AuditClientPageProps) {
  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": `${carrier} ${drug} Coverage Audit`,
    "description": `Technical verification of ${carrier} insurance coverage policies for ${drug}.`,
    "audience": {
      "@type": "Patient",
      "audienceType": "people with insurance denials"
    },
    "specialty": "Health Insurance Appeals",
    "legalStatus": "HIPAA Compliant"
  };

  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const triggerStripeCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
           auditId: "294-AMD-01", 
           carrier, 
           drug 
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout Error:", err);
    }
  };

  useEffect(() => {
    async function performAudit() {
      const start = Date.now();
      
      try {
        const response = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            carrier,
            drug,
            diagnosis: "E28.2",
            history: ["Metformin failure reported"]
          })
        });

        const data = await response.json();
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, 3500 - elapsed);
        
        setTimeout(() => {
          setResult({
            probability: data.score,
            evidence_found: data.evidence.length > 0 ? data.evidence : ["Standard Coverage Criteria Detected"],
            gaps: data.gaps
          });
          setScanning(false);
        }, remaining);
      } catch (error) {
        console.error("Audit Fetch Error:", error);
        setScanning(false);
      }
    }

    performAudit();

    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 1 : prev));
    }, 40);
    return () => clearInterval(interval);
  }, [carrier, drug]);

  if (scanning) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-32 flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-2xl"
        >
          <div className="absolute -inset-10 bg-gold-500/5 blur-[80px] rounded-full" />
          <div className="relative glass-premium p-12 rounded-[40px] border-gold-500/20 text-center">
            <div className="flex justify-center mb-10">
              <div className="relative h-24 w-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                <Dna className="w-10 h-10 text-gold-500 animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-3xl font-outfit font-black text-white mb-4 tracking-tight uppercase">
              Analyzing Policy Ledger
            </h2>
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-clinical text-gold-500">Target: {carrier} v2026.04</span>
              <span className="text-clinical text-slate-500">Treatment ID: {drug}</span>
            </div>

            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4 p-[1px]">
              <motion.div 
                className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              <span>Initializing_Scan...</span>
              <span>Scanning Policy Manuals...</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <LeadCaptureModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
        onSuccess={triggerStripeCheckout}
        auditId="294-AMD-01"
      />

      {/* Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-8 py-16"
      >

      {/* Precision Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 px-4">
        <div>
          <div className="text-clinical text-gold-500 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            Audit Successful • ID: 294-AMD-01
          </div>
          <h1 className="text-5xl font-outfit font-black text-white tracking-tighter">
            Audit Result: <span className="text-gold-500">{drug}</span>
          </h1>
          <p className="text-slate-500 mt-4 text-lg font-light max-w-xl leading-relaxed">
            Our algorithmic verification engine has detected <span className="text-white font-medium">{result.gaps.length} technical violations</span> in the carrier's denial logic for {carrier}.
          </p>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="glass-premium p-6 px-10 rounded-[32px] border-gold-500/20 flex flex-col items-center"
        >
            <div className="text-clinical text-slate-400 mb-2">Confidence_Rating</div>
            <div className="text-6xl font-outfit font-black text-white glow-gold">
              {result.probability}<span className="text-2xl text-gold-500">%</span>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-2 uppercase tracking-widest">High Success Factor</div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Findings */}
        <div className="lg:col-span-8 space-y-10">
           {/* Evidence Card */}
           <motion.div variants={itemVariants} className="glass-premium rounded-[40px] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <FileSearch className="w-40 h-40 text-white" />
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-white uppercase tracking-tight">Clinical Evidence Ledger</h3>
              </div>

              <div className="space-y-6 relative z-10">
                {result.evidence_found.map((item: any, i: number) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group/item"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-bold text-white group-hover/item:text-gold-500 transition-colors uppercase tracking-tight">EVIDENCE_SIGNAL_{i+1}</span>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">AMD_MATCH</span>
                    </div>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
           </motion.div>

           {/* Violations Card */}
           <motion.div variants={itemVariants} className="glass-premium rounded-[40px] p-10 bg-navy-900/40">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/20">
                  <AlertCircle className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-white uppercase tracking-tight">Technical Violations Detected</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.gaps.map((v: string, i: number) => (
                  <div key={i} className="flex gap-4 items-start font-mono text-xs text-slate-400 p-4 rounded-xl bg-navy-800/40 border border-white/[0.03]">
                    <span className="text-gold-500 opacity-50">0{i+1}:</span>
                    {v}
                  </div>
                ))}
              </div>
           </motion.div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <motion.div 
            variants={itemVariants}
            className="glass-premium rounded-[40px] p-8 bg-gradient-to-b from-navy-800/50 to-navy-900/50 border-gold-500/30 sticky top-32"
           >
              <div className="flex justify-center -mt-16 mb-8">
                 <motion.div 
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="w-20 h-20 rounded-3xl bg-gold-500 flex items-center justify-center text-navy-900 shadow-xl shadow-gold-500/20 scale-110"
                 >
                    <Lock className="w-10 h-10" />
                 </motion.div>
              </div>
              
              <div className="text-center mb-8">
                <h4 className="text-2xl font-outfit font-black text-white mb-2 uppercase tracking-tighter">Unlock Dossier</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  Download the authoritative Evidence Packet containing all citations and your generated appeal strategy.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                 {[
                   { label: "Clinical Evidence Packet", icon: <Dna className="w-4 h-4" /> },
                   { label: "Carrier Manual Citations", icon: <Quote className="w-4 h-4" /> },
                   { label: "Pre-filled Appeal Script", icon: <FileCheck className="w-4 h-4" /> }
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
                 <motion.button 
                   whileHover={{ scale: 1.02, backgroundColor: "#F59E0B" }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => setIsLeadModalOpen(true)}
                   className="w-full h-16 rounded-2xl bg-gold-500 text-navy-900 font-bold text-lg transition-all shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center justify-center gap-3 group"
                 >
                   Launch Reversal Process <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </motion.button>
              </div>
           </motion.div>
        </div>
      </div>
    </motion.div>
    </>
  );
}
