"use client";

import { BookOpen, GraduationCap, Clock, Award } from "lucide-react";

interface ExamCreateFieldsProps {
  title: string;
  setTitle: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
  gradeLevel: string;
  setGradeLevel: (val: string) => void;
  durationMinutes: number;
  setDurationMinutes: (val: number) => void;
  passingScore: number;
  setPassingScore: (val: number) => void;
  description: string;
  setDescription: (val: string) => void;
  customToken?: string;
  setCustomToken?: (val: string) => void;
}

export function ExamCreateFields({
  title,
  setTitle,
  subject,
  setSubject,
  gradeLevel,
  setGradeLevel,
  durationMinutes,
  setDurationMinutes,
  passingScore,
  setPassingScore,
  description,
  setDescription,
  customToken = "",
  setCustomToken,
}: ExamCreateFieldsProps) {
  return (

    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-2">Judul / Nama Ujian *</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Penilaian Akhir Bab: Sistem Persamaan Linear"
          className="h-12 w-full rounded-xl border border-[#E2E8F0] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-4 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] dark:placeholder-[#64748B] placeholder:font-normal focus:border-[#0284C7] dark:focus:border-[#C67D00] focus:ring-2 focus:ring-[#0284C7]/10 dark:focus:ring-[#C67D00]/10 focus:outline-none transition shadow-2xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-2">
            <span className="inline-flex items-center gap-1.5"><BookOpen size={14} className="text-[#0284C7] dark:text-[#FBBF24]" /> Mata Pelajaran *</span>
          </label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Contoh: Seni Budaya, PJOK, Musik"
            list="subject-suggestions"
            className="h-12 w-full rounded-xl border border-[#E2E8F0] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-4 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] dark:placeholder-[#64748B] placeholder:font-normal focus:border-[#0284C7] dark:focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 transition shadow-2xs"
          />
          <datalist id="subject-suggestions">
            <option value="Seni Budaya" /><option value="Pendidikan Jasmani (PJOK)" /><option value="Prakarya & Kewirausahaan" /><option value="Informatika / TIK" /><option value="Matematika" /><option value="Bahasa Indonesia" /><option value="Bahasa Inggris" />
          </datalist>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-2">
            <span className="inline-flex items-center gap-1.5"><GraduationCap size={14} className="text-[#0284C7] dark:text-[#FBBF24]" /> Tingkat / Kelas *</span>
          </label>
          <input
            type="text"
            required
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            placeholder="Contoh: Kelas 9 SMP, Kelas X RPL"
            list="grade-suggestions"
            className="h-12 w-full rounded-xl border border-[#E2E8F0] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-4 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] dark:placeholder-[#64748B] placeholder:font-normal focus:border-[#0284C7] dark:focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 transition shadow-2xs"
          />
          <datalist id="grade-suggestions">
            <option value="Kelas 7 SMP" /><option value="Kelas 8 SMP" /><option value="Kelas 9 SMP" /><option value="Kelas 10 SMA/SMK" /><option value="Kelas 11 SMA/SMK" /><option value="Kelas 12 SMA/SMK" />
          </datalist>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-2">
            <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-[#0284C7] dark:text-[#FBBF24]" /> Durasi Ujian (Menit)</span>
          </label>
          <input
            type="number"
            min={5}
            max={240}
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(Number(e.target.value))}
            className="h-12 w-full rounded-xl border border-[#E2E8F0] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-4 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] focus:border-[#0284C7] dark:focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-2">
            <span className="inline-flex items-center gap-1.5"><Award size={14} className="text-amber-700 dark:text-amber-400" /> Target Nilai KKM</span>
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={passingScore}
            onChange={(e) => setPassingScore(Number(e.target.value))}
            className="h-12 w-full rounded-xl border border-[#E2E8F0] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-4 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] focus:border-[#0284C7] dark:focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
          />
        </div>
      </div>

      {setCustomToken && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-1.5">
            Kode Token Ujian (Opsional / Kustom)
          </label>
          <input
            type="text"
            maxLength={10}
            value={customToken}
            onChange={(e) => setCustomToken(e.target.value.toUpperCase())}
            placeholder="Kosongkan untuk otomatis (cth: SAT-M9K) atau ketik kustom (cth: MAT-12A)"
            className="h-11 w-full rounded-xl border border-[#E2E8F0] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-4 text-xs font-mono font-bold text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] dark:placeholder-[#64748B] placeholder:font-normal placeholder:font-sans focus:border-[#0284C7] dark:focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 uppercase"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-2">Petunjuk atau Deskripsi (Opsional)</label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Berikan instruksi tambahan seperti penggunaan kalkulator..."
          className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#282E3E] bg-white dark:bg-[#141720] p-3 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] dark:placeholder-[#64748B] placeholder:font-normal focus:border-[#0284C7] dark:focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 transition"
        />
      </div>
    </div>
  );
}

