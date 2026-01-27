// LandingPage.jsx
import { Link } from 'react-router';
import {
  TrendingUp,
  PieChart,
  Shield,
  Zap,
  ArrowRight,
  Wallet,
  CreditCard,
  Building2,
  ChevronDown
} from 'lucide-react';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

const currentYear = new Date().getFullYear();

export default function LandingPage() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-base-100 overflow-x-hidden">
      {/* ── Navigation ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-600 shadow-md">
              <FaMoneyBillTransfer className="text-2xl text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">FinTracker</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-base-content/70 hover:text-base-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400 rounded-md transition"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 text-sm font-semibold bg-base-content text-base-100 rounded-full hover:bg-base-content/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 transition shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 md:pt-32 md:pb-32 lg:pt-40 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 sm:-left-10 w-64 sm:w-96 h-64 sm:h-96 bg-lime-400/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-20 sm:-right-10 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-emerald-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-base-200/60 border border-base-300 mb-8 animate-fade-in">
            <span className="flex h-2.5 w-2.5 rounded-full bg-lime-500 animate-ping-slow" />
            <span className="text-sm font-medium text-base-content/80">Simple. Secure. Smart.</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight animate-fade-in-up">
            Take Control of
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent block mt-1">
              Your Money
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-base-content/70 mb-10 animate-fade-in-up animation-delay-200">
            Track expenses, manage GCash·Maya·bank accounts, get smart insights — all in one clean app.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 animate-fade-in-up animation-delay-400">
            <Link
              to="/signup"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-lime-500/30 transition-all hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={scrollToFeatures}
              className="flex items-center gap-2 px-8 py-4 border border-base-300 rounded-full hover:bg-base-200/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400 transition"
            >
              Learn More
            </button>
          </div>

          {/* Dashboard preview */}
          <div className="relative max-w-5xl mx-auto animate-fade-in-up animation-delay-600 px-2 sm:px-0">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base-100 to-transparent z-10 pointer-events-none" />
            <div className="relative rounded-3xl border border-base-300/70 bg-base-200/40 backdrop-blur-md p-5 sm:p-8 shadow-2xl shadow-black/10">
              <div className="rounded-2xl bg-base-100 p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-base-200">
                  <div>
                    <p className="text-sm text-base-content/60">Total Balance</p>
                    <p className="text-3xl sm:text-4xl font-bold tabular-nums">₱ 124,850.00</p>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-green-500/10 text-green-600 font-medium text-sm">
                    +₱12,400 this month
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {[
                    { name: 'GCash', amount: '₱45,200.00', icon: Wallet, color: 'bg-blue-600' },
                    { name: 'BDO',    amount: '₱52,150.00', icon: Building2, color: 'bg-amber-600' },
                    { name: 'Maya',   amount: '₱18,500.00', icon: CreditCard, color: 'bg-emerald-600' },
                    { name: 'Cash',   amount: '₱9,000.00',  icon: Wallet, color: 'bg-slate-600' },
                  ].map((acc) => (
                    <div
                      key={acc.name}
                      className="p-4 rounded-2xl bg-base-200/60 hover:bg-base-200 transition-colors"
                    >
                      <div className={`w-10 h-10 ${acc.color} rounded-xl flex items-center justify-center mb-3 shadow-sm`}>
                        <acc.icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs text-base-content/60">{acc.name}</p>
                      <p className="font-semibold tabular-nums">{acc.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToFeatures}
            className="mt-16 animate-bounce focus:outline-none"
            aria-label="Scroll to features"
          >
            <ChevronDown className="w-8 h-8 text-base-content/40" />
          </button>
        </div>
      </section>

      {/* Features ──────────────────────────────────────────────────── */}
      <section id="features" className="py-24 lg:py-32 bg-base-200/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <p className="text-sm font-semibold text-lime-600 tracking-wider uppercase mb-4">Features</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Everything you need to<br className="hidden sm:block" />
              <span className="text-base-content/50">manage your finances</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: TrendingUp, title: 'Expense Tracking', desc: 'Detailed categories, receipts, smart insights', gradient: 'from-lime-500 to-emerald-600' },
              { icon: Wallet, title: 'Multiple Accounts', desc: 'GCash, Maya, BPI, UnionBank, cash — all together', gradient: 'from-blue-500 to-indigo-600' },
              { icon: PieChart, title: 'Visual Reports', desc: 'Interactive charts & spending breakdowns', gradient: 'from-violet-500 to-fuchsia-600' },
              { icon: Shield, title: 'Bank-grade Security', desc: 'End-to-end encryption & secure connections', gradient: 'from-amber-500 to-orange-600' },
              { icon: Zap, title: 'Real-time Sync', desc: 'Instant balance & transaction updates', gradient: 'from-cyan-500 to-blue-600' },
              { icon: CreditCard, title: 'Smart Categorization', desc: 'Auto-detect & suggest categories', gradient: 'from-rose-500 to-pink-600' },
            ].map((f) => (
              <div
                key={f.title}
                className="group p-8 rounded-3xl bg-base-100 border border-base-200 hover:border-base-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 focus-within:border-lime-400 focus-within:shadow-lg focus-within:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-base-content/70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Ready to get your<br />
            <span className="bg-gradient-to-r from-lime-500 to-emerald-600 bg-clip-text text-transparent">finances under control?</span>
          </h2>
          <p className="text-xl text-base-content/70 mb-10 max-w-2xl mx-auto">
            Join thousands of Filipinos already tracking smarter with FinTracker.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:shadow-lime-500/30 transition-all hover:scale-[1.03] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-lime-400"
          >
            Get Started — It's Free
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="mt-6 text-sm text-base-content/50">
            No credit card • Free for personal use • Cancel anytime
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="py-12 border-t border-base-200 bg-base-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-600 shadow-sm">
                <FaMoneyBillTransfer className="text-2xl text-white" />
              </div>
              <span className="text-xl font-bold">FinTracker</span>
            </div>

            <div className="flex justify-center gap-8 text-sm text-base-content/60">
              <a href="#" className="hover:text-base-content transition">Privacy Policy</a>
              <a href="#" className="hover:text-base-content transition">Terms of Service</a>
              <a href="#" className="hover:text-base-content transition">Contact</a>
            </div>

            <p className="text-sm text-base-content/50">
              © {currentYear} FinTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}