"use client";

import { ArrowRight, Gamepad2 } from "lucide-react";
import { useAuthModal } from "@/components/modals";

export function HeroSection() {
  const { openRegister, openPin } = useAuthModal();

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-8 sm:px-12 pt-10 sm:pt-20 pb-8 max-w-5xl mx-auto">
      {/* Classic Editorial Headline */}
      <h1 className="flex flex-col items-center max-w-5xl">
        <span className="font-display text-[3.75rem] min-[420px]:text-[4.75rem] sm:text-[7.25rem] md:text-[8.75rem] lg:text-[9.75rem] font-black tracking-[-0.035em] leading-none text-[#0284C7] dark:text-[#F8FAFC] lowercase select-none transition-colors">
          satelyd
        </span>
        <span className="font-display text-xs min-[420px]:text-sm sm:text-lg md:text-xl font-bold tracking-[0.2em] min-[420px]:tracking-[0.25em] sm:tracking-[0.32em] text-[#64748B] dark:text-[#94A3B8] lowercase mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-2.5 sm:gap-4 transition-colors">
          <span>learn</span>
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#0284C7] dark:bg-[#94A3B8] opacity-40" />
          <span>play</span>
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#0284C7] dark:bg-[#94A3B8] opacity-40" />
          <span>build</span>
        </span>
      </h1>

      {/* Engaging Subtitle */}
      <p className="mt-6 text-sm sm:text-base md:text-lg text-[#475569] dark:text-[#94A3B8] font-normal tracking-normal max-w-md sm:max-w-2xl leading-relaxed sm:leading-relaxed transition-colors">
        Ubah suasana kelas jadi petualangan yang seru. Mainkan battle, wheels question & flip card di layar TV kelas, serta selenggarakan ujian online anti-curang dengan mudah. Gratis untuk siapa saja.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 sm:mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <button
          type="button"
          onClick={openRegister}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white dark:bg-white dark:hover:bg-slate-100 dark:text-[#10131B] min-w-[165px] sm:min-w-[195px] h-12 sm:h-13 px-6 text-sm sm:text-base font-bold shadow-md shadow-[#0284C7]/25 hover:shadow-lg hover:shadow-[#0284C7]/35 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shrink-0"
        >
          <span>Register</span>
          <ArrowRight size={16} className="stroke-[2.5] sm:w-[18px] sm:h-[18px]" />
        </button>

        <button
          type="button"
          onClick={openPin}
          className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#BAE6FD] hover:border-[#0284C7] bg-[#F0F9FF] hover:bg-[#0284C7] min-w-[165px] sm:min-w-[195px] h-12 sm:h-13 px-6 text-sm sm:text-base font-bold text-[#0284C7] hover:text-white dark:border-[#C67D00] dark:bg-[#1C202C] dark:hover:bg-[#252B3B] dark:text-[#F8FAFC] dark:hover:text-[#F8FAFC] shadow-md shadow-[#0284C7]/10 hover:shadow-lg hover:shadow-[#0284C7]/25 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shrink-0"
        >
          <Gamepad2 size={16} className="text-[#0284C7] group-hover:text-white dark:text-[#C67D00] dark:group-hover:text-[#F8FAFC] transition-colors sm:w-[18px] sm:h-[18px]" />
          <span>Masukkan PIN</span>
        </button>
      </div>
    </section>
  );
}
