"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import {
  Film,
  Navigation2,
  Ticket,
  ArrowRight,
  Play,
  Star,
  Clock,
  Sparkles,
} from "lucide-react";
import { moviesApi } from "@/lib/api";
import type { Movie } from "@/types";
import { MoviePoster } from "@/components/ui/MoviePoster";
import Image from "next/image";

const HERO_POSTER_FALLBACK =
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=85";

const FEATURES = [
  {
    href: "/movies",
    title: "Browse Movies",
    description:
      "Explore the watch-party catalog with runtime, prerequisites, and watch status.",
    Icon: Film,
    accent: "from-red-500/20 via-rose-500/10 to-amber-500/10",
  },
  {
    href: "/rewatch-plan",
    title: "Rewatch Plan",
    description:
      "Generate an optimal rewatch order while respecting movie prerequisites.",
    Icon: Navigation2,
    accent: "from-red-500/20 via-purple-500/10 to-rose-500/10",
  },
  {
    href: "/booking",
    title: "Group Booking",
    description:
      "Calculate optimal seat bundle allocations for your cinema group size.",
    Icon: Ticket,
    accent: "from-amber-500/15 via-red-500/15 to-rose-500/10",
  },
] as const;

export default function HomeView() {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [heroSrc, setHeroSrc] = React.useState("/posters/doomsday.jpg");

  React.useEffect(() => {
    let active = true;
    moviesApi
      .list()
      .then((data) => {
        if (!active) return;
        setMovies(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(
          err instanceof Error ? err.message : "Failed to load featured movies",
        );
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const featured = movies.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section with Animated Movie Poster Motion (Video-like Pan & Zoom) */}
      <section className="relative overflow-hidden px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-28 lg:pb-32 border-b border-white/10 bg-[#050505]">
        {/* Animated Poster Layer */}
        <motion.div
          aria-hidden
          animate={{
            scale: [1.04, 1.18, 1.08, 1.04],
            x: ["0%", "-3%", "2.5%", "0%"],
            y: ["0%", "-2%", "2%", "0%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src={heroSrc}
            fill
            sizes="100vw"
            unoptimized
            priority
            alt="Doomsday movie poster motion backdrop"
            onError={() => {
              if (heroSrc !== HERO_POSTER_FALLBACK) {
                setHeroSrc(HERO_POSTER_FALLBACK);
              }
            }}
            className="object-cover object-center opacity-75"
          />
        </motion.div>

        {/* Light cinematic vignette so poster motion stays clearly visible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#050505] via-black/35 to-black/45"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-black/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-200 backdrop-blur-md shadow-[0_0_24px_rgba(239,68,68,0.25)]">
            <Sparkles className="h-3.5 w-3.5 text-red-400" />
            Live Watch-Party Hub
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.06] drop-shadow-[0_8px_28px_rgba(0,0,0,0.95)]">
            Doomsday{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              Ready
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-100 sm:text-lg lg:text-xl leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Curate your watch-party lineup, map out prerequisite viewing orders,
            and plan cinema group bundles in one seamless experience.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/movies"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-rose-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_32px_rgba(239,68,68,0.5)] hover:from-red-500 hover:to-rose-500 transition-all"
              >
                <Play className="h-4 w-4 fill-current" />
                Browse Movies
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/rewatch-plan"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-black/60 px-7 py-3.5 text-sm font-semibold text-white hover:bg-black/80 hover:border-white/40 backdrop-blur-md transition-all"
              >
                Build Rewatch Plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Movies */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Featured Movies
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Live selections synced from your catalog
              </p>
            </div>
            <Link
              href="/movies"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
            >
              View full catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className="h-72 rounded-2xl border border-white/10 bg-white/[0.03] p-5 animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-6 text-center">
              <p className="text-sm font-medium text-red-300">{error}</p>
            </div>
          ) : featured.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="text-sm text-zinc-400">
                No movies found in catalog yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((movie, idx) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.38 }}
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.14),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.07),transparent_55%),#0c0c10] p-4 shadow-xl hover:border-red-500/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition-all"
                >
                  <div>
                    <div className="relative overflow-hidden rounded-xl mb-3.5">
                      <MoviePoster title={movie.title} priority={idx === 0} />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0c0c10]/90 via-[#0c0c10]/30 to-transparent"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-red-300">
                        <Star className="h-3 w-3 fill-current" />
                        {movie.releaseYear}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          movie.watched
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : "bg-white/[0.05] text-zinc-300 border border-white/10"
                        }`}
                      >
                        {movie.watched ? "Watched" : "Unwatched"}
                      </span>
                    </div>

                    <Link href="/movies">
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {movie.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-red-400/80" />
                      {movie.runtimeMinutes} min
                    </span>
                    <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-zinc-300 border border-white/5">
                      {movie.prerequisites?.length ?? 0} prereqs
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
            Quick Access
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.Icon;
              return (
                <motion.div
                  key={feature.href}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{ delay: idx * 0.08, duration: 0.38 }}
                  whileHover={{ y: -6 }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${feature.accent} bg-[#0c0c10] p-6 shadow-xl hover:border-red-500/35 hover:shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition-all`}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.18)] group-hover:scale-105 group-hover:bg-red-500/25 transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed flex-1">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-300"
                  >
                    Open module
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
