"use client";

import type { GameType } from "@/types";

export type { GameType };

const GAME_OPTIONS: { id: GameType; label: string }[] = [
  { id: "FLIP_CARD", label: "Flip Card Game" },
  { id: "SPIN_WHEEL", label: "Roda Acak (Wheel)" },
  { id: "MATH_BATTLE_2P", label: "Duel 2 Player" },
];

interface DeckLaunchModeSelectorProps {
  selectedGame: GameType;
  onSelectGame: (type: GameType) => void;
}

export function DeckLaunchModeSelector({
  selectedGame,
  onSelectGame,
}: DeckLaunchModeSelectorProps) {
  return (
    <div className="space-y-2 mb-4">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
        1. Pilih Jenis Permainan:
      </label>
      <div className="grid grid-cols-3 gap-2">
        {GAME_OPTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectGame(item.id)}
            className={`h-11 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
              selectedGame === item.id
                ? "border-[#0284C7] dark:border-white bg-[#0284C7] dark:bg-white text-white dark:text-[#10131B] shadow-xs"
                : "border-[#E2E8F0] dark:border-[#282E3E] bg-[#F8FAFC] dark:bg-[#141720] text-[#64748B] dark:text-[#94A3B8] hover:bg-white dark:hover:bg-[#222838] hover:text-[#0284C7] dark:hover:text-[#F8FAFC]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
