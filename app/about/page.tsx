import { Shield, Users, Activity, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About AuditMyDenial™ | Clinical Verification Board",
  description: "Meet the algorithmic and clinical experts behind the world's first automated insurance appeal engine.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Mission */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-500 text-[10px] font-mono border border-gold-500/20 uppercase tracking-widest">
            About_Us
          </div>
          <h1 className="text-5xl font-outfit font-black leading-tight">
            Democratizing <span className="text-gold-500">Clinical Logic</span>.
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Insurance companies use algorithms to deny you. We built an algorithm to fight back.
            AuditMyDenial™ is the first specialized "Counter-Audit" engine designed to reverse coverage denials using their own internal rulebooks.
          </p>
        </section>

        {/* The Board */}
        <section className="glass-premium p-10 rounded-[40px] border-white/5">
          <h2 className="text-2xl font-outfit font-bold mb-8 flex items-center gap-3">
            <Users className="w-6 h-6 text-gold-500" /> Clinical Verification Board
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
               { name: "Dr. Sarah L., MD", role: "Endocrinology Advisor", desc: "Board Certified in Metabolic Medicine. Verification lead for GLP-1 (Ozempic/Wegovy) coverage protocols." },
               { name: "James R., JD", role: "ERISA Compliance", desc: "Former insurance defense counsel. Architect of our Section 503 legal argument structures." },
               { name: "Unit 734 (Algorithm)", role: "Policy Vector Engine", desc: "Our proprietary AI that indexes 1.2M clinical policy documents daily to find coverage loopholes." },
             ].map((member, i) => (
               <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                 <h3 className="font-bold text-lg text-white mb-1">{member.name}</h3>
                 <div className="text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">{member.role}</div>
                 <p className="text-sm text-slate-400 leading-relaxed">{member.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
           {[
             { label: "Policies Indexed", val: "1.2M+" },
             { label: "Success Rate", val: "83%" },
             { label: "Audit Speed", val: "< 3.2s" },
           ].map((stat, i) => (
             <div key={i} className="p-8 rounded-3xl bg-navy-900 border border-white/5">
               <div className="text-4xl font-outfit font-black text-white mb-2">{stat.val}</div>
               <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">{stat.label}</div>
             </div>
           ))}
        </section>

      </div>
    </div>
  );
}
