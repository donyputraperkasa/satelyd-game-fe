"use client";

import { useState } from "react";
import { CheckCircle2, UserCheck } from "lucide-react";
import type { TokenOrder } from "@/types";
import { INITIAL_ORDERS } from "./revenue-data";

export function OwnerRevenueWidget() {
  const [orders, setOrders] = useState<TokenOrder[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("satelyd.token_orders");
      if (saved) {
        try {
          const parsed: TokenOrder[] = JSON.parse(saved);
          const clean = parsed.filter(
            (o) =>
              !o.id.startsWith("ORD-10") &&
              !o.userName.includes("Bambang") &&
              !o.userName.includes("Nurul") &&
              !o.userName.includes("Ahmad")
          );
          if (clean.length !== parsed.length) {
            localStorage.setItem("satelyd.token_orders", JSON.stringify(clean));
          }
          return clean;
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_ORDERS;
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleAdmit = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: "APPROVED" as const } : ord
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("satelyd.token_orders", JSON.stringify(updated));
      }
      return updated;
    });

    const admittedOrder = orders.find((o) => o.id === orderId);
    setNotification(`Pesanan ${orderId} (${admittedOrder?.userName}) berhasil di-admit!`);
    setTimeout(() => setNotification(null), 4000);
  };

  const totalRevenue = orders
    .filter((o) => o.status === "APPROVED")
    .reduce((sum, o) => sum + o.price, 0);
  const pendingCount = orders.filter((o) => o.status === "PENDING").length;

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#FFF8E6] border border-[#F2DEB0] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#9A6200]">
              Khusus Super Admin
            </span>
            <span className="text-xs font-semibold text-[#64748B]">Kontrol Finansial</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A] mt-1">
            Ringkasan Pemasukan & Penjualan Token
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white border border-[#E2E8F0] px-3.5 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-[#64748B]">Total Masuk</span>
            <p className="text-base font-extrabold text-[#0F172A]">Rp {totalRevenue.toLocaleString("id-ID")}</p>
          </div>
          <div className="rounded-xl bg-white border border-[#E2E8F0] px-3.5 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-[#C67D00]">Perlu Admit</span>
            <p className="text-base font-extrabold text-[#C67D00]">{pendingCount} Transaksi</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="flex items-center gap-2 rounded-xl bg-[#EDF7ED] border border-[#C8E6C9] p-3 text-xs font-semibold text-[#1E4620]">
          <CheckCircle2 size={16} className="text-[#2E7D32]" />
          <span>{notification}</span>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Daftar Pembelian Token Masuk
        </p>

        <div className="space-y-2.5">
          {orders.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E2E8F0] bg-white/60 p-6 text-center text-xs text-[#64748B]">
              Belum ada antrean pembelian token yang masuk.
            </div>
          ) : (
            orders.map((order) => {
              const isPending = order.status === "PENDING";
              return (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-white p-4 border border-[#E2E8F0] shadow-2xs hover:border-[#E2E8F0] transition"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0F172A]">{order.userName}</span>
                      <span className="text-[11px] text-[#64748B]">({order.userEmail})</span>
                    </div>
                    <p className="text-xs text-[#64748B]">
                      <span className="font-semibold text-[#C67D00]">{order.packageName}</span> • {order.paymentMethod} •{" "}
                      <span className="text-[#94A3B8]">{order.createdAt}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-sm font-extrabold text-[#0F172A]">
                      Rp {order.price.toLocaleString("id-ID")}
                    </span>

                    {isPending ? (
                      <button
                        type="button"
                        onClick={() => handleAdmit(order.id)}
                        className="flex items-center gap-1.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] px-4 py-1.5 text-xs font-bold text-white shadow-sm transition cursor-pointer"
                      >
                        <UserCheck size={14} className="text-[#C67D00]" />
                        <span>Admit / Setujui</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EDF7ED] border border-[#C8E6C9] px-3 py-1 text-xs font-bold text-[#2E7D32]">
                        <CheckCircle2 size={13} />
                        <span>Sudah Diadmit</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
