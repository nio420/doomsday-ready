"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Film,
  Clock,
  Eye,
  Search,
  RefreshCw,
  Play,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { MoviePoster } from "@/components/ui/MoviePoster";
import { moviesApi } from "@/lib/api";
import type { Movie } from "@/types";

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  return (
    <Dialog>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.05, 0.35), duration: 0.38 }}
        whileHover={{ y: -6 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.15),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.07),transparent_55%),#0c0c10] p-4 shadow-xl hover:border-red-500/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.7)] transition-all"
      >
        <div>
          <div className="relative overflow-hidden rounded-xl mb-3.5 border border-white/10">
            <MoviePoster title={movie.title} priority={index < 4} />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0c0c10]/95 via-[#0c0c10]/35 to-transparent"
            />
          </div>

          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-semibold text-zinc-300">
              {movie.releaseYear}
            </span>
            <Badge
              variant={movie.watched ? "success" : "red"}
              className="text-[11px] font-semibold"
            >
              {movie.watched ? "Watched" : "Unwatched"}
            </Badge>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
            {movie.title}
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-red-400/80" />
              {movie.runtimeMinutes}m
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5 text-zinc-400" />
              {movie.prerequisites?.length ?? 0} prereqs
            </span>
          </div>

          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg border border-red-500/20 bg-red-500/10 text-xs font-semibold text-red-300 hover:bg-red-500/20 hover:text-white px-2.5 h-7 transition-all"
            >
              Details
            </Button>
          </DialogTrigger>
        </div>
      </motion.article>

      <DialogContent className="sm:max-w-lg rounded-2xl bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.16),transparent_55%),#0b0b0f] border-white/15 text-white shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
        <DialogHeader>
          <div className="relative overflow-hidden rounded-xl mb-3 border border-white/10">
            <MoviePoster title={movie.title} />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/40 to-transparent"
            />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {movie.title}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Released {movie.releaseYear} • {movie.runtimeMinutes} minutes •{" "}
            <span
              className={
                movie.watched
                  ? "text-emerald-300 font-medium"
                  : "text-red-300 font-medium"
              }
            >
              {movie.watched ? "Watched" : "Unwatched"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <Separator className="bg-white/10" />

        <div className="space-y-4 py-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Prerequisites ({movie.prerequisites?.length ?? 0})
            </p>
            {movie.prerequisites && movie.prerequisites.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {movie.prerequisites.map((p) => (
                  <span
                    key={p.id}
                    className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-zinc-200"
                  >
                    {p.title}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500">
                No prerequisites required for this movie.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                variant="red"
                asChild
                className="w-full rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-[0_0_24px_rgba(239,68,68,0.35)]"
              >
                <Link href="/rewatch-plan">
                  <Play className="h-4 w-4 mr-2 fill-current" />
                  Rewatch Order
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                variant="outline"
                asChild
                className="w-full rounded-xl border-white/15 bg-white/[0.04] hover:bg-white/[0.1]"
              >
                <Link href="/booking">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Group Booking
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MovieView() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [watchedFilter, setWatchedFilter] = useState<
    "all" | "watched" | "unwatched"
  >("all");

  useEffect(() => {
    let active = true;
    moviesApi
      .list()
      .then((data) => {
        if (!active) return;
        setMovies(data);
        setError(null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load movies");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await moviesApi.list();
      setMovies(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return movies.filter((movie) => {
      const matchesSearch = !q || movie.title.toLowerCase().includes(q);
      const matchesWatch =
        watchedFilter === "all" ||
        (watchedFilter === "watched" && movie.watched) ||
        (watchedFilter === "unwatched" && !movie.watched);
      return matchesSearch && matchesWatch;
    });
  }, [movies, searchQuery, watchedFilter]);

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-60 w-[720px] rounded-full bg-gradient-to-r from-red-600/15 via-rose-500/10 to-amber-500/10 blur-3xl"
      />

      {/* Header & Controls */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-9"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-red-300 mb-2.5">
            <Sparkles className="h-3.5 w-3.5 text-red-400" />
            Curated Lineup
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Movies{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              Catalog
            </span>
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            Browse all watch-party titles, filter by watch status, and inspect
            prerequisites.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0b0f]/90 p-2.5 shadow-xl backdrop-blur-md">
          <div className="relative flex-1 sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-9 rounded-xl bg-white/[0.04] border-white/10 text-white placeholder:text-zinc-500 focus-visible:border-red-500/50"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {(["all", "watched", "unwatched"] as const).map((mode) => {
              const active = watchedFilter === mode;
              return (
                <Button
                  key={mode}
                  type="button"
                  size="sm"
                  variant={active ? "red" : "outline"}
                  onClick={() => setWatchedFilter(mode)}
                  className={`capitalize rounded-xl flex-1 sm:flex-initial ${
                    active
                      ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_18px_rgba(239,68,68,0.35)]"
                      : "border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08]"
                  }`}
                >
                  {mode}
                </Button>
              );
            })}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void handleRefresh()}
            className="gap-2 rounded-xl border-white/10 bg-white/[0.03] text-zinc-200 hover:bg-white/[0.08]"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-72 rounded-2xl border border-white/10 bg-white/[0.03] p-5 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="relative z-10 rounded-2xl border border-red-500/30 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_65%),#12080a] p-8 text-center max-w-lg mx-auto shadow-2xl">
          <Film className="h-8 w-8 text-red-400 mx-auto mb-3" />
          <h2 className="text-base font-bold text-white">
            Unable to load movies
          </h2>
          <p className="mt-1 text-sm text-red-200/80">{error}</p>
          <Button
            type="button"
            variant="red"
            className="mt-5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600"
            onClick={() => void handleRefresh()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="relative z-10 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent_65%),#0b0b0f] p-12 text-center">
          <p className="text-sm text-zinc-400">
            No movies match your current search or filter.
          </p>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
