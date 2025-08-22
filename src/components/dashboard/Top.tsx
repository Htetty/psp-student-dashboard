"use client";

import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

function NavPill({
  children,
  active = false,
  label,
}: {
  children: React.ReactNode;
  active?: boolean;
  label?: string;
}) {
  return (
    <button
      className={[
        "h-11 w-11 rounded-2xl flex items-center justify-center transition-all duration-200",
        active
          ? "bg-neutral-900 text-white shadow-lg shadow-white/10 ring-1 ring-white/20"
          : "bg-neutral-800/70 text-neutral-400 hover:bg-neutral-700 hover:text-white hover:scale-105",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
      title={label}
    >
      <span className="sr-only">{label}</span>
      {children}
    </button>
  );
}

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="backdrop-blur-xl bg-black/80 border-b border-white/10 shadow-md">
        <div className="px-0">
          <div className="flex items-center justify-between py-3">
            {/* Left: logo + title */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-300 flex items-center justify-center overflow-hidden shadow-inner">
                <img
                  src="/images/SkylineLogo.png"
                  alt="Skyline logo"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
                Promise Scholars Program
              </h1>
            </div>

            {/* Right: Nav + Avatar */}
            <div className="flex items-center gap-3">
              <nav className="flex items-center gap-3">
                <NavPill active label="Home">
                  <HomeIcon className="w-6 h-6" />
                </NavPill>
                <NavPill label="Calendar">
                  <CalendarIcon className="w-6 h-6" />
                </NavPill>
                <NavPill label="Progress">
                  <ChartBarIcon className="w-6 h-6" />
                </NavPill>
                <NavPill label="Settings">
                  <Cog6ToothIcon className="w-6 h-6" />
                </NavPill>
              </nav>
              {/* Avatar */}
              <div className="h-10 w-10 rounded-full bg-neutral-600 flex items-center justify-center text-white font-semibold ring-2 ring-white/20 shadow-md">
                HS
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
