import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";
import { Footer } from "@/components/public/Footer";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#141720] selection:bg-[#0284C7] selection:text-white dark:selection:bg-[#C67D00] dark:selection:text-[#141720] transition-colors duration-200">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center">
        <HeroSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
}
