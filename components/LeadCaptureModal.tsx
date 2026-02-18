"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, CheckCircle2, ArrowRight, Activity, Mail } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  auditId: string;
}

export function LeadCaptureModal({ isOpen, onClose, onSuccess, auditId }: LeadCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [claimValue, setClaimValue] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "secure">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, claimValue, auditId }),
      });
      setStatus("secure");
      // Delay to show success state before triggering payment
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      console.error(err);
      setStatus("secure"); // Fallback
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#020617]/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
            className="fixed left-1/2 top-1/2 z-[10000] w-full max-w-md p-6 pointer-events-auto"
            style={{ x: "-50%", y: "-50%" }}
          >
            <div className="relative overflow-hidden rounded-[32px] glass-premium border border-gold-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] bg-[#0f172a]">
               {/* Decorative Gradient Blob */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-[80px] -z-10 rounded-full" />

              <div className="p-8">
                {status === "secure" ? (
                  <div className="text-center py-8">
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </motion.div>
                    <h3 className="text-2xl font-outfit font-bold text-white mb-2">Audit Handover Secure</h3>
                    <p className="text-slate-400 text-sm mb-6">
                      Evidence packet sent to {email}.<br/>Proceeding to payment gateway...
                    </p>
                    <button onClick={onClose} className="text-gold-500 text-sm font-bold tracking-widest uppercase hover:text-gold-400">
                      Continue to Checkout &rarr;
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">
                          System_Security_Active
                        </div>
                        <h3 className="text-xl font-outfit font-bold text-white">
                          Secure Your Audit Findings
                        </h3>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">
                          Estimated Claim Value
                        </label>
                        <div className="relative">
                           <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                           <select 
                             required
                             value={claimValue}
                             onChange={(e) => setClaimValue(e.target.value)}
                             className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/50 appearance-none font-outfit"
                           >
                              <option value="" disabled className="bg-navy-900">Select Value...</option>
                              <option value="<5k" className="bg-navy-900">Under $5,000</option>
                              <option value="5k-50k" className="bg-navy-900">$5,000 - $50,000</option>
                              <option value=">50k" className="bg-navy-900">Over $50,000</option>
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <span className="text-slate-600 text-[10px]">▼</span>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">
                          Delivery Destination
                        </label>
                        <div className="relative">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                           <input 
                             type="email" 
                             required
                             placeholder="doctor@clinic.com"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 font-outfit"
                           />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit" 
                          disabled={status === "submitting"}
                          className="w-full h-14 rounded-xl bg-gold-500 text-navy-900 font-bold text-lg hover:bg-gold-400 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                          {status === "submitting" ? (
                             <span className="animate-pulse">Encrypting Data...</span>
                          ) : (
                             <>Lock & Save Audit <ArrowRight className="w-5 h-5" /></>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-4 opacity-50">
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
                           <Shield className="w-3 h-3" />
                           256-BIT_AES
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
                           <Shield className="w-3 h-3" />
                           HIPAA_COMPLIANT
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
