"use client";

import { CheckCircle2, Trash2 } from "lucide-react";
import type { DeckCardOption } from "@/types";

interface CardEditorOptionItemProps {
  opt: DeckCardOption;
  isCorrect: boolean;
  canRemove: boolean;
  onSelectCorrect: () => void;
  onUpdateText: (text: string) => void;
  onRemove: () => void;
}

export function CardEditorOptionItem({
  opt,
  isCorrect,
  canRemove,
  onSelectCorrect,
  onUpdateText,
  onRemove,
}: CardEditorOptionItemProps) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border p-2 transition ${
        isCorrect
          ? "border-[#2E7D32] bg-[#F0FDF4] shadow-2xs"
          : "border-[#E2E8F0] bg-white hover:border-[#E2E8F0]"
      }`}
    >
      <button
        type="button"
        onClick={onSelectCorrect}
        className={`h-7 w-7 rounded-lg text-xs font-black flex items-center justify-center cursor-pointer transition shrink-0 ${
          isCorrect
            ? "bg-[#2E7D32] text-white"
            : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#2E7D32]"
        }`}
        title="Klik untuk jadikan kunci jawaban"
      >
        {opt.key}
      </button>

      <input
        type="text"
        value={opt.text}
        onChange={(e) => onUpdateText(e.target.value)}
        placeholder={`Teks pilihan jawaban ${opt.key}...`}
        className="flex-1 bg-transparent px-2 py-1 text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
      />

      {isCorrect && (
        <span className="flex items-center gap-1 pr-1 sm:pr-2 text-xs font-bold text-[#2E7D32] shrink-0" title="Kunci Jawaban">
          <CheckCircle2 size={15} />
          <span className="hidden sm:inline">Kunci Jawaban</span>
        </span>
      )}

      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#B3261E] hover:bg-[#FBEAEB] transition cursor-pointer shrink-0"
          title={`Hapus Pilihan ${opt.key}`}
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
