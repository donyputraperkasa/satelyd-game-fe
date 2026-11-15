"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  game: "Game TV",
  decks: "Bank Soal",
  exams: "Ujian Siswa",
  tokens: "Saldo Token",
  transactions: "Transaksi",
  guides: "Panduan",
  users: "Pengguna",
};

import type { BreadcrumbItem } from "@/types";

export function DashboardBreadcrumbs() {
  const pathname = usePathname();

  // Parse path segments, e.g. "/dashboard/game" -> ["dashboard", "game"]
  const segments = pathname.split("/").filter(Boolean);

  // If at root or invalid, default to Dashboard
  if (segments.length === 0) return null;

  const items: BreadcrumbItem[] = [];
  let currentPath = "";

  segments.forEach((seg, idx) => {
    currentPath += `/${seg}`;
    const isLast = idx === segments.length - 1;
    const label =
      ROUTE_LABELS[seg] ??
      seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    items.push({
      label,
      href: currentPath,
      isLast,
    });
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#F8FAFC] transition font-medium"
        title="Ke Dashboard"
      >
        <Home size={16} className="text-[#94A3B8] dark:text-[#64748B]" />
      </Link>

      {items.map((item) => (
        <div key={item.href} className="flex items-center gap-1.5">
          <ChevronRight size={13} className="text-[#CBD5E1] dark:text-[#475569] shrink-0" />
          {item.isLast ? (
            <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] truncate max-w-[140px] sm:max-w-none">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#F8FAFC] transition font-medium truncate max-w-[120px] sm:max-w-none"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
