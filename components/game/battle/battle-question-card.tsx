"use client";

import { Clock, Eye, CheckCircle2, XCircle, ArrowRight, Award } from "lucide-react";
import type { DeckCard } from "@/types";
import type { BattlePhase } from "./use-battle-arena";
import { checkOptionCorrectness } from "./battle-constants";

interface BattleQuestionCardProps {
  card: DeckCard | null;
  cardIndex: number;
  totalCards: number;
  phase: BattlePhase;
  timerSeconds: number;
  selectedOptionKey: string | null;
  failedOptionKeys?: string[];
  correctKey?: string;
  points: number;
  buzzedTeamName?: string;
  onSelectOption: (key: string) => void;
  onNextRound: () => void;
  onAwardEssay: (teamId: string, delta: number) => void;
  teamNames: Record<string, string>;
}

export function BattleQuestionCard({
  card,
  cardIndex,
  totalCards,
  phase,
  timerSeconds,
  selectedOptionKey,
  failedOptionKeys = [],
  correctKey,
  points,
  buzzedTeamName,
  onSelectOption,
  onNextRound,
  onAwardEssay,
  teamNames,
}: BattleQuestionCardProps) {
  if (!card) {
    return (
      <div className="h-full w-full bg-white border border-[#E2E8F0] rounded-3xl p-8 flex flex-col items-center justify-center text-center">
        <p className="text-base font-bold text-[#0F172A]">
          Tidak ada pertanyaan kuis yang tersedia dalam deck ini.
        </p>
      </div>
    );
  }

  const isMultipleChoice = card.questionType === "MULTIPLE_CHOICE";
  const isAnswering = phase === "BUZZED" || phase === "STEAL";
  const isRevealed = phase === "REVEALED";

  return (
    <div className="h-full w-full flex flex-col justify-between bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
      {/* Top Header: Round badge & Points & Timer */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] text-xs font-black">
            Ronde {cardIndex + 1} dari {totalCards}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#FFF8E6] border border-[#F2DEB0] text-[#9A6200] text-xs font-bold">
            +{points} Poin
          </span>
        </div>

        {/* Answering Timer Countdown */}
        {isAnswering ? (
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black border transition-colors ${
              timerSeconds <= 4
                ? "bg-[#FBEAEB] border-[#F2C2C6] text-[#B3261E] animate-pulse"
                : "bg-amber-50 border-amber-200 text-amber-800"
            }`}
          >
            <Clock size={15} />
            <span>0:{String(timerSeconds).padStart(2, "0")}</span>
          </div>
        ) : (
          <div className="text-xs font-semibold text-[#64748B]">
            {isRevealed ? "Ronde Selesai" : "Siap-siap Buzzer!"}
          </div>
        )}
      </div>

      {/* Main Question Body */}
      <div className="space-y-4 flex-1">
        {/* Buzzer Notice Banner (Solid background, no gradients) */}
        {isAnswering && buzzedTeamName && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs font-bold text-[#0F172A]">
            <span>
              🎯 Giliran menjawab: <strong className="text-[#881337]">{buzzedTeamName}</strong>
            </span>
            <span className="text-[11px] text-[#64748B]">Pilih jawaban di bawah:</span>
          </div>
        )}

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-[#0F172A] leading-snug">
          {card.frontQuestion}
        </h2>

        {/* Question Image Attachment */}
        {card.imageUrl && (
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-2 max-w-md mx-auto overflow-hidden shadow-2xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.imageUrl}
              alt="Gambar Soal"
              className="w-full h-auto max-h-[220px] object-contain rounded-xl"
            />
          </div>
        )}

        {/* Options for Multiple Choice */}
        {isMultipleChoice && card.options && card.options.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {card.options.map((opt) => {
              const key = opt.key.toUpperCase();
              const isSelected = selectedOptionKey === key;
              const isFailedOption = failedOptionKeys.includes(key);
              const isCorrect = checkOptionCorrectness(key, card);

              let btnStyle =
                "bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:bg-[#F4ECE8] hover:border-[#0284C7]";

              if (isFailedOption && !isRevealed) {
                // Previously failed option during STEAL phase -> Disabled & clearly struck out
                btnStyle =
                  "bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] opacity-40 line-through cursor-not-allowed pointer-events-none";
              } else if (isRevealed) {
                if (isCorrect) {
                  btnStyle =
                    "bg-[#EBF7EE] border-[#2E7D32] text-[#1E4620] ring-2 ring-[#2E7D32]/30 font-black";
                } else if (isSelected || isFailedOption) {
                  btnStyle = "bg-[#FBEAEB] border-[#B3261E] text-[#68120E] opacity-85";
                } else {
                  btnStyle = "bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] opacity-50";
                }
              } else if (isAnswering) {
                btnStyle =
                  "bg-white border-[#BAE6FD] text-[#0F172A] hover:bg-[#F0F9FF] hover:border-[#0284C7] shadow-2xs cursor-pointer";
              } else {
                // Phase READY (waiting for buzzer)
                btnStyle = "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] cursor-not-allowed opacity-80";
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => onSelectOption(key)}
                  disabled={!isAnswering || isFailedOption}
                  className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all duration-150 select-none ${btnStyle}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E2E8F0] font-black text-xs text-[#0F172A] shadow-2xs">
                    {key}
                  </span>
                  <span className="text-xs sm:text-sm font-bold flex-1">
                    {opt.text}
                  </span>
                  {isRevealed && isCorrect && (
                    <CheckCircle2 size={18} className="text-[#2E7D32] shrink-0" />
                  )}
                  {((isRevealed && (isSelected || isFailedOption) && !isCorrect) ||
                    (!isRevealed && isFailedOption)) && (
                    <XCircle size={18} className="text-[#B3261E] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Essay / Answer Details (Revealed or Essay Mode) */}
        {(!isMultipleChoice || isRevealed) && (
          <div className="space-y-3 pt-2">
            <div className="bg-[#F8FAFC] border border-[#BAE6FD] rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#0284C7]">
                <Eye size={15} />
                <span>Kunci Jawaban & Pembahasan:</span>
              </div>
              <p className="font-bold text-sm text-[#0F172A]">
                {card.backAnswer}
              </p>

              {/* Manual Award Buttons for Essay questions */}
              {!isMultipleChoice && isRevealed && (
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-[#E2E8F0]">
                  <span className="text-[11px] font-semibold text-[#64748B]">
                    Beri Poin ke:
                  </span>
                  <button
                    type="button"
                    onClick={() => onAwardEssay("team-left", points)}
                    className="px-3 py-1.5 rounded-xl bg-[#B3261E] text-white font-bold text-xs hover:bg-[#8F1D17] transition cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Award size={13} />
                    <span>{teamNames["team-left"]} (+{points})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAwardEssay("team-right", points)}
                    className="px-3 py-1.5 rounded-xl bg-[#1557B0] text-white font-bold text-xs hover:bg-[#0E3E80] transition cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Award size={13} />
                    <span>{teamNames["team-right"]} (+{points})</span>
                  </button>
                </div>
              )}
            </div>

            {/* Tombol Ronde Berikutnya Persis di Bawah Kunci Jawaban (Ukuran Besar) */}
            {isRevealed && (
              <button
                type="button"
                onClick={onNextRound}
                className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#0284C7] hover:bg-[#320E17] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer active:scale-[0.99]"
              >
                <span>{cardIndex + 1 < totalCards ? "Ronde Berikutnya" : "Lihat Pemenang"}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Footer Information */}
      <div className="flex items-center justify-between pt-3 mt-auto border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
        <span>
          {isRevealed
            ? "Tekan tombol di atas atau tekan [Spasi] pada keyboard"
            : "Kedua tim adu cepat menekan tombol Buzzer"}
        </span>
        <span className="font-bold text-[#0F172A]">
          Ronde {cardIndex + 1} / {totalCards}
        </span>
      </div>
    </div>
  );
}
