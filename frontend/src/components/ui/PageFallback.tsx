"use client";

import { Film } from "lucide-react";

interface PageFallbackProps {
  label?: string;
}

export function PageFallback({ label = "Loading view..." }: PageFallbackProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex flex-col items-center justify-center min-h-[280px] rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 animate-pulse">
          <Film className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium text-zinc-300">{label}</p>
        <div className="mt-6 grid w-full max-w-2xl grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="h-16 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-16 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-16 rounded-xl bg-white/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
