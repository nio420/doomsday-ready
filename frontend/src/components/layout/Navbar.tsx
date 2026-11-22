"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Navigation2, Ticket, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/", label: "Home", Icon: Sparkles },
  { href: "/movies", label: "Movies", Icon: Film },
  { href: "/rewatch-plan", label: "Rewatch Plan", Icon: Navigation2 },
  { href: "/booking", label: "Booking", Icon: Ticket },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 group-hover:scale-105 group-hover:bg-red-500/25 transition-all">
            <Film className="h-4 w-4" />
          </span>
          <span className="font-black text-lg sm:text-xl tracking-tight text-white">
            DOOMSDAY<span className="text-red-500">READY</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5">
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeNavPill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-red-500/15 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.18)]"
                  />
                )}
                <Icon className="relative z-10 h-4 w-4 text-red-400" />
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="text-zinc-200 hover:bg-white/10"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-[#08080b]/95 backdrop-blur-2xl"
          >
            <nav className="flex flex-col gap-1.5 px-4 py-4">
              {NAV_ITEMS.map(({ href, label, Icon }) => {
                const active =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      active
                        ? "bg-red-500/15 text-red-300 border border-red-500/30"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-red-400" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
