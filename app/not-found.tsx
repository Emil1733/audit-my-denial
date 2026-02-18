import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-black text-white/5 font-outfit">404</h1>
      <div className="absolute">
        <h2 className="text-3xl font-bold text-white mb-4">Audit Endpoint Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          The requested clinical audit path does not exist in our ledger or has been moved.
        </p>
        <Link 
          href="/"
          className="px-8 py-4 rounded-xl bg-gold-500 text-navy-900 font-bold hover:bg-gold-400 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
