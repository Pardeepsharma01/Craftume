"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import {
  fadeUp,
  staggerContainer,
  cardHover,
  buttonTap,
} from "@/lib/motion-variants";

import { useHasMounted } from "@/hooks/useHasMounted";

export default function ProtectedDashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const hasMounted = useHasMounted();
  const displayName = hasMounted ? (user?.name || user?.email || "User") : "User";

  const stats = [
    {
      title: "Resumes Created",
      value: "0",
      description: "Drafts and completed resumes",
      icon: FileText,
      color: "from-blue-500/20 to-indigo-500/20 text-blue-400",
    },
    {
      title: "ATS Checks Run",
      value: "0",
      description: "Match score optimizations",
      icon: Sparkles,
      color: "from-purple-500/20 to-pink-500/20 text-purple-400",
    },
    {
      title: "Account Status",
      value: "Free Plan",
      description: "All core features active",
      icon: ShieldCheck,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Welcome Header */}
      <motion.div variants={fadeUp} className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Zap className="h-3.5 w-3.5" />
          <span>Dashboard Shell Active</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {displayName}
          </span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          Manage your AI-crafted resumes, evaluate job descriptions against ATS standards, and optimize your application outcome.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={fadeUp}
              {...cardHover}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-6 shadow-xl transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Primary Action Cards / CTAs */}
      <motion.div variants={fadeUp} className="space-y-4">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          Quick Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Action 1: Create Resume */}
          <motion.div
            {...cardHover}
            className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-card/60 via-card/40 to-primary/5 backdrop-blur-xl p-6 shadow-xl"
          >
            <div className="flex flex-col h-full justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30 shadow-md">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Create Your First Resume
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Start with AI-driven content generation tailored to your target position and experience level.
                </p>
              </div>

              <div>
                <motion.div {...buttonTap} className="inline-block">
                  <Link
                    href="/protected/resume/new"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)]"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Resume</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Action 2: Check ATS Score */}
          <motion.div
            {...cardHover}
            className="group relative overflow-hidden rounded-2xl border border-secondary/30 bg-gradient-to-br from-card/60 via-card/40 to-secondary/5 backdrop-blur-xl p-6 shadow-xl"
          >
            <div className="flex flex-col h-full justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-secondary border border-secondary/30 shadow-md">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Check Your ATS Score
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upload an existing resume and target job description to pinpoint missing keywords and scoring gaps.
                </p>
              </div>

              <div>
                <motion.div {...buttonTap} className="inline-block">
                  <Link
                    href="/protected/ats"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-secondary/50 hover:bg-card/80"
                  >
                    <Sparkles className="h-4 w-4 text-secondary" />
                    <span>Check ATS Score</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
