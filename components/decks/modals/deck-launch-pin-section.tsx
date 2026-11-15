"use client";

import { Copy, Check } from "lucide-react";

interface DeckLaunchPinSectionProps {
  sessionPin: string;
  copied: boolean;
  onCopy: () => void;
}

export function DeckLaunchPinSection({
  sessionPin,
  copied,
  onCopy,
}: DeckLaunchPinSectionProps) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
        2. Hubungkan ke Smart TV:
      </label>

      <div className="rounded-2xl border border-[#BAE6FD] dark:border-[#282E3E] bg-[#F8FAFC] dark:bg-[#141720] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#0284C7] dark:text-[#C67D00] uppercase tracking-wider">
            KODE PIN SESI:
          </span>
          <span className="rounded-full bg-[#F0F9FF] dark:bg-[#C67D00]/15 border border-[#BAE6FD] dark:border-[#C67D00]/30 px-2 py-0.5 text-[10px] font-bold text-[#0284C7] dark:text-[#FBBF24]">
            Tanpa Login di TV
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 bg-white dark:bg-[#1C202C] border border-[#E2E8F0] dark:border-[#282E3E] rounded-xl p-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl sm:text-3xl font-black tracking-widest text-[#0F172A] dark:text-[#F8FAFC]">
              {sessionPin}
            </span>
          </div>

          <button
            type="button"
            onClick={onCopy}
            className="flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#282E3E] bg-[#F8FAFC] dark:bg-[#141720] hover:bg-[#F0F9FF] dark:hover:bg-[#222838] px-3.5 py-2 text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[#2E7D32] dark:text-emerald-400" />
                <span className="text-[#2E7D32] dark:text-emerald-400">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Salin PIN</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
          Buka browser di Smart TV Kelas, kunjungi <strong className="text-[#0F172A] dark:text-[#F8FAFC]">satelyd.com/tv</strong> lalu masukkan PIN di atas untuk langsung mulai sesi bermain bersama siswa.
        </p>
      </div>
    </div>
  );
}
