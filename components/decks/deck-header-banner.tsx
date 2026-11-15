"use client";

import { Layers, BookOpen, Plus } from "lucide-react";
import type { DeckHeaderBannerProps } from "@/types";

export function DeckHeaderBanner({ onCreateNew, onOpenGuide }: DeckHeaderBannerProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A] dark:text-[#F8FAFC] transition-colors">
          Pustaka Deck & Bank Soal
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] transition-colors">
          Kelola kumpulan kartu pertanyaan kuis interaktif untuk Smart TV Kelas dan paket Ujian Sekolah.
        </p>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
        <button
          type="button"
          onClick={onOpenGuide}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#BAE6FD] bg-[#F0F9FF] text-xs font-bold text-[#0284C7] hover:bg-[#0284C7] hover:border-[#0284C7] hover:text-white dark:border-[#282E3E] dark:bg-[#1C202C] dark:text-[#F8FAFC] dark:hover:bg-[#222838] transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-[#0284C7]/20 hover:-translate-y-0.5 cursor-pointer"
          title="Buka panduan lengkap pengelolaan deck"
        >
          <BookOpen size={15} />
          <span>Panduan Deck</span>
        </button>
        <button
          type="button"
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#0284C7] dark:bg-white text-xs font-bold text-white dark:text-[#10131B] hover:bg-[#0369A1] dark:hover:bg-[#F1F5F9] transition-all duration-200 shadow-md shadow-[#0284C7]/20 hover:shadow-lg hover:shadow-[#0284C7]/30 hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus size={16} />
          <span>Buat Deck Baru</span>
        </button>
      </div>
    </div>
  );
}
