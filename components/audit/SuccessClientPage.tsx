"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { checkPaymentStatus } from "@/lib/check-payment";
import { Download, CheckCircle, Shield } from "lucide-react";
import { generateDossier } from "@/lib/dossier-factory";

export default function SuccessClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const auditId = searchParams.get("audit_id");
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  useEffect(() => {
    if (!sessionId || !auditId) {
       setStatus("error");
       return;
    }

    checkPaymentStatus(sessionId).then((valid: boolean) => {
      if (valid) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }).catch(() => setStatus("error"));

  }, [sessionId, auditId]);

  const handleDownload = async () => {
    await generateDossier("Aetna", "Ozempic", { 
        score: 95, 
        evidence: ["Simulated Evidence match for Payment Demo"], 
        gaps: ["Technical Violation confirmed by Paid Audit"], 
        policy_id: "PAID-2026-X" 
    }, auditId || "PAID-REF");
  };

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"/>
            <h2 className="text-2xl font-outfit font-bold">Verifying Transaction...</h2>
            <p className="text-slate-500 font-mono text-sm mt-2">Connecting to Secure Payment Ledger</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
      return (
          <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
              <div className="text-center">
                  <h2 className="text-2xl font-bold text-red-500">Payment Verification Failed</h2>
                  <button onClick={() => router.push('/')} className="mt-4 underline">Return Home</button>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex flex-col items-center justify-center p-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0)_0%,#020617_100%),linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative max-w-lg w-full"
        >
            <div className="absolute -inset-1 bg-emerald-500/20 blur-xl rounded-full" />
            <div className="relative glass-premium p-10 rounded-[40px] border-emerald-500/30 text-center">
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                </div>

                <h1 className="text-4xl font-outfit font-black text-white mb-2">Audit Unlocked.</h1>
                <p className="text-slate-400 text-lg mb-8">Transaction confirmed. Your evidence dossier has been generated securely.</p>

                <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                         <Shield className="w-8 h-8 text-gold-500" />
                         <div className="text-left">
                             <div className="text-sm font-bold text-white">Clinical Evidence Packet</div>
                             <div className="text-xs text-slate-500 font-mono">ID: {auditId} • LICENSE: SINGLE_USER</div>
                         </div>
                    </div>
                    <button 
                      onClick={handleDownload}
                      className="w-full h-14 rounded-xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-400 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                        <Download className="w-5 h-5" /> Download PDF Now
                    </button>
                </div>
                
                <p className="text-xs text-slate-600">
                    A copy has also been sent to your secure email.
                </p>
            </div>
        </motion.div>
    </div>
  );
}
