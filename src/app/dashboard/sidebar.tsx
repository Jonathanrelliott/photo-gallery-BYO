"use client";

import { Cloud, Globe, Images, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx, Logo, ProTag } from "@/components/ui";
import { currentUser } from "@/lib/mock-data";

const nav = [
  { href: "/dashboard", label: "Galleries", icon: Images, match: (p: string) => p === "/dashboard" || p.startsWith("/dashboard/galleries") },
  { href: "/dashboard/storage", label: "Storage", icon: Cloud },
  { href: "/dashboard/domains", label: "Custom domain", icon: Globe, pro: true },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/5 bg-ink-950/80 px-4 py-6 lg:flex">
      <Logo className="px-2" />
      <nav className="mt-10 space-y-1">
        {nav.map((item) => {
          const active = item.match ? item.match(pathname) : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active ? "bg-moss-800 text-white ring-1 ring-lime/20" : "text-fog hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon className={cx("size-4.5", active && "text-lime")} />
              <span className="flex-1">{item.label}</span>
              {item.pro && <ProTag />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="rounded-2xl border border-lime/20 bg-gradient-to-br from-moss-800 to-ink-900 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">Seedling · Free</p>
          <p className="mt-2 text-sm text-mist">Custom domains and branding removal are coming with Canopy.</p>
          <Link href="/#pricing" className="mt-3 inline-block text-sm font-medium text-lime hover:underline">
            See plans →
          </Link>
        </div>
        <div className="flex items-center gap-3 px-2">
          <span className="grid size-9 place-items-center rounded-full bg-blossom/20 text-sm font-medium text-blossom ring-1 ring-blossom/30">
            {currentUser.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-white">{currentUser.name}</p>
            <p className="truncate text-xs text-fog">{currentUser.studio}</p>
          </div>
          <Link href="/login" className="text-fog hover:text-white" aria-label="Log out">
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-white/5 px-4 py-2 lg:hidden">
      {nav.map((item) => {
        const active = item.match ? item.match(pathname) : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cx("whitespace-nowrap rounded-full px-3 py-1.5 text-sm", active ? "bg-moss-800 text-white" : "text-fog")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
