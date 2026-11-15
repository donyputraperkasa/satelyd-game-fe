import { ChevronRight } from "lucide-react";
import type { UserMobileCardItemProps } from "@/types";
import { UserRoleBadge } from "./user-role-badge";

export function UserMobileCardItem({
  user,
  onSelect,
}: UserMobileCardItemProps) {
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <button
      type="button"
      onClick={() => onSelect(user)}
      className="w-full text-left rounded-xl border border-[#E2E8F0]
        dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3 shadow-2xs
        hover:bg-[#F8FAFC] dark:hover:bg-[#202634] transition flex
        items-center justify-between gap-3 group cursor-pointer active:scale-99"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center
            rounded-xl bg-[#0284C7] text-sm font-bold text-white shadow-2xs"
        >
          {initial}
        </div>
        <div className="min-w-0">
          <p
            className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC]
              truncate group-hover:text-[#C67D00]
              dark:group-hover:text-[#FBBF24] transition"
          >
            {user.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <UserRoleBadge role={user.role} />
        <ChevronRight
          size={16}
          className="text-[#94A3B8] dark:text-[#64748B]
            group-hover:translate-x-0.5 transition"
        />
      </div>
    </button>
  );
}
