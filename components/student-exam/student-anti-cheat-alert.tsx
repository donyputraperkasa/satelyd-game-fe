"use client";

import { ShieldAlert, AlertTriangle, Lock } from "lucide-react";

interface StudentAntiCheatAlertProps {
  isOpen: boolean;
  violationCount: number;
  maxViolations?: number;
  isBlocked?: boolean;
  isChecking?: boolean;
  onDismiss: () => void;
  onRefreshStatus?: () => void;
}

export function StudentAntiCheatAlert({
  isOpen,
  violationCount,
  maxViolations = 3,
  isBlocked = false,
  isChecking = false,
  onDismiss,
  onRefreshStatus,
}: StudentAntiCheatAlertProps) {
  if (!isOpen) return null;

  const remainingChances = Math.max(0, maxViolations - violationCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0284C7]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-7 shadow-2xl">
        {/* Icon & Title */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#0F172A] flex items-center justify-center shrink-0">
            {isBlocked ? <Lock size={24} className="text-[#8A1F2D]" /> : <ShieldAlert size={26} className="text-[#8A1F2D]" />}
          </div>
          <div>
            <h3 className="text-lg font-black text-[#0F172A] tracking-tight">
              {isBlocked ? "Lembar Ujian Terkunci!" : "Peringatan Integritas Ujian"}
            </h3>
            <p className="text-xs font-semibold text-[#8A1F2D]">
              {isBlocked
                ? "Batas Maksimal Pelanggaran Tercapai"
                : `Pelanggaran Ke-${violationCount} dari ${maxViolations} Toleransi`}
            </p>
          </div>
        </div>

        {/* Status Dots Indicator */}
        <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-[#E2E8F0] mb-4">
          {Array.from({ length: maxViolations }).map((_, idx) => {
            const isHit = idx < violationCount;
            return (
              <div key={idx} className="flex items-center gap-1.5">
                <span
                  className={`w-3 h-3 rounded-full transition-colors ${
                    isHit ? "bg-[#8A1F2D] ring-2 ring-[#8A1F2D]/20" : "bg-[#E2E8F0]"
                  }`}
                />
                <span className="text-[10px] font-bold text-[#64748B]">
                  {idx + 1}
                </span>
                {idx < maxViolations - 1 && <span className="text-[#E2E8F0] text-[10px]">•</span>}
              </div>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="my-4 rounded-2xl bg-[#F8EFF2] border border-[#BAE6FD] p-4 text-xs text-[#64748B] space-y-2">
          {isBlocked ? (
            <p className="leading-relaxed font-medium">
              Sistem telah mengunci lembar ujian Anda karena berpindah tab sebanyak <strong>{maxViolations} kali</strong>. Silakan hubungi guru atau pengawas ujian di kelas untuk membuka kunci (unblock) lembar soal Anda.
            </p>
          ) : (
            <>
              <div className="flex items-start gap-2 text-[#8A1F2D]">
                <AlertTriangle size={15} className="shrink-0 mt-0.5 text-[#C67D00]" />
                <p className="leading-relaxed font-medium">
                  Anda terdeteksi meninggalkan halaman ujian atau berpindah tab browser.
                </p>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                Tersisa <strong>{remainingChances} kesempatan</strong> lagi sebelum lembar jawaban Anda terkunci secara otomatis oleh sistem pengawasan guru.
              </p>
            </>
          )}
        </div>

        {/* Action Button */}
        {isBlocked ? (
          <div className="space-y-2">
            <button
              type="button"
              disabled={isChecking}
              onClick={onRefreshStatus || onDismiss}
              className="w-full py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-sm font-bold text-white shadow-md shadow-slate-400/20 transition cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isChecking ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memeriksa Persetujuan Guru...</span>
                </>
              ) : (
                <span>Cek Status Buka Kunci dari Guru</span>
              )}
            </button>
            <p className="text-[11px] text-center text-[#64748B]">
              Layar ujian akan otomatis terbuka begitu guru menekan tombol <strong>Buka Kunci</strong>.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={onDismiss}
            className="w-full py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-sm font-bold text-white shadow-md shadow-slate-400/20 transition cursor-pointer"
          >
            Saya Mengerti, Lanjutkan Ujian
          </button>
        )}
      </div>
    </div>
  );
}
