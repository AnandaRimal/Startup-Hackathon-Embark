"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-blue via-white to-pastel-pink/30 relative overflow-hidden">

      {/* Decorative Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-pastel-purple/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-pastel-green/40 blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full z-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xl">P</div>
          <span className="text-2xl font-bold tracking-tight text-foreground">Pasale</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
          <Link href="/login">
            <Button className="rounded-full shadow-lg hover:shadow-primary/20 transition-all">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-6"
        >
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
            <Zap className="mr-1 h-3.5 w-3.5 fill-blue-800" />
            AI-Powered Retail Intelligence
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Unlock Future Sales <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Before They Happen</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pasale gives retailers the power of fortune-telling. Predict sales impact, optimize pricing, and spot trends with simple AI tools.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform">
                Start Predicting Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 hover:bg-white/50">
              View Demo
            </Button>
          </div>
        </motion.div>

        {/* Feature Cards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
        >
          <FeatureCard
            icon={<BarChart2 className="h-6 w-6 text-indigo-500" />}
            title="Sales Forecasting"
            desc="Accurate predictions based on historical patterns."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-yellow-500" />}
            title="Price Impact"
            desc="Simulate how price changes affect your bottom line."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-green-500" />}
            title="Inventory Risk"
            desc="Identify slow-moving stock before it becomes a loss."
          />
        </motion.div>
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        © 2024 Pasale Inc. No database, just magic.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-md transition-all text-left">
      <div className="mb-4 h-12 w-12 rounded-lg bg-white shadow-sm flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  )
}
