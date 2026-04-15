import Link from "next/link";

type NotFoundContentProps = {
  badge?: string;
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function NotFoundContent({
  badge = "404",
  title = "Page not found",
  description = "The page you're looking for doesn't exist or has moved. Please check the URL or head back to the home page.",
  primaryHref = "/",
  primaryLabel = "Back to Home",
  secondaryHref = "/contact-us",
  secondaryLabel = "Contact Support",
}: NotFoundContentProps) {
  return (
    <div className="min-h-screen bg-[#03060D] text-slate-200 flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">{badge}</p>
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <p className="text-slate-400">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-500 text-slate-950 font-semibold hover:bg-blue-400 transition-colors"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/10 text-slate-200 hover:border-white/30 transition-colors"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
