"use client";

import { useState, useMemo, type FormEvent } from "react";
import {
  Clock,
  HelpCircle,
  GraduationCap,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  BookOpen,
  Search,
  Check,
  User,
  Users,
} from "lucide-react";
import type { Exam } from "@/types";
import type { JoinStudentExamPayload } from "@/services/student-exam.service";

interface StudentJoinGateProps {
  exam: Exam;
  onJoin: (payload: JoinStudentExamPayload) => void;
  isLoading?: boolean;
}

export function StudentJoinGate({ exam, onJoin, isLoading }: StudentJoinGateProps) {
  const roster = exam.rosterEntries || [];
  const hasRoster = roster.length > 0;

  const [useManualInput, setUseManualInput] = useState(!hasRoster);
  const [searchRoster, setSearchRoster] = useState("");
  const [selectedRosterId, setSelectedRosterId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [className, setClassName] = useState(exam.gradeLevel || "Semua Kelas");
  const [attendanceNumber, setAttendanceNumber] = useState("");

  const filteredRoster = useMemo(() => {
    if (!searchRoster.trim()) return roster.slice(0, 8);
    const q = searchRoster.toLowerCase();
    return roster.filter(
      (r) =>
        r.studentName.toLowerCase().includes(q) ||
        r.attendanceNumber?.toLowerCase().includes(q) ||
        r.className?.toLowerCase().includes(q)
    );
  }, [roster, searchRoster]);

  const handleSelectRoster = (item: { attendanceNumber: string; studentName: string; className: string }) => {
    setName(item.studentName);
    setClassName(item.className || exam.gradeLevel || "Semua Kelas");
    setAttendanceNumber(item.attendanceNumber || "");
    setSelectedRosterId(`${item.studentName}-${item.attendanceNumber}`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;

    onJoin({
      name: cleanName,
      className: className.trim() || exam.gradeLevel || "Semua Kelas",
      attendanceNumber: attendanceNumber.trim() || undefined,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-xl shadow-slate-400/20">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#E2E8F0] text-[#0F172A] text-xs font-bold">
            <GraduationCap size={14} className="text-[#C67D00]" />
            Lembar Ujian Resmi
          </span>
          <span className="text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-lg bg-[#EFE8EB] text-[#64748B]">
            PIN: {exam.pin || exam.tokenCode}
          </span>
        </div>

        {/* Title & Subject */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          {exam.title}
        </h1>
        <p className="mt-1 text-sm text-[#64748B] flex items-center gap-2">
          <BookOpen size={14} className="text-[#64748B]" />
          <span>{exam.subject}</span> • <span>{exam.gradeLevel}</span>
        </p>

        {/* Meta Stats Chips */}
        <div className="mt-6 grid grid-cols-2 gap-3 py-3 px-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] flex items-center justify-center text-[#0F172A] shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#64748B]">Durasi Ujian</p>
              <p className="text-sm font-bold text-[#0F172A]">{exam.durationMinutes} Menit</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] flex items-center justify-center text-[#0F172A] shrink-0">
              <HelpCircle size={18} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#64748B]">Jumlah Soal</p>
              <p className="text-sm font-bold text-[#0F172A]">
                {exam.questions?.length || exam.totalQuestions || 0} Butir Soal
              </p>
            </div>
          </div>
        </div>

        {/* Petunjuk Singkat */}
        <div className="mt-5 p-3.5 rounded-xl bg-[#FFF8E6] border border-[#F0DFAD] text-xs text-[#7A5B00] space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldCheck size={14} /> Tata Tertib Pengerjaan:
          </div>
          <p className="leading-relaxed text-[11px]">
            Kerjakan secara jujur dan mandiri. Sistem otomatis mendeteksi jika Anda berpindah tab atau aplikasi. Pastikan koneksi internet stabil sebelum mulai.
          </p>
        </div>

        {/* Form Identitas Siswa */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {hasRoster && !useManualInput ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                  <Users size={14} className="text-[#C67D00]" />
                  Cari Nama Siswa dari Daftar Kelas
                </label>
                <button
                  type="button"
                  onClick={() => setUseManualInput(true)}
                  className="text-[11px] text-[#0284C7] hover:underline font-bold cursor-pointer"
                >
                  Ketik Manual
                </button>
              </div>

              {/* Roster Search Input */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-3 text-[#A88C95]" />
                <input
                  type="text"
                  value={searchRoster}
                  onChange={(e) => setSearchRoster(e.target.value)}
                  placeholder="Ketik nama atau nomor absen Anda..."
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder:font-normal placeholder:text-[#BFAAB2] focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/15"
                />
              </div>

              {/* Roster Suggestions List */}
              <div className="max-h-48 overflow-y-auto rounded-xl border border-[#E2E8F0] divide-y divide-[#EFE8EB] bg-[#F8FAFC]">
                {filteredRoster.length > 0 ? (
                  filteredRoster.map((r, idx) => {
                    const isSelected = selectedRosterId === `${r.studentName}-${r.attendanceNumber}`;
                    return (
                      <button
                        key={`${r.studentName}-${idx}`}
                        type="button"
                        onClick={() => handleSelectRoster(r)}
                        className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between text-xs transition cursor-pointer ${
                          isSelected
                            ? "bg-[#F0F9FF] text-[#0284C7] font-bold"
                            : "hover:bg-[#F8FAFC] text-[#0F172A]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F2E8EB] text-[10px] font-mono font-bold text-[#64748B]">
                            {r.attendanceNumber ? `#${r.attendanceNumber}` : "-"}
                          </span>
                          <div>
                            <span className="font-semibold block">{r.studentName}</span>
                            <span className="text-[10px] text-[#64748B]">{r.className}</span>
                          </div>
                        </div>
                        {isSelected && <Check size={15} className="text-[#2E7D32]" />}
                      </button>
                    );
                  })
                ) : (
                  <div className="p-3 text-center text-xs text-[#64748B]">
                    Nama tidak ditemukan dalam daftar.{" "}
                    <button
                      type="button"
                      onClick={() => setUseManualInput(true)}
                      className="text-[#0284C7] font-bold underline"
                    >
                      Ketik Nama Manual
                    </button>
                  </div>
                )}
              </div>

              {name && (
                <div className="p-3 rounded-xl bg-[#EDF7ED] border border-[#C8E6C9] flex items-center justify-between text-xs text-[#1B4D20]">
                  <div className="flex items-center gap-2">
                    <UserCheck size={16} className="text-[#2E7D32]" />
                    <span>
                      Siswa terpilih: <strong>{name}</strong> {attendanceNumber && `(No. Absen: ${attendanceNumber})`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setName("");
                      setAttendanceNumber("");
                      setSelectedRosterId(null);
                    }}
                    className="text-[11px] underline font-bold text-[#2E7D32]"
                  >
                    Ganti
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {hasRoster && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setUseManualInput(false)}
                    className="text-[11px] text-[#0284C7] hover:underline font-bold cursor-pointer"
                  >
                    ← Pilih dari Daftar Nama Kelas
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                  Nama Lengkap Siswa <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3 text-[#A88C95]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Muhammad Budi Pratama"
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder:font-normal placeholder:text-[#BFAAB2] focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Nomor Absen / NIS <span className="text-[10px] text-[#64748B] font-normal">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={attendanceNumber}
                    onChange={(e) => setAttendanceNumber(e.target.value)}
                    placeholder="Contoh: 18"
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] placeholder:font-normal placeholder:text-[#BFAAB2] focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/15"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Kelas / Rombel <span className="text-[10px] text-[#64748B] font-normal">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="Contoh: XII IPA 1"
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] placeholder:font-normal placeholder:text-[#BFAAB2] focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/15"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] py-3 text-sm font-bold text-white shadow-lg shadow-slate-400/20 transition disabled:opacity-50 cursor-pointer"
          >
            <UserCheck size={17} />
            <span>{isLoading ? "Menyiapkan Lembar Soal..." : "Mulai Kerjakan Ujian"}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

