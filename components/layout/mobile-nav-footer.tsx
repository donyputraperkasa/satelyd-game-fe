"use client";

import { LogOut, Moon, Sun, User as UserIcon } from "lucide-react";
import Link from "next/link";
import type { User } from "@/types";

interface MobileNavFooterProps {
  theme?: "light" | "dark";
  onSelectTheme?: (theme: "light" | "dark") => void;
  user: User | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
  onClose: () => void;
}

export function MobileNavFooter({
  theme = "light",
  onSelectTheme,
  user,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  onClose,
}: MobileNavFooterProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Theme Toggle Pill */}
      <div className="flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#1C202C] p-1 rounded-full border border-[#E2E8F0] dark:border-[#282E3E]">
        <button
          type="button"
          onClick={() => onSelectTheme?.("light")}
          className={`flex items-center justify-center shrink-0 p-2 rounded-full transition cursor-pointer ${
            theme === "light"
              ? "bg-[#0284C7] text-white shadow-sm"
              : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#F8FAFC]"
          }`}
          title="Mode Terang"
          aria-label="Mode Terang"
        >
          <Sun size={17} />
        </button>
        <button
          type="button"
          onClick={() => onSelectTheme?.("dark")}
          className={`flex items-center justify-center shrink-0 p-2 rounded-full transition cursor-pointer ${
            theme === "dark"
              ? "bg-white text-[#10131B] shadow-sm"
              : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#F8FAFC]"
          }`}
          title="Mode Gelap"
          aria-label="Mode Gelap"
        >
          <Moon size={17} />
        </button>
      </div>

      {/* Auth Actions */}
      {user ? (
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-[#0284C7] text-white dark:bg-white dark:text-[#10131B] text-xs font-bold shadow-xs hover:bg-[#0369A1] dark:hover:bg-[#F1F5F9]"
          >
            Dashboard
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F9FF] dark:bg-[#1C202C] border border-[#BAE6FD] dark:border-[#282E3E] text-xs font-semibold text-[#0284C7] dark:text-[#F8FAFC]">
            <UserIcon size={13} />
            {user.name.split(" ")[0]}
          </span>
          <button
            type="button"
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="p-1.5 rounded-full text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEF2F2] dark:text-[#94A3B8] dark:hover:bg-[#1C202C] dark:hover:text-[#F8FAFC] transition cursor-pointer"
            title="Keluar"
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="px-4 py-2 text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#0284C7] transition cursor-pointer"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="px-4 py-2 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white dark:bg-white dark:hover:bg-[#F1F5F9] dark:text-[#10131B] text-xs font-bold shadow-xs transition cursor-pointer"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}
