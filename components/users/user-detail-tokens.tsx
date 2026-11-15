import type { UserDetailTokensProps } from "@/types";

export function UserDetailTokens({ user }: UserDetailTokensProps) {
  const isAdmin = user.role === "ADMIN";
  const gameTokens = isAdmin ? "∞" : user.gameTokenBalance ?? 0;
  const examCredits = isAdmin ? "∞" : user.examCreditBalance ?? 0;

  return (
    <div className="grid grid-cols-2 gap-2.5">
      <div
        className="rounded-xl border border-[#E2E8F0] dark:border-[#282E3E]
          bg-[#F8FAFC] dark:bg-[#141720] p-3 text-center"
      >
        <span
          className="text-[10px] text-[#64748B] dark:text-[#94A3B8]
            font-bold block uppercase tracking-wider"
        >
          Token Game
        </span>
        <span
          className="font-display text-xl font-extrabold text-[#0F172A]
            dark:text-[#F8FAFC] mt-0.5 block"
        >
          {gameTokens}
        </span>
      </div>

      <div
        className="rounded-xl border border-[#E2E8F0] dark:border-[#282E3E]
          bg-[#F8FAFC] dark:bg-[#141720] p-3 text-center"
      >
        <span
          className="text-[10px] text-[#64748B] dark:text-[#94A3B8]
            font-bold block uppercase tracking-wider"
        >
          Kredit Ujian
        </span>
        <span
          className="font-display text-xl font-extrabold text-[#0F172A]
            dark:text-[#F8FAFC] mt-0.5 block"
        >
          {examCredits}
        </span>
      </div>
    </div>
  );
}
