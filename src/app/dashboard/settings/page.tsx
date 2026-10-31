import type { Metadata } from "next";
import { Pill, ProTag } from "@/components/ui";
import { currentUser } from "@/lib/mock-data";
import { site } from "@/lib/site";
import { PageHeader } from "../page-header";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="space-y-10">
      <PageHeader eyebrow="Account" title="Settings" />

      <section className="glass max-w-3xl rounded-3xl p-6">
        <h2 className="text-white">Studio profile</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ReadOnly label="Your name" value={currentUser.name} />
          <ReadOnly label="Email" value={currentUser.email} />
          <ReadOnly label="Studio name" value={currentUser.studio} />
          <ReadOnly label="Public URL" value={`${site.domain}/verdant-lens`} />
        </div>
      </section>

      <section className="glass max-w-3xl rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-white">Plan</h2>
          <Pill tone="lime">Seedling · Free</Pill>
        </div>
        <p className="mt-3 text-sm text-fog">
          Billing isn&apos;t live yet. Features marked <ProTag className="mx-1" /> will move to the paid Canopy plan when it launches.
        </p>
      </section>
    </div>
  );
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-mist">{label}</span>
      <input
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-white/10 bg-ink-900 px-4 text-white outline-none focus:border-lime/50"
      />
    </label>
  );
}
