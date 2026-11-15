"use client";

interface CardEditorQuestionInputProps {
  frontQuestion: string;
  isEssay: boolean;
  onUpdateType: (type: "MULTIPLE_CHOICE" | "ESSAY") => void;
  onUpdateQuestion: (text: string) => void;
}

export function CardEditorQuestionInput({
  frontQuestion,
  isEssay,
  onUpdateType,
  onUpdateQuestion,
}: CardEditorQuestionInputProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-[#64748B]">Tipe:</span>
        <div className="inline-flex rounded-xl border border-[#E2E8F0] bg-white p-1">
          <button
            type="button"
            onClick={() => onUpdateType("MULTIPLE_CHOICE")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              !isEssay ? "bg-[#0284C7] text-white shadow-2xs" : "text-[#64748B]"
            }`}
          >
            Pilihan Ganda
          </button>
          <button
            type="button"
            onClick={() => onUpdateType("ESSAY")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              isEssay ? "bg-[#0284C7] text-white shadow-2xs" : "text-[#64748B]"
            }`}
          >
            Uraian / Essay
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
          Pertanyaan Soal *
        </label>
        <textarea
          rows={3}
          value={frontQuestion}
          onChange={(e) => onUpdateQuestion(e.target.value)}
          placeholder="Ketikkan teks pertanyaan soal di sini..."
          className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 text-sm font-medium text-[#0F172A] placeholder-[#94A3B8] placeholder:font-normal focus:border-[#0284C7] focus:outline-none transition shadow-2xs"
        />
      </div>
    </>
  );
}
