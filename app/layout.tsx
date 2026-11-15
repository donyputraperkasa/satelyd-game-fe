import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthModalProvider } from "@/components/modals";
import { ToastProvider } from "@/components/ui";
import { FloatingContact } from "@/components/public/floating-contact";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "satelyd game — learn . play . build",
  description: "Platform game edukasi interaktif dan mode ujian online anti-curang yang terbuka gratis untuk siapapun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] dark:bg-[#141720] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-200">
        <ToastProvider>
          <AuthModalProvider>
            {children}
            <FloatingContact />
            <Analytics />
          </AuthModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
