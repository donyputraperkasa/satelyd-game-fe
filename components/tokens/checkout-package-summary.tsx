import type { TokenPackage } from "@/services/token.service";

interface CheckoutPackageSummaryProps {
  pkg: TokenPackage;
}

export function CheckoutPackageSummary({ pkg }: CheckoutPackageSummaryProps) {
  return (
    <>
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#0284C7] dark:text-[#FBBF24]">
          Pembayaran Token Satelyd
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-[#F8FAFC]">
          Checkout &amp; Konfirmasi Transfer
        </h2>
        <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
          Selesaikan transfer sesuai nominal dan kirim bukti untuk aktivasi saldo instan.
        </p>
      </div>

      <div className="bg-[#F8FAFC] dark:bg-[#141720] border border-[#BAE6FD] dark:border-[#282E3E] rounded-2xl p-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            Paket Pilihan
          </span>
          <h4 className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC]">{pkg.name}</h4>
          <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">{pkg.tokenAmount} Token Kuota</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            Total Bayar
          </span>
          <div className="font-display font-black text-xl text-[#0F172A] dark:text-[#F8FAFC]">
            Rp {pkg.price.toLocaleString("id-ID")}
          </div>
        </div>
      </div>
    </>
  );
}
