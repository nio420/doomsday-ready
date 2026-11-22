import Link from "next/link";
import { Film } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-8 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <Film className="h-4 w-4 text-red-500" />
          <span className="font-semibold text-zinc-200">Doomsday Ready</span>
          <span>•</span>
          <span>Cinematic Watch-Party Planner</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-zinc-500">
          <Link
            href="/movies"
            className="hover:text-zinc-200 transition-colors"
          >
            Movies
          </Link>
          <Link
            href="/rewatch-plan"
            className="hover:text-zinc-200 transition-colors"
          >
            Rewatch Plan
          </Link>
          <Link
            href="/booking"
            className="hover:text-zinc-200 transition-colors"
          >
            Booking
          </Link>
        </div>
      </div>
    </footer>
  );
}
