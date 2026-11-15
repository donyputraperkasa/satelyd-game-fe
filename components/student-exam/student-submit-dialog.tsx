"use client";

import { Send, AlertCircle, CheckCircle2, Bookmark, X } from "lucide-react";

interface StudentSubmitDialogProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  doubtfulCount: number;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function StudentSubmitDialog({
  isOpen,
  totalQuestions,
  answeredCount,
  doubtfulCount,
  isLoading,
  onConfirm,
  onCancel,
}: StudentSubmitDialogProps) {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;
  const hasIncomplete = unansweredCount > 0 || doubtfulCount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-2xl relative">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-5 right-5 text-[#64748B] hover:text-[#0284C7] transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#F0F9FF] flex items-center justify-center text-[#0F172A] shrink-0">
            <Send size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">Kumpulkan Lembar Ujian?</h3>
            <p className="text-xs text-[#64748B]">Pastikan Anda telah memeriksa semua jawaban.</p>
          </div>
        </div>

        {/* Ringkasan status */}
        <div className="my-4 space-y-2 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#1D6C31] font-semibold">
              <CheckCircle2 size={15} /> Sudah Terjawab:
            </span>
            <span className="font-bold text-[#1D6C31]">{answeredCount} dari {totalQuestions}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-amber-800 font-semibold">
              <Bookmark size={15} className="fill-amber-500 text-amber-500" /> Ditandai Ragu-Ragu:
            </span>
            <span className="font-bold text-amber-800">{doubtfulCount} Soal</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-red-700 font-semibold">
              <AlertCircle size={15} /> Belum Dijawab:
            </span>
            <span className="font-bold text-red-700">{unansweredCount} Soal</span>
          </div>
        </div>

        {hasIncomplete && (
          <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 leading-relaxed">
            ⚠️ Masih ada soal yang kosong atau bertanda ragu-ragu. Jawaban yang belum diisi akan bernilai 0.
          </p>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:text-[#0284C7] transition cursor-pointer"
          >
            Periksa Kembali
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-xs font-bold text-white shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            <Send size={14} />
            <span>{isLoading ? "Mengumpulkan..." : "Kumpulkan Jawaban"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
