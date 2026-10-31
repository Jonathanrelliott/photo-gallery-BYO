import Link from "next/link";
import { ButtonLink, Logo } from "@/components/ui";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#storage", label: "Bring your bucket" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/g/rush-lacrosse-senior-night", label: "Demo gallery" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-900/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-fog md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Log in
          </ButtonLink>
          <ButtonLink href="/login?mode=signup" size="sm">
            Start free
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
