"use client";

import { Users, User } from "lucide-react";

interface FlipCardModeToggleProps {
  isTeamMode: boolean;
  onToggleTeamMode: (isTeam: boolean) => void;
  teamCount: number;
  onChangeTeamCount: (count: number) => void;
}

export function FlipCardModeToggle({
  isTeamMode,
  onToggleTeamMode,
  teamCount,
  onChangeTeamCount,
}: FlipCardModeToggleProps) {
  return (
    <>
      <div className="flex items-center bg-[#F0F9FF] p-1 rounded-xl border border-[#BAE6FD]">
        <button
          type="button"
          onClick={() => onToggleTeamMode(true)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
            isTeamMode ? "bg-[#0284C7] text-white shadow-2xs" : "text-[#64748B] hover:text-[#0284C7]"
          }`}
        >
          <Users size={13} />
          <span>Pakai Tim</span>
        </button>
        <button
          type="button"
          onClick={() => onToggleTeamMode(false)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
            !isTeamMode ? "bg-[#0284C7] text-white shadow-2xs" : "text-[#64748B] hover:text-[#0284C7]"
          }`}
        >
          <User size={13} />
          <span>Tanpa Tim</span>
        </button>
      </div>

      {isTeamMode && (
        <div className="hidden sm:flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
          {[2, 3, 4].map((cnt) => (
            <button
              key={cnt}
              type="button"
              onClick={() => onChangeTeamCount(cnt)}
              className={`px-2 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                teamCount === cnt ? "bg-[#0284C7] text-white shadow-2xs" : "text-[#64748B] hover:text-[#0284C7]"
              }`}
              title={`Gunakan ${cnt} Tim`}
            >
              {cnt} Tim
            </button>
          ))}
        </div>
      )}
    </>
  );
}
