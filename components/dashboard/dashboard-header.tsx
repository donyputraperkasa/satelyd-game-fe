"use client";

import { useEffect, useState } from "react";
import { Gamepad2, GraduationCap, Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import type { DashboardHeaderProps } from "@/types";
import { DashboardBreadcrumbs } from "./dashboard-breadcrumbs";

function formatCompactTokens(val: number): string {
  if (val >= 1_000_000) {
    const formatted = (val / 1_000_000).toFixed(1).replace(/\.0$/, "");
    return `${formatted}M`;
  }
  if (val >= 100_000) {
    return `${Math.floor(val / 1_000)}k`;
  }
  if (val >= 1_000) {
    const formatted = (val / 1_000).toFixed(1).replace(/\.0$/, "");
    return `${formatted}k`;
  }
  return val.toLocaleString("id-ID");
}

export function DashboardHeader({ user, onOpenSidebar }: DashboardHeaderProps) {
  const gameTokens = user.gameTokenBalance ?? 50;
  const examTokens = user.examCreditBalance ?? 100;
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme === "dark" || (!savedTheme && document.documentElement.classList.contains("dark"))) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="w-full h-16 bg-white dark:bg-[#0F1219] border-b border-[#E2E8F0] dark:border-[#242A38] px-4 sm:px-6 md:px-8 sticky top-0 z-30 transition-colors">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand / Desktop Breadcrumbs */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onOpenSidebar && (
            <button
              type="button"
              onClick={onOpenSidebar}
              className="p-1.5 sm:p-2 -ml-1 rounded-lg text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#1C202C] md:hidden cursor-pointer shrink-0"
              aria-label="Buka menu navigasi"
            >
              <Menu size={20} />
            </button>
          )}

          {/* Logo brand only on mobile */}
          <div className="flex items-center gap-1.5 md:hidden shrink-0">
            <span className="font-display text-lg font-black tracking-tight text-[#0284C7] dark:text-[#F8FAFC]">
              satel<span className="text-[#F59E0B] dark:text-[#C67D00]">y</span>d
            </span>
            <span className="text-[9px] font-extrabold uppercase px-1 py-0.2 rounded bg-[#F0F9FF] dark:bg-[#1C202C] text-[#0284C7] dark:text-[#E6B85C] border border-[#BAE6FD] dark:border-[#282E3E]">
              game
            </span>
          </div>

          <div className="hidden md:flex items-center min-w-0">
            <DashboardBreadcrumbs />
          </div>
        </div>

        {/* Right Section: Theme Toggle & Token Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center bg-[#F1F5F9] dark:bg-[#1C202C] p-0.5 rounded-full border border-[#E2E8F0] dark:border-[#282E3E] transition-colors">
            <button
              type="button"
              onClick={() => handleThemeChange("light")}
              className={`flex items-center justify-center shrink-0 p-1.5 rounded-full transition cursor-pointer ${
                theme === "light"
                  ? "bg-[#0284C7] text-white shadow-xs"
                  : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#F8FAFC]"
              }`}
              title="Mode Terang"
              aria-label="Mode Terang"
            >
              <Sun size={13} />
            </button>
            <button
              type="button"
              onClick={() => handleThemeChange("dark")}
              className={`flex items-center justify-center shrink-0 p-1.5 rounded-full transition cursor-pointer ${
                theme === "dark"
                  ? "bg-white text-[#10131B] shadow-xs"
                  : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#F8FAFC]"
              }`}
              title="Mode Gelap"
              aria-label="Mode Gelap"
            >
              <Moon size={13} />
            </button>
          </div>

          <Link
            href="/dashboard/tokens"
            className="h-8 sm:h-9 inline-flex items-center rounded-full bg-white dark:bg-[#1C202C] border border-[#E2E8F0] dark:border-[#282E3E] text-[#0F172A] dark:text-[#F8FAFC] shadow-2xs hover:border-[#BAE6FD] dark:hover:border-[#475569] hover:bg-[#F0F9FF] dark:hover:bg-[#222838] transition shrink-0 px-1.5 sm:px-2"
            title={`Kelola Token: Game (${gameTokens.toLocaleString("id-ID")}), Publish Ujian (${examTokens.toLocaleString("id-ID")})`}
          >
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5">
              <Gamepad2 size={15} className="text-[#C67D00] shrink-0" />
              <span className="hidden sm:inline text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Game</span>
              <span className="font-extrabold text-xs sm:text-[13px] text-[#0F172A] dark:text-[#F8FAFC] tracking-normal">
                {formatCompactTokens(gameTokens)}
              </span>
            </span>

            <span className="h-3.5 w-[1px] bg-[#E2E8F0] dark:bg-[#282E3E]" />

            <span className="inline-flex items-center gap-1.5 px-2 py-0.5">
              <GraduationCap size={15} className="text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
              <span className="hidden sm:inline text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Ujian</span>
              <span className="font-extrabold text-xs sm:text-[13px] text-[#0F172A] dark:text-[#F8FAFC] tracking-normal">
                {formatCompactTokens(examTokens)}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
