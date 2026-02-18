import type { Metadata } from "next";
import { Inter, Outfit, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });
export const metadata: Metadata = {
  metadataBase: new URL("https://auditmydenial.com"),
  title: {
    default: "AuditMyDenial™ | AI Insurance Appeal Generator",
    template: "%s | AuditMyDenial™"
  },
  description: "Stop fighting insurance denials alone. Our algorithmic audit engine scans your denial against 1.2M policy clauses to generate a winning legal appeal dossier in seconds.",
  keywords: ["insurance appeal", "aetna ozempic denial", "wegovy appeal letter", "medical necessity audit", "ERISA appeal generator"],
  authors: [{ name: "AuditMyDenial Clinical Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://auditmydenial.com",
    siteName: "AuditMyDenial™",
    title: "Don't Just Appeal. Engineer The Solution.",
    description: "Algorithmic verification for medical insurance denials. Turn your rejection letter into a legal dossier.",
    images: [
      {
        url: "https://auditmydenial.com/og-image.jpg", // We need to add this image later
        width: 1200,
        height: 630,
        alt: "AuditMyDenial Interface"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AuditMyDenial™ | AI Insurance Appeal Generator",
    description: "Algorithmic verification for medical insurance denials.",
    creator: "@AuditMyDenial"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${robotoMono.variable} font-sans selection:bg-gold-500/30 overflow-x-hidden`}
      >
        {/* Deep Field Background */}
        <div className="fixed inset-0 -z-50 bg-[#020617]">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 mesh-gradient" />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full" />
        </div>

        <header className="fixed top-0 w-full z-50 border-b border-white/[0.03] glass-premium">
          <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-10">
              <a href="/" className="group flex items-center gap-3 cursor-pointer">
                <div className="relative w-10 h-10">
                  {/* Outer Architectural Ring */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-45 group-hover:rotate-[135deg] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <rect x="10" y="10" width="80" height="80" rx="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/10" />
                    <rect x="25" y="25" width="50" height="50" rx="12" fill="none" stroke="currentColor" strokeWidth="4" className="text-gold-500/20" />
                  </svg>
                  {/* The Core 'A' Mark */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 40 40" className="w-6 h-6 text-gold-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                      <path d="M20 5 L35 32 L5 32 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                      <path d="M12 24 L28 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col -gap-1">
                  <div className="text-xl font-outfit font-black tracking-[-0.04em] text-white leading-none">
                    AUDITMYDENIAL
                  </div>
                  <div className="text-[7px] font-mono tracking-[0.4em] text-gold-500/60 font-bold uppercase pl-0.5">
                    Clinical Verification
                  </div>
                </div>
              </a>
              
              <div className="hidden lg:flex items-center gap-8 text-clinical">
                <a href="/#infrastructure" className="hover:text-white transition-colors">Infrastructure</a>
                <a href="/#clinical-board" className="hover:text-white transition-colors">Clinical Board</a>
                <a href="/#methodology" className="hover:text-white transition-colors">Methodology</a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-clinical text-[8px]">System Status</span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  OPERATIONAL
                </span>
              </div>
              <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all font-outfit">
                Client Access
              </button>
            </div>
          </nav>
        </header>

        <main className="relative z-10">
          {children}
        </main>

        <footer className="border-t border-white/[0.03] py-20 px-8 bg-[#02040a]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="text-xl font-outfit font-bold text-white mb-6">AUDITMYDENIAL.</div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                The first decentralized verification layer for medical insurance appeals. 
                Auditing $4.2B in denied claims through technical policy extraction.
              </p>
            </div>
            {/* pSEO Signals */}
            <div className="col-span-1">
              <div className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Trending Appeals</div>
              <div className="flex flex-col gap-3 text-sm text-slate-500 font-mono">
                <a href="/audit/Aetna/Ozempic" className="hover:text-gold-500 transition-colors">Aetna_Ozempic.pdf</a>
                <a href="/audit/UHC/Wegovy" className="hover:text-gold-500 transition-colors">UHC_Wegovy.pdf</a>
                <a href="/audit/Cigna/Mounjaro" className="hover:text-gold-500 transition-colors">Cigna_Mounjaro.pdf</a>
                <a href="/audit/BCBS/Zepbound" className="hover:text-gold-500 transition-colors">BCBS_Zepbound.pdf</a>
              </div>
            </div>

            {/* Legal */}
            <div className="col-span-1">
               <div className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Legal & Company</div>
               <div className="flex flex-col gap-3 text-sm text-slate-500 font-mono">
                  <a href="/about" className="hover:text-gold-500 transition-colors">About Us</a>
                  <a href="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</a>
                  <a href="/terms" className="hover:text-gold-500 transition-colors">Terms of Service</a>
                  <a href="/sitemap.xml" className="hover:text-gold-500 transition-colors">Sitemap</a>
               </div>
            </div>
            <div className="col-span-1 flex flex-col md:items-end gap-6 text-clinical">
              <div className="flex gap-10">
                <span className="opacity-50 hover:opacity-100 transition-opacity">HIPAA_COMPLIANT</span>
                <span className="opacity-50 hover:opacity-100 transition-opacity">SSL_ENCRYPTED</span>
                <span className="opacity-50 hover:opacity-100 transition-opacity">SOC2_TYPE_II</span>
              </div>
              <p className="text-[10px] text-slate-700 font-mono">
                CLINICAL_VERIFICATION_LEDGER_V2.0.4.ARM
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function Shield(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}
