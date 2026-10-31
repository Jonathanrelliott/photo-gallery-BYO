import { Logo } from "@/components/ui";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-fog">{site.description}</p>
        </div>
        <p className="font-mono text-xs text-fog/70">
          © {site.name}. Grown in the dark, served in your bucket.
        </p>
      </div>
    </footer>
  );
}
