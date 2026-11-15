import { KeyRound } from "lucide-react";
import type { UserResetConfirmStepProps } from "@/types";

export function UserResetConfirmStep({
  user,
  isLoading,
  onCancel,
  onConfirm,
}: UserResetConfirmStepProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
        Apakah Anda yakin ingin mereset kata sandi akun untuk:
      </p>
      <div
        className="rounded-xl bg-[#F8FAFC] dark:bg-[#141720] border
          border-[#E2E8F0] dark:border-[#282E3E] p-3 text-xs"
      >
        <p className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">
          {user.name}
        </p>
        <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
          {user.email}
        </p>
      </div>
      <p className="text-[11px] text-[#94A3B8] dark:text-[#64748B]">
        Sistem akan membuat kata sandi sementara otomatis yang bisa Anda bagikan kepada pengguna.
      </p>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="h-9 px-4 rounded-xl border border-[#E2E8F0]
            dark:border-[#282E3E] text-xs font-semibold text-[#64748B]
            dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#252B39]"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl
            bg-[#8A1F2D] text-white text-xs font-bold shadow-2xs
            hover:bg-[#6E1622] transition disabled:opacity-60"
        >
          <KeyRound size={13} />
          <span>{isLoading ? "Mereset..." : "Ya, Reset Sandi"}</span>
        </button>
      </div>
    </div>
  );
}
