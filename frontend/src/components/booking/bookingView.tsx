"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket,
  Users,
  RefreshCw,
  Clapperboard,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Armchair,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cinemasApi } from "@/lib/api";
import type { Cinema, BookingQuoteResponse } from "@/types";

export default function BookingView() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [quote, setQuote] = useState<BookingQuoteResponse | null>(null);
  const [selectedCinemaId, setSelectedCinemaId] = useState<string | null>(null);
  const [groupSize, setGroupSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    cinemasApi
      .list()
      .then((data) => {
        if (!active) return;
        setCinemas(data);
        setSelectedCinemaId(
          (prev) => prev ?? (data.length > 0 ? data[0].id : null),
        );
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load cinemas");
      });

    return () => {
      active = false;
    };
  }, []);

  const selectedCinema = cinemas.find((c) => c.id === selectedCinemaId);

  const handleQuote = useCallback(async () => {
    if (!selectedCinemaId) return;
    const size = Number(groupSize);
    if (!size || size < 1) {
      setError("Please enter a valid group size.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await cinemasApi.bookingQuote(selectedCinemaId, size);
      setQuote(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to generate booking quote",
      );
    } finally {
      setLoading(false);
    }
  }, [selectedCinemaId, groupSize]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleQuote();
  };

  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Ambient luxury lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-64 w-[680px] rounded-full bg-gradient-to-r from-red-600/20 via-amber-500/10 to-purple-600/20 blur-3xl"
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-9"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-red-300 mb-2.5">
            <Sparkles className="h-3.5 w-3.5 text-red-400" />
            VIP Group Seat Allocation
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Group <span className="text-red-500">Booking</span>
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400 max-w-2xl">
            Request a bundle quote for your cinema group. Bundles are allocated
            from the cinema&rsquo;s configured bundle sizes.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/20 to-amber-500/10 text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.2)]">
          <Ticket className="h-6 w-6" />
        </div>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Config Panel */}
        <div className="lg:col-span-5 space-y-5">
          {/* Cinema Selector Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.14),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_55%),#0b0b0f] shadow-2xl"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase tracking-wider">
                <Clapperboard className="h-4 w-4 text-red-400" />
                Choose a Cinema Hall
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {cinemas.length === 0 ? (
                <div className="space-y-2">
                  <div className="h-14 rounded-xl bg-white/5 animate-pulse" />
                  <div className="h-14 rounded-xl bg-white/5 animate-pulse" />
                </div>
              ) : (
                cinemas.map((c) => {
                  const active = selectedCinemaId === c.id;
                  return (
                    <motion.button
                      key={c.id}
                      type="button"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedCinemaId(c.id)}
                      className={`group w-full flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left transition-all border ${
                        active
                          ? "bg-gradient-to-r from-red-500/20 via-red-500/10 to-amber-500/10 border-red-500/45 text-white shadow-[0_0_24px_rgba(239,68,68,0.18)]"
                          : "bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.07] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                            active
                              ? "border-red-400/40 bg-red-500/20 text-red-300"
                              : "border-white/10 bg-white/5 text-zinc-400 group-hover:text-white"
                          }`}
                        >
                          <Clapperboard className="h-4 w-4" />
                        </span>
                        <span className="truncate text-sm sm:text-base font-bold tracking-tight text-white">
                          {c.name}
                        </span>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold border ${
                          active
                            ? "border-red-400/30 bg-red-500/15 text-red-200"
                            : "border-white/10 bg-white/5 text-zinc-400"
                        }`}
                      >
                        {c.bundleSizes.join(", ")} seats
                      </span>
                    </motion.button>
                  );
                })
              )}
            </CardContent>
          </motion.div>

          {/* Group Size & Action Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.15),transparent_55%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_55%),#0b0b0f] shadow-2xl"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase tracking-wider">
                <Users className="h-4 w-4 text-red-400" />
                Group Size
              </CardTitle>
              <CardDescription className="text-xs text-zinc-400">
                Enter how many guests are attending together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Users className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    placeholder="e.g. 24"
                    className="h-11 pl-10 rounded-xl bg-white/[0.04] border-white/15 text-white placeholder:text-zinc-500 focus-visible:border-red-500/50"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={loading || !selectedCinemaId || !groupSize}
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-45 disabled:cursor-not-allowed text-white font-bold tracking-wide transition-all shadow-[0_0_28px_rgba(239,68,68,0.35)] hover:shadow-[0_0_36px_rgba(239,68,68,0.55)]"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {loading ? "Generating quote…" : "Get Quote"}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </motion.div>
        </div>

        {/* Right Quote & Result Panel */}
        <div className="lg:col-span-7">
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
                  <div className="h-10 w-10 border-2 border-white/15 border-t-red-500 rounded-full animate-spin mb-4" />
                  <p className="text-sm font-medium text-zinc-300">
                    Calculating optimal seat bundles…
                  </p>
                </Card>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="red"
                  className="p-6 rounded-2xl bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.2),transparent_60%),#12080a] border-red-500/35"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-400">
                      <AlertCircle className="h-5 w-5" />
                      Unable to Generate Quote
                    </CardTitle>
                    <CardDescription className="text-red-200/80">
                      {error}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => void handleQuote()}
                      className="rounded-xl border-red-500/30 hover:bg-red-500/10"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" /> Retry
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : quote ? (
              <motion.div
                key={`quote-${quote.groupSize}-${quote.totalBundles}-${selectedCinemaId}`}
                initial={{ opacity: 0, y: 20, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.985 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
              >
                <Card className="relative overflow-hidden rounded-2xl border-white/15 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_55%),#0b0b0f] shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/15 text-red-400">
                        <Clapperboard className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                          {selectedCinema?.name ?? "Booking Quote"}
                        </CardTitle>
                        <CardDescription className="mt-1 text-zinc-400">
                          Group size:{" "}
                          <span className="font-semibold text-zinc-200">
                            {quote.groupSize}
                          </span>{" "}
                          • Total bundles:{" "}
                          <span className="font-semibold text-zinc-200">
                            {quote.totalBundles}
                          </span>
                        </CardDescription>
                      </div>
                    </div>

                    <Badge
                      variant={quote.possible ? "success" : "red"}
                      className="w-fit inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold"
                    >
                      {quote.possible ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5" />
                      )}
                      {quote.possible ? "Possible" : "Not possible"}
                    </Badge>
                  </CardHeader>

                  {quote.message && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="mx-6 mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs sm:text-sm text-zinc-300 italic"
                    >
                      {quote.message}
                    </motion.div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3.5">
                      Bundle allocation
                    </h3>

                    {quote.bundles.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {quote.bundles.map((b, idx) => (
                          <motion.div
                            key={b.bundleSize}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.08 + idx * 0.06,
                              duration: 0.3,
                            }}
                            whileHover={{ y: -3 }}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] px-4 py-3.5 hover:border-red-500/35 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15 border border-red-500/25 text-red-300">
                                <Armchair className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                                  Bundle size
                                </p>
                                <p className="text-sm font-bold text-white">
                                  {b.bundleSize} seats
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                                Count
                              </p>
                              <p className="text-base font-black text-red-400">
                                ×{b.count}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] text-center py-6 text-zinc-400 text-sm">
                        No bundles allocated.
                      </div>
                    )}
                  </div>

                  <CardFooter className="pt-5 pb-6 px-6 border-t border-white/10 bg-black/30 flex items-center justify-between gap-6">
                    <div>
                      <p className="text-xs text-zinc-400">Total bundles</p>
                      <p className="text-xl font-black text-white">
                        {quote.totalBundles}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-400">Group size</p>
                      <p className="text-xl font-black text-red-400">
                        {quote.groupSize}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-14 flex flex-col items-center justify-center text-center rounded-2xl border-dashed border-white/15 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent_65%),#09090d]">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-red-400">
                    <Ticket className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-zinc-300">
                    Select a cinema and enter group size to get a quote.
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Your optimal bundle breakdown will appear here with smooth
                    transition.
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
