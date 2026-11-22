"use client";

import React from "react";
import Image from "next/image";
import { Film } from "lucide-react";
import { getMoviePoster } from "@/lib/moviePosters";

interface MoviePosterProps {
  title: string;
  className?: string;
  priority?: boolean;
}

export function MoviePoster({
  title,
  className = "",
  priority = false,
}: MoviePosterProps) {
  const [failed, setFailed] = React.useState(false);
  const posterUrl = !failed ? getMoviePoster(title) : null;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 ${className}`}
    >
      {posterUrl ? (
        <Image
          src={posterUrl}
          alt={title}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-red-950/60 via-zinc-900 to-black p-4 text-center">
          <Film className="h-6 w-6 text-red-400 mb-1.5" />
          <p className="text-xs font-semibold text-zinc-200 line-clamp-1">
            {title}
          </p>
        </div>
      )}
    </div>
  );
}
