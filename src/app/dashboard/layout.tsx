import type { Metadata } from "next";
import { Logo } from "@/components/ui";
import { MobileNav, Sidebar } from "./sidebar";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="flex min-h-screen bg-greenhouse">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <div className="flex h-14 items-center border-b border-white/5 px-4 lg:hidden">
          <Logo />
        </div>
        <MobileNav />
        <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
