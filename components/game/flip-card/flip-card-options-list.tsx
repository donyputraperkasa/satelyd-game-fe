"use client";

import { CheckCircle2, X } from "lucide-react";
import type { DeckCard } from "@/types";

interface FlipCardOptionsListProps {
  card: DeckCard;
  selectedOptionKey: string | null;
  isAnswerRevealed: boolean;
  correctKey: string;
  onSelectOption: (key: string) => void;
}

export function FlipCardOptionsList({
  card,
  selectedOptionKey,
  isAnswerRevealed,
  correctKey,
  onSelectOption,
}: FlipCardOptionsListProps) {
  if (card.questionType !== "MULTIPLE_CHOICE" || !card.options || card.options.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 pt-2">
      <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
        Pilihan Jawaban (Klik untuk Memilih):
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {card.options.map((opt) => {
          const isSelected = selectedOptionKey === opt.key;
          const isCorrect =
            isAnswerRevealed &&
            (opt.key.toUpperCase() === correctKey ||
              Boolean(card.backAnswer?.toUpperCase().startsWith(opt.key.toUpperCase())));
          const isWrongSelected = isAnswerRevealed && isSelected && !isCorrect;

          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelectOption(opt.key)}
              className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                isCorrect
                  ? "bg-[#EBF7EE] border-[#2E7D32] shadow-md -translate-y-0.5 ring-2 ring-[#2E7D32]/25"
                  : isWrongSelected
                  ? "bg-[#FFF5F5] border-[#E53E3E] shadow-md ring-2 ring-[#E53E3E]/25"
                  : isSelected
                  ? "bg-[#F0F9FF] border-[#0284C7] shadow-md -translate-y-0.5 ring-2 ring-[#0284C7]/20"
                  : "bg-white border-[#E2E8F0] hover:border-[#0284C7]/50 hover:bg-[#F8FAFC] hover:shadow-xs"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-black transition-colors ${
                  isCorrect
                    ? "bg-[#2E7D32] text-white"
                    : isWrongSelected
                    ? "bg-[#E53E3E] text-white"
                    : isSelected
                    ? "bg-[#0284C7] text-white"
                    : "bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]"
                }`}
              >
                {opt.key}
              </span>
              <span
                className={`text-base sm:text-lg font-bold leading-snug pt-0.5 ${
                  isCorrect ? "text-[#1B4D20]" : isWrongSelected ? "text-[#9B1C1C]" : "text-[#0F172A]"
                }`}
              >
                {opt.text}
              </span>

              {isCorrect ? (
                <CheckCircle2 size={22} className="text-[#2E7D32] shrink-0 ml-auto self-center animate-in zoom-in-50 duration-150" />
              ) : isWrongSelected ? (
                <X size={22} className="text-[#E53E3E] shrink-0 ml-auto self-center animate-in zoom-in-50 duration-150" />
              ) : isSelected && !isAnswerRevealed ? (
                <span className="ml-auto text-[11px] font-bold text-[#0284C7] bg-white px-2.5 py-0.5 rounded-full border border-[#BAE6FD] shadow-2xs self-center">
                  Dipilih
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
