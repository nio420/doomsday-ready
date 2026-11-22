"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navigation2,
  ChevronRight,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Clock,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoviePoster } from "@/components/ui/MoviePoster";
import { moviesApi } from "@/lib/api";
import type { Movie, RewatchOrderResponse } from "@/types";

export default function RewatchPlanView() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [order, setOrder] = useState<RewatchOrderResponse | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    moviesApi
      .list()
      .then((data) => {
        if (!active) return;
        setMovies(data);
        setSelectedId((prev) => prev ?? (data.length > 0 ? data[0].id : null));
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load movies");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    let active = true;

    Promise.resolve().then(() => {
      if (!active) return;
      setLoading(true);
      setError(null);
    });

    moviesApi
      .rewatchOrder(selectedId)
      .then((data) => {
        if (!active) return;
        setOrder(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(
          err instanceof Error ? err.message : "Failed to load rewatch order",
        );
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedId]);

  const handleRetry = (id: string) => {
    setLoading(true);
    setError(null);
    moviesApi
      .rewatchOrder(id)
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : "Failed to load rewatch order",
        );
        setLoading(false);
      });
  };

  const selectedMovie = movies.find((m) => m.id === selectedId);

  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-60 w-[640px] rounded-full bg-gradient-to-r from-red-600/15 via-rose-500/10 to-amber-500/10 blur-3xl"
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-9"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-red-300 mb-2.5">
            <Sparkles className="h-3.5 w-3.5 text-red-400" />
            Smart Viewing Sequence
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Rewatch <span className="text-red-500">Plan</span>
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            Generate an optimal rewatch order that respects movie prerequisites.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/20 to-amber-500/10 text-red-400 shadow-[0_0_24px_rgba(239,68,68,0.2)]">
          <Navigation2 className="h-5 w-5" />
        </div>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left side: tiny square rounded poster - title - watchtime */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.4 }}
          className="lg:col-span-4 space-y-4"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.14),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.07),transparent_55%),#0b0b0f] p-4 shadow-2xl">
            <h2 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3.5">
              Select a movie
            </h2>
            <div className="space-y-2 max-h-[540px] overflow-y-auto pr-1">
              {movies.length === 0 ? (
                <div className="space-y-2 py-2">
                  <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
                  <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
                  <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
                </div>
              ) : (
                movies.map((m) => {
                  const isSelected = selectedId === m.id;
                  return (
                    <motion.button
                      key={m.id}
                      type="button"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedId(m.id)}
                      className={`group w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all border ${
                        isSelected
                          ? "bg-gradient-to-r from-red-500/20 via-red-500/10 to-amber-500/10 border-red-500/45 text-white shadow-[0_0_22px_rgba(239,68,68,0.16)]"
                          : "bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.07] hover:border-white/20"
                      }`}
                    >
                      <MoviePoster
                        title={m.title}
                        className="!w-9 !h-9 !aspect-square shrink-0 rounded-lg"
                      />
                      <span
                        className={`flex-1 min-w-0 truncate text-sm font-semibold ${
                          isSelected ? "text-red-200" : "text-white"
                        }`}
                      >
                        {m.title}
                      </span>
                      <span
                        className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-mono border ${
                          isSelected
                            ? "border-red-400/30 bg-red-500/15 text-red-200"
                            : "border-white/10 bg-white/[0.04] text-zinc-400"
                        }`}
                      >
                        {m.runtimeMinutes}m
                      </span>
                    </motion.button>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>

        {/* Right side: large poster & rewatch order panel */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-14 flex flex-col items-center justify-center rounded-2xl border-white/10 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.14),transparent_65%),#0b0b0f]">
                  <div className="h-9 w-9 border-2 border-white/15 border-t-red-500 rounded-full animate-spin mb-4" />
                  <p className="text-sm font-medium text-zinc-300">
                    Computing rewatch order…
                  </p>
                </Card>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="red"
                  className="p-6 rounded-2xl bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.2),transparent_60%),#12080a] border-red-500/35"
                >
                  <CardHeader>
                    <CardTitle className="text-red-400">Error</CardTitle>
                    <CardDescription className="text-red-200/80">
                      {error}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => selectedId && handleRetry(selectedId)}
                      className="rounded-xl border-red-500/30 hover:bg-red-500/10"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" /> Retry
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : order ? (
              <motion.div
                key={`order-${selectedId ?? "default"}`}
                initial={{ opacity: 0, y: 18, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ type: "spring", stiffness: 270, damping: 24 }}
              >
                <Card className="relative overflow-hidden rounded-2xl border-white/15 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.16),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_55%),#0b0b0f] shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
                  <div className="p-5 sm:p-6 pb-0">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-xl">
                      <MoviePoster
                        title={selectedMovie?.title ?? "Rewatch Plan"}
                        priority
                        className="aspect-[21/9] sm:aspect-[24/9] rounded-2xl border-0"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0b0b0f]/95 via-[#0b0b0f]/35 to-transparent"
                      />
                    </div>
                  </div>

                  <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 pb-4 border-b border-white/10">
                    <div>
                      <CardTitle className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        {selectedMovie?.title ?? "Rewatch Plan"}
                      </CardTitle>
                      <CardDescription className="mt-1 text-zinc-400">
                        {order.prerequisites.length} prerequisite
                        {order.prerequisites.length !== 1 ? "s" : ""} •{" "}
                        {order.watchedCount} watched •{" "}
                        {order.unwatchedRuntimeMinutes} min unwatched
                      </CardDescription>
                    </div>
                    <Badge
                      variant="success"
                      className="w-fit inline-flex items-center gap-1.5 px-3 py-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Optimal order
                    </Badge>
                  </CardHeader>

                  <div className="p-5 sm:p-6 space-y-2.5">
                    {order.prerequisites.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.05] to-white/[0.02] hover:border-red-500/30 hover:bg-white/[0.07] transition-all"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[11px] font-bold text-zinc-200">
                          {i + 1}
                        </span>
                        <MoviePoster
                          title={p.title}
                          className="!w-9 !h-9 !aspect-square shrink-0 rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-zinc-400 inline-flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-red-400/80" />
                            {p.runtimeMinutes} min •{" "}
                            <span
                              className={
                                p.watched ? "text-emerald-300" : "text-zinc-300"
                              }
                            >
                              {p.watched ? "Watched" : "Unwatched"}
                            </span>
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-zinc-500 shrink-0" />
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(order.prerequisites.length * 0.06, 0.3),
                        duration: 0.3,
                      }}
                      className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-red-500/35 bg-gradient-to-r from-red-500/20 via-red-500/10 to-amber-500/10 shadow-[0_0_24px_rgba(239,68,68,0.14)]"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/25 border border-red-400/40 flex items-center justify-center text-[10px] font-bold text-red-200">
                        <Play className="h-3 w-3 fill-current" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                          {selectedMovie?.title ?? "Target movie"}
                        </p>
                        <p className="text-[11px] text-red-200/85">
                          Watch after prerequisites
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <CardFooter className="pt-5 pb-6 px-6 border-t border-white/10 bg-black/30 flex flex-wrap items-center justify-between gap-6">
                    <div>
                      <p className="text-xs text-zinc-400">
                        Total unwatched runtime
                      </p>
                      <p className="text-xl font-black text-white">
                        {order.unwatchedRuntimeMinutes} min
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-400">Watched count</p>
                      <p className="text-xl font-black text-red-400">
                        {order.watchedCount}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <Card className="p-14 flex flex-col items-center justify-center text-center rounded-2xl border-dashed border-white/15 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent_65%),#09090d]">
                <p className="text-sm text-zinc-400">
                  Select a movie to see its rewatch plan.
                </p>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
