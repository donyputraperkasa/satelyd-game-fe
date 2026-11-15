"use client";

import Link from "next/link";
import { CheckCircle2, Award, Home, Calendar, Clock, BookOpen } from "lucide-react";
import type { StudentExamSession } from "@/types";

interface StudentExamResultProps {
  session: StudentExamSession;
}

export function StudentExamResult({ session }: StudentExamResultProps) {
  const { exam, participant, score, submittedAt } = session;
  const answeredCount = Object.keys(session.answers).length;
  const totalQuestions = exam.questions?.length || exam.totalQuestions || 0;

  const formattedDate = submittedAt
    ? new Date(submittedAt).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleTimeString("id-ID");

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-xl shadow-slate-400/20 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF7EE] border border-[#B9E5C2] text-[#1D6C31] flex items-center justify-center mb-4">
          <CheckCircle2 size={36} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Ujian Berhasil Dikumpulkan!
        </h1>
        <p className="mt-2 text-sm text-[#64748B] max-w-md mx-auto">
          Terima kasih, <strong className="text-[#0F172A]">{participant.name}</strong>. Lembar jawaban Anda telah tersimpan secara resmi di sistem.
        </p>

        {/* Score Card (jika nilai dihitung) */}
        {typeof score === "number" && (
          <div className="mt-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0F172A] text-xs font-bold mb-2">
              <Award size={14} className="text-[#C67D00]" />
              Hasil Capaian Nilai Anda
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
              {score} <span className="text-lg sm:text-xl font-normal text-[#64748B]">/ 100</span>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">
              Kriteria Ketuntasan Minimal: {exam.passingScore || 75}
            </p>
          </div>
        )}

        {/* Detail Ringkasan */}
        <div className="mt-6 text-left rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <span className="text-[#64748B] flex items-center gap-1.5">
              <BookOpen size={14} /> Mata Pelajaran:
            </span>
            <span className="font-bold text-[#0F172A]">{exam.title} ({exam.subject})</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <span className="text-[#64748B] flex items-center gap-1.5">
              <Clock size={14} /> Soal Terjawab:
            </span>
            <span className="font-bold text-[#0F172A]">{answeredCount} dari {totalQuestions} Butir</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#64748B] flex items-center gap-1.5">
              <Calendar size={14} /> Waktu Kumpul:
            </span>
            <span className="font-medium text-[#0F172A]">{formattedDate}</span>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="mt-8">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-sm font-bold text-white shadow-md shadow-slate-400/20 transition"
          >
            <Home size={16} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
