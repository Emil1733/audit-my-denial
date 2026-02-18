export const metadata = {
  title: "Terms of Service | AuditMyDenial™",
  description: "Medical disclaimer and usage terms.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-400 pt-32 pb-20 px-8 font-light leading-relaxed">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-outfit font-black text-white mb-8">Terms of Service</h1>
        
        <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-2xl text-red-200 mb-8">
          <strong>CRITICAL MEDICAL DISCLAIMER:</strong><br/>
          AuditMyDenial™ is an informational tool, not a medical provider or law firm. 
          The "Appeals" generated are templates based on public policy data. 
          Results do not guarantee coverage. Always consult a qualified attorney or physician.
        </div>
        
        <h2 className="text-xl font-bold text-white mt-8">1. Service Scope</h2>
        <p>
          We provide algorithmic analysis of insurance denial letters. We do not provide medical advice, diagnosis, or treatment.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">2. Refund Policy</h2>
        <p>
          Due to the digital nature of the "Dossier" product, all sales are final once the PDF has been downloaded/unlocked. 
          Exceptions are made only for technical generation errors.
        </p>

        <h2 className="text-xl font-bold text-white mt-8">3. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, AuditMyDenial LLC shall not be liable for any indirect, incidental, or consequential damages arising from the use of our generated appeal letters.
        </p>
      </div>
    </div>
  );
}
