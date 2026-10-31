"use client";

import { Copy, Globe, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button, Pill } from "@/components/ui";
import { currentUser } from "@/lib/mock-data";

export function DomainForm() {
  const [domain, setDomain] = useState("galleries.verdantlens.studio");
  const locked = currentUser.plan !== "pro";
  const sub = domain.split(".")[0] || "galleries";

  const records = [
    { type: "CNAME", name: sub, value: "cname.vercel-dns.com" },
    { type: "TXT", name: `_mosslight.${sub}`, value: "mosslight-verify=7f3a9c21" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="glass space-y-6 rounded-3xl p-6">
        <label className="block">
          <span className="mb-1.5 block text-sm text-mist">Domain</span>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Globe className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-fog" />
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value.trim().toLowerCase())}
                className="h-11 w-full rounded-xl border border-white/10 bg-ink-900 pl-10 pr-4 font-mono text-sm text-white outline-none focus:border-lime/50"
              />
            </div>
            <Button disabled={locked}>Add domain</Button>
          </div>
        </label>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-white">DNS records</p>
            <Pill tone="peach">Pending verification</Pill>
          </div>
          <div className="mt-3 overflow-hidden rounded-2xl border border-white/5">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-ink-900/80 text-fog">
                <tr>
                  <th className="px-4 py-3 font-normal">Type</th>
                  <th className="px-4 py-3 font-normal">Name</th>
                  <th className="px-4 py-3 font-normal">Value</th>
                  <th />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-mist">
                {records.map((r) => (
                  <tr key={r.type}>
                    <td className="px-4 py-3 text-lime">{r.type}</td>
                    <td className="px-4 py-3">{r.name}</td>
                    <td className="px-4 py-3">{r.value}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => navigator.clipboard?.writeText(r.value)} className="text-fog hover:text-lime" aria-label="Copy value">
                        <Copy className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-fog">Using Cloudflare? Set the CNAME to &ldquo;DNS only&rdquo; (grey cloud) so certificates can be issued.</p>
        </div>
      </div>

      {locked && (
        <div className="relative overflow-hidden rounded-3xl border border-lilac/30 bg-gradient-to-br from-lilac/10 via-ink-800 to-moss-900 p-6">
          <Sparkles className="size-6 text-lilac" />
          <h2 className="mt-4 font-display text-2xl text-white">Custom domains are a Canopy feature</h2>
          <p className="mt-2 text-sm text-fog">
            You&apos;re on the free Seedling plan. Paid plans are on the way, and you can preview the setup here in the meantime.
          </p>
          <p className="mt-6 font-mono text-xs text-fog">
            Your galleries live at <span className="text-lime">mosslight.app/verdant-lens</span>
          </p>
          <Button disabled className="mt-6 w-full">Upgrade · coming soon</Button>
        </div>
      )}
    </div>
  );
}
