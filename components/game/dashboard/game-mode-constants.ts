import { Gamepad2, Disc, Swords } from "lucide-react";
import type { GameCardConfig } from "@/types";

export type { GameCardConfig };

export const GAME_CARDS: GameCardConfig[] = [
  {
    type: "FLIP_CARD",
    title: "Flip Card Interaktif",
    icon: Gamepad2,
    iconBg: "bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]",
    image: "",
  },
  {
    type: "SPIN_WHEEL",
    title: "Roda Acak (Spin Wheel)",
    icon: Disc,
    iconBg: "bg-[#FFF8E6] text-[#9A6200] border-[#F2DEB0]",
    image: "",
  },
  {
    type: "MATH_BATTLE_2P",
    title: "Duel 2 Tim (Battle Arena)",
    icon: Swords,
    iconBg: "bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]",
    image: "",
  },
];
