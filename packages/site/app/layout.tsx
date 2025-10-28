import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Funnel_Sans } from "next/font/google";
import {
  FaHandRock,
  FaHandPaper,
  FaHandScissors,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Encrypted Rock Paper Scissors",
  description:
    "Onchain encrypted Rock Paper Scissors app powered by Zama FHEVM",
};

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={funnelSans.className}>
      <body className={`gradient-bg particles-bg text-white antialiased min-h-screen overflow-auto`}>
        <main className="flex flex-col max-w-screen-lg mx-auto pb-20 min-w-[850px] relative z-10 min-h-screen">
          <nav className="flex w-full px-3 h-fit py-10 justify-between items-center">
            <AppLogo />
          </nav>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

function AppLogo() {
  return (
    <div className="flex items-center glass-card p-3 rounded-xl border border-white/20 backdrop-blur-sm">
      <FaHandRock className="size-8 text-cyan-400" />
      <FaHandPaper className="size-8 text-purple-400" />
      <FaHandScissors className="rotate-90 size-8 text-pink-400" />
      <span className="text-green-400 font-bold text-lg">ZAMA</span>
    </div>
  );
}
