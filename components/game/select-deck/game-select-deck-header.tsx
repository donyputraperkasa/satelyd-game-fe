"use client";

import { X, Sparkles } from "lucide-react";
import type { GameType } from "@/types";
import { GAME_METADATA } from "./game-select-deck-constants";

interface GameSelectDeckHeaderProps {
  gameType: GameType;
  onClose: () => void;
}

export function GameSelectDeckHeader({
  gameType,
  onClose,
}: GameSelectDeckHeaderProps) {
  const meta = GAME_METADATA[gameType] || GAME_METADATA.FLIP_CARD;

  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#EADEE2] pb-4">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#0F172A]">
            Pilih Draft Soal untuk {meta.title}
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">{meta.subtitle}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex h-9 w-9 items-center justify-center rounded-xl
          text-[#64748B] transition hover:bg-[#F0F9FF] hover:text-[#0284C7] cursor-pointer"
        title="Tutup"
      >
        <X size={18} />
      </button>
    </div>
  );
}
