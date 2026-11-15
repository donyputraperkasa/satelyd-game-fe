"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Satellite, LogOut, X } from "lucide-react";
import { useAuthModal } from "@/components/modals";
import type { DashboardSidebarProps } from "@/types";
import { DASHBOARD_NAV_ITEMS } from "./sidebar-items";

export function DashboardSidebar({ user, isOpenMobile = false, onCloseMobile }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuthModal();
  const isAdmin = user.role === "ADMIN" || user.role === "admin";
  const navList = DASHBOARD_NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  return (
    <>
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-[#0F172A]/30 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        aria-label="Sidebar Navigasi"
        className={`fixed top-0 bottom-0 left-0 z-50 flex h-full w-72 flex-col border-r border-[#E2E8F0] dark:border-[#242A38] bg-white dark:bg-[#0F1219] transition-all duration-300 ease-in-out md:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header - Fixed top */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E2E8F0] dark:border-[#242A38] px-6">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0284C7] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Satellite size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl font-extrabold tracking-tight text-[#0284C7] dark:text-[#F8FAFC]">
                  satel<span className="text-[#F59E0B] dark:text-[#C67D00]">y</span>d
                </span>
                <span className="text-[9px] font-extrabold tracking-wider uppercase px-1 py-0.2 rounded bg-[#F0F9FF] dark:bg-[#1C202C] text-[#0284C7] dark:text-[#E6B85C] border border-[#BAE6FD] dark:border-[#282E3E]">
                  game
                </span>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#64748B] dark:text-[#94A3B8]">
                Game Platform
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1C202C] hover:text-[#0284C7] dark:hover:text-[#F8FAFC] md:hidden cursor-pointer"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-1 overscroll-contain">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] dark:text-[#64748B] mb-2">
            Menu Utama
          </p>
          {navList.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/dashboard"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                aria-current={isActive ? "page" : undefined}
                className={`group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-[#0284C7] dark:bg-[#252B39] text-white dark:text-[#F8FAFC] shadow-sm dark:shadow-none"
                    : "text-[#475569] dark:text-[#A7B0C0] hover:bg-[#F1F5F9] dark:hover:bg-[#1C202C] hover:text-[#0284C7] dark:hover:text-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-white dark:text-[#E6B85C]"
                        : "text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#F8FAFC]"
                    }
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-[#0369A1] dark:bg-[#10131B] text-white dark:text-[#C67D00]"
                        : "bg-[#F0F9FF] dark:bg-[#1C202C] text-[#0284C7] border border-[#BAE6FD] dark:border-[#382E1E]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer - Pinned bottom with shrink-0 */}
        <div className="shrink-0 border-t border-[#E2E8F0] dark:border-[#242A38] p-3 sm:p-4 bg-[#F8FAFC] dark:bg-[#141720] space-y-2 transition-colors">
          <div className="flex items-center gap-2.5 rounded-xl bg-white dark:bg-[#1C202C] p-2.5 border border-[#E2E8F0] dark:border-[#282E3E] shadow-2xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0284C7] text-xs font-bold text-white">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] capitalize">{user.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                  {isAdmin ? "Administrator" : "Pengajar"}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#FECDD3] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] px-3 text-xs sm:text-sm font-bold text-[#E11D48] dark:text-[#F87171] hover:bg-[#FFF1F2] dark:hover:bg-[#281A1D] hover:border-[#FDA4AF] dark:hover:border-[#4B1E25] transition cursor-pointer shadow-2xs"
          >
            <LogOut size={16} />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>
    </>
  );
}
