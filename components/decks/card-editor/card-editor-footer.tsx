"use client";

import { Save } from "lucide-react";
import type { CardEditorFooterProps } from "@/types";

export function CardEditorFooter({
  onClose,
  onSave,
  isSaving,
}: CardEditorFooterProps) {
  return (
    <div className="flex items-center justify-between gap-2.5 border-t border-[#E2E8F0] bg-white px-4 sm:px-6 py-3 sm:py-3.5 shrink-0">
      <button
        type="button"
        onClick={onClose}
        className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#64748B] hover:bg-[#F0F9FF] transition cursor-pointer"
      >
        Tutup
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0284C7] px-4 sm:px-5 text-xs font-black text-white hover:bg-[#0369A1] transition cursor-pointer shadow-xs disabled:opacity-50"
        >
          <Save size={15} />
          <span>{isSaving ? "Menyimpan..." : "Simpan Semua Kartu"}</span>
        </button>
      </div>
    </div>
  );
}
