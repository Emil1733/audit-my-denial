"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, Activity, BookOpen, Database, BarChart3, Shield, Info, ExternalLink } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: any = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function Home() {
  const router = useRouter();
  const [carrier, setCarrier] = useState("Aetna");
  const [drug, setDrug] = useState("");

  const handleAudit = () => {
    const targetDrug = drug.trim() || "Ozempic";
    router.push(`/audit/${encodeURIComponent(carrier)}/${encodeURIComponent(targetDrug)}`);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative pt-16 pb-32"
    >
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-32 flex flex-col items-center text-center">
        <motion.div variants={itemVariants} className="group relative mb-12 cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 to-amber-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
          <div className="relative inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-navy-900 border border-white/10 text-gold-500 text-[10px] font-mono tracking-[0.2em] uppercase">
            <Activity className="w-3 h-3 animate-pulse" />
            Verification Network v2.0 Live • ARM_REGION_ACTIVE
          </div>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-[5.5rem] font-outfit font-black tracking-tight text-white mb-8 leading-[0.95] max-w-5xl"
        >
          Don't Just Appeal.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Engineer The Solution.
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="max-w-2xl text-lg md:text-xl text-slate-400 mb-16 leading-relaxed font-light"
        >
          AuditMyDenial™ is an algorithmic auditing platform that cross-references medical insurance denials against <span className="text-white font-medium">1.2M policy clauses</span> to find technical exceptions and clinical evidence.
        </motion.p>

        {/* The 'Console' Component */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-4xl relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 to-blue-500/20 rounded-[32px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative glass-premium p-1.5 rounded-[32px] shadow-2xl">
            <div className="bg-[#020617]/80 rounded-[28px] p-10 flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-8 text-left">
                <div className="space-y-2">
                  <label className="text-clinical flex items-center gap-2">
                    <Database className="w-3 h-3 text-gold-500" /> Carrier Policy Ledger
                  </label>
                  <div className="relative group/select">
                    <select 
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      className="w-full h-14 rounded-xl bg-white/[0.03] border border-white/10 px-5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all font-outfit text-lg cursor-pointer hover:bg-white/[0.05]"
                    >
                      <option value="Aetna" className="bg-navy-900">Aetna Clinical Bulletins</option>
                      <option value="UHC" className="bg-navy-900">UnitedHealthcare (UHC)</option>
                      <option value="Cigna" className="bg-navy-900">Cigna Healthcare</option>
                      <option value="BCBS" className="bg-navy-900">BlueCross BlueShield</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-clinical flex items-center gap-2">
                    <Search className="w-3 h-3 text-gold-500" /> Target Treatment
                  </label>
                  <input 
                    type="text" 
                    value={drug}
                    onChange={(e) => setDrug(e.target.value)}
                    placeholder="e.g. Ozempic, Semaglutide, MRI"
                    className="w-full h-14 rounded-xl bg-white/[0.03] border border-white/10 px-5 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all font-outfit text-lg" 
                  />
                </div>
              </div>

              <div className="md:w-px bg-white/10 self-stretch" />

              <div className="md:w-72 flex flex-col justify-between pt-2">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[8px] font-mono text-slate-500 mb-1">SCAN_DEPTH</div>
                      <div className="text-xs font-bold text-white uppercase tracking-tighter">Full Policy Audit</div>
                    </div>
                    <Info className="w-3 h-3 text-slate-600" />
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[8px] font-mono text-slate-500 mb-1">DATA_SOURCE</div>
                      <div className="text-xs font-bold text-white uppercase tracking-tighter">Vectorized Ledger v2</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: "#F59E0B" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAudit}
                  className="mt-8 md:mt-0 w-full h-16 rounded-2xl bg-gold-500/90 text-navy-900 font-black text-lg transition-all shadow-[0_0_40px_rgba(245,158,11,0.2)] flex items-center justify-center gap-3 uppercase tracking-tighter"
                >
                  Initialize Audit <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Infrastructure Section (E-E-A-T: Technology) */}
      <section id="infrastructure" className="max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center gap-16">
           <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20 uppercase tracking-widest">
                 System_Architecture_v2
              </div>
              <h2 className="text-4xl md:text-5xl font-outfit font-black text-white leading-tight">
                 1.2 Million Policy<br/>Clauses Indexed.
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                 We don't guess. Our <strong>Vectorized Ledger™</strong> ingests the actual clinical policy bulletins (CPBs) from Aetna, Cigna, UHC, and BCBS.
                 <br/><br/>
                 When a denial occurs, we physically map your diagnosis code (ICD-10) against their specific coverage exception logic. If a match is found, the appeal is mathematically valid.
              </p>
           </div>
           
           <div className="flex-1 relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
              <div className="relative glass-premium p-8 rounded-[32px] border-blue-500/30">
                 <div className="space-y-4 font-mono text-xs text-slate-400">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                       <span>Aetna_CPB_0533.pdf</span>
                       <span className="text-emerald-400">INDEXED</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                       <span>UHC_Pharm_Policy_2026.json</span>
                       <span className="text-emerald-400">INDEXED</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                       <span>Cigna_Step_Therapy_L3.xml</span>
                       <span className="text-emerald-400">INDEXED</span>
                    </div>
                    <div className="flex justify-between pt-2">
                       <span>BCBS_Prior_Auth_Master.db</span>
                       <span className="text-emerald-400">Verifying...</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Clinical Board Section (E-E-A-T: Expertise) */}
      <section id="clinical-board" className="max-w-7xl mx-auto px-8 py-32 border-t border-white/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-500/5 blur-[120px]" />
         
         <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-outfit font-black text-white mb-6">Human Validation Layer</h2>
            <p className="text-slate-400 font-light text-lg">
               Algorithms find the matches. Accredited specialists verify the logic.
               Every generated dossier is backed by the <strong>AuditMyDenial Clinical Standard</strong>, ensuring it meets ERISA Section 503 compliance.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
               { role: "Endocrinology Specialist", verify: "Metabolic Logic", status: "Active" },
               { role: "ERISA Legal Counsel", verify: "Regulatory Citations", status: "Active" },
               { role: "Pharmacology PhD", verify: "Drug Interaction", status: "Active" }
            ].map((expert, i) => (
               <div key={i} className="glass-premium p-6 rounded-2xl border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-bold text-gold-500 border border-white/10">
                     0{i+1}
                  </div>
                  <div>
                     <div className="text-white font-bold">{expert.role}</div>
                     <div className="text-xs text-slate-500 font-mono flex gap-2">
                        {expert.verify} • <span className="text-emerald-400">{expert.status}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Trust Grid (Methodology) */}
      <section id="methodology" className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10 pb-32">
        {[
          { icon: <BarChart3 className="w-6 h-6 text-gold-500" />, title: "Precision Auditing", desc: "We identify specific carrier manual codes (CPB, LCD) that match your diagnosis history." },
          { icon: <BookOpen className="w-6 h-6 text-clinical-blue" />, title: "Evidence Library", desc: "Every result is cited against the National Library of Medicine (NLM) database." },
          { icon: <Shield className="w-6 h-6 text-white" />, title: "Regulatory Backing", desc: "Generated dossiers are formatted to ERISA Section 503 legal standards." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5, borderColor: "rgba(245, 158, 11, 0.2)" }}
            className="group p-10 rounded-[40px] glass-premium transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
               {item.icon}
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-outfit font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed font-light text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
}
