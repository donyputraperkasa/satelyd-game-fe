"use client";

import { Plus } from "lucide-react";
import type { CardEditorSidebarProps } from "@/types";

export function CardEditorSidebar({
  cards,
  activeCardIndex,
  totalPoints,
  onSelectCard,
  onAddCard,
  isTokenUnlocked = false,
}: CardEditorSidebarProps) {
  return (
    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E2E8F0] bg-[#FAFAF9] p-3 sm:p-4 flex flex-col shrink-0 overflow-y-auto max-h-36 sm:max-h-44 md:max-h-full">
      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#64748B]">
          Daftar Soal ({cards.length})
        </span>
        <span className="text-[11px] font-bold text-[#0284C7] bg-white px-2 py-0.5 rounded-md border border-[#E2E8F0]">
          Total {totalPoints} Poin
        </span>
      </div>

      {cards.length > 8 ? (
        isTokenUnlocked ? (
          <div className="mb-2 sm:mb-3 px-2.5 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-[10px] text-purple-800 leading-tight font-medium">
            💎 <strong>Deck Unlocked ({cards.length} soal):</strong> Kuota soal tanpa batas telah aktif.
          </div>
        ) : (
          <div className="mb-2 sm:mb-3 px-2.5 py-1.5 rounded-xl bg-[#FFF8E6] border border-[#F2DEB0] text-[10px] text-[#9A6200] leading-tight font-medium">
            ⚠️ <strong>Mode Lengkap ({cards.length} soal):</strong> Kuota gratis maks 8 soal. Menyimpan lebih dari 8 soal memerlukan 1 Token Game (Rp 2.500) untuk membuka kuota permanen.
          </div>
        )
      ) : (
        <div className="mb-2 sm:mb-3 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 leading-tight font-medium">
          🎉 <strong>Gratis:</strong> Deck ini ({cards.length}/8 soal) bisa disimpan dan dimainkan gratis.
        </div>
      )}

      <div className="grid grid-cols-5 md:grid-cols-4 gap-2 flex-1 auto-rows-max">
        {cards.map((c, idx) => {
          const isActive = idx === activeCardIndex;
          const hasText = Boolean(c.frontQuestion?.trim());
          const cardKey =
            c.backAnswer?.match(/^([A-E])\./)?.[1] ||
            (c.options?.[0]?.key ?? "A");
          return (
            <button
              key={c.id || idx}
              type="button"
              onClick={() => onSelectCard(idx)}
              className={`relative h-10 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition cursor-pointer shadow-2xs ${
                isActive
                  ? "bg-[#0284C7] text-white border-2 border-[#0284C7] shadow-sm"
                  : hasText
                  ? "bg-white border border-[#E2E8F0] text-[#0F172A] hover:border-[#0284C7]"
                  : "bg-white/60 border border-dashed border-[#E2E8F0] text-[#64748B] hover:bg-white"
              }`}
            >
              <span>{idx + 1}</span>
              {cardKey && c.questionType !== "ESSAY" && (
                <span
                  className={`text-[9px] font-black ${
                    isActive ? "text-amber-300" : "text-[#64748B]"
                  }`}
                >
                  Kunci: {cardKey}
                </span>
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onAddCard}
          className="h-10 rounded-xl border border-dashed border-[#7A283C]/40 bg-[#F0F9FF]/60 text-[#0284C7] hover:bg-[#F0F9FF] hover:border-[#7A283C] flex items-center justify-center transition cursor-pointer"
          title="Tambah Nomor Soal Baru"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E2E8F0] hidden md:block">
        <button
          type="button"
          onClick={onAddCard}
          className="w-full h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A] hover:bg-[#F0F9FF] transition cursor-pointer shadow-2xs"
        >
          <Plus size={14} />
          <span>Tambah Nomor Soal</span>
        </button>
      </div>
    </div>
  );
}
