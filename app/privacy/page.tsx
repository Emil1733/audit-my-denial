export const metadata = {
  title: "Privacy Policy | AuditMyDenial™",
  description: "How we protect your medical data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-400 pt-32 pb-20 px-8 font-light leading-relaxed">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-outfit font-black text-white mb-8">Privacy Policy</h1>
        
        <p><strong>Effective Date:</strong> February 18, 2026</p>
        
        <h2 className="text-xl font-bold text-white mt-8">1. HIPAA & Medical Data Security</h2>
        <p>
          AuditMyDenial™ treats all user inputs as Protected Health Information (PHI), regardless of whether we are technically a covered entity. 
          We use AES-256 encryption for all data at rest and TLS 1.3 for data in transit. 
          We do <strong>not</strong> sell your diagnosis history to third parties.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">2. Data Minimization</h2>
        <p>
          We only collect the specific data points required to run the audit (Diagnosis Code, Drug Name, Carrier Name). 
          We do not require your SSN or Member ID to generate the preliminary audit results.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">3. AI Processing</h2>
        <p>
          Your anonymized appeal data may be used to retrain our "Policy Vector Engine" to improve accuracy for future users. 
          Personal identifiers (Name, Email) are stripped before this process.
        </p>

        <div className="mt-16 pt-8 border-t border-white/10 text-xs font-mono text-slate-600">
          AuditMyDenial LLC • Dover, DE • compliance@auditmydenial.com
        </div>
      </div>
    </div>
  );
}
