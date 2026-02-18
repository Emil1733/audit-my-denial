import { Suspense } from "react";
import SuccessClientPage from "@/components/audit/SuccessClientPage";

export const metadata = {
  title: "Audit Unlocked | AuditMyDenial",
  robots: {
    index: false,
    follow: false
  }
};

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"/>
            <h2 className="text-2xl font-outfit font-bold">Initializing Secure Session...</h2>
        </div>
      </div>
    }>
      <SuccessClientPage />
    </Suspense>
  );
}
