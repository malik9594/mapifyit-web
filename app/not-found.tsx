import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#03060D] text-slate-200 flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">404</p>
        <h1 className="text-4xl md:text-5xl font-bold">Page not found</h1>
        <p className="text-slate-400">
          The page you’re looking for doesn’t exist or has moved. Please check the URL or head back to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-500 text-slate-950 font-semibold hover:bg-blue-400 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/10 text-slate-200 hover:border-white/30 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
