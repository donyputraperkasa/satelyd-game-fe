"use client";

import { ShieldCheck, GraduationCap, Users } from "lucide-react";
import type { ProfileRoleSelectorProps } from "./types";

export function ProfileRoleSelector({ isAdmin, role, setRole }: ProfileRoleSelectorProps) {
  if (isAdmin) {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] dark:bg-[#141720] border border-[#E2E8F0] dark:border-[#282E3E] p-2.5 text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
        <ShieldCheck size={16} className="text-[#C67D00]" />
        <span>Administrator / Owner Sistem</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => setRole("TEACHER")}
        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
          role === "TEACHER"
            ? "bg-[#0284C7] dark:bg-white text-white dark:text-[#10131B] border-[#0284C7] dark:border-white shadow-2xs"
            : "bg-white dark:bg-[#141720] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#282E3E] hover:bg-[#F8FAFC] dark:hover:bg-[#202634]"
        }`}
      >
        <GraduationCap size={15} />
        <span>Guru / Pendidik</span>
      </button>
      <button
        type="button"
        onClick={() => setRole("USER")}
        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
          role === "USER"
            ? "bg-[#0284C7] dark:bg-white text-white dark:text-[#10131B] border-[#0284C7] dark:border-white shadow-2xs"
            : "bg-white dark:bg-[#141720] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#282E3E] hover:bg-[#F8FAFC] dark:hover:bg-[#202634]"
        }`}
      >
        <Users size={15} />
        <span>Non-Guru / Umum</span>
      </button>
    </div>
  );
}
