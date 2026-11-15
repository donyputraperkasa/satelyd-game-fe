"use client";

interface FlipCardModalFooterProps {
  onFinish: () => void;
}

export function FlipCardModalFooter({ onFinish }: FlipCardModalFooterProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] shrink-0">
      <span className="text-xs text-[#64748B]">
        Tekan tombol <strong>Selesai</strong> untuk kembali ke papan nomor kartu.
      </span>
      <button
        type="button"
        onClick={onFinish}
        className="px-6 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer"
      >
        Tandai Selesai & Kembali
      </button>
    </div>
  );
}
