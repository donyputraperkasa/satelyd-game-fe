"use client";

import { Sparkles } from "lucide-react";
import type { ExportToExamSummaryProps } from "@/types";

export function ExportToExamSummary({
  subject,
  gradeLevel,
  cardCount,
}: ExportToExamSummaryProps) {
  return (
    <div
      className="mb-5 rounded-2xl border border-[#E2E8F0] dark:border-[#282E3E]
        bg-[#F8FAFC] dark:bg-[#141720] p-3.5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-lg bg-[#F0F9FF] dark:bg-[#252B39] border
            border-[#BAE6FD] dark:border-[#394253] px-2.5 py-1 text-xs
            font-bold text-[#0284C7] dark:text-[#F8FAFC]"
        >
          {subject}
        </span>
        <span
          className="rounded-lg bg-white dark:bg-[#1C202C] border
            border-[#E2E8F0] dark:border-[#282E3E] px-2.5 py-1 text-xs
            font-semibold text-[#573E47] dark:text-[#94A3B8]"
        >
          {gradeLevel}
        </span>
        <span
          className="rounded-lg bg-[#E8F5E9] dark:bg-emerald-950/40 border
            border-[#C8E6C9] dark:border-emerald-800/40 px-2.5 py-1 text-xs
            font-bold text-[#1B4D20] dark:text-emerald-400 inline-flex
            items-center gap-1"
        >
          <Sparkles size={12} />
          {cardCount} Kartu Soal
        </span>
      </div>
      <p
        className="mt-2 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]
          leading-relaxed"
      >
        Semua butir soal pilihan ganda, pilihan opsi, dan kunci jawaban akan
        otomatis disalin ke dalam draf paket ujian baru.
      </p>
    </div>
  );
}
