"use client";

import { Eye, ImageIcon, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { Button, cx, Photo, Pill } from "@/components/ui";
import { connectedStorage, coverPhoto, formatDate, type Gallery } from "@/lib/mock-data";
import { getProvider } from "@/lib/providers";

const filters = ["all", "published", "draft", "archived"] as const;

export function GalleryGrid({ initial }: { initial: Gallery[] }) {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);

  const visible = useMemo(
    () =>
      items.filter(
        (g) =>
          (filter === "all" || g.status === filter) &&
          (g.title + g.client).toLowerCase().includes(query.toLowerCase()),
      ),
    [items, filter, query],
  );

  function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = String(data.get("title"));
    setItems([
      {
        id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title,
        client: String(data.get("client")) || "Personal",
        date: new Date().toISOString().slice(0, 10),
        status: "draft",
        coverIndex: 18 + Math.floor(Math.random() * 3),
        photoIds: [],
        views: 0,
        downloads: 0,
        storageProviderId: String(data.get("storage")),
      },
      ...items,
    ]);
    setCreating(false);
  }

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 rounded-full bg-ink-800/80 p-1 ring-1 ring-white/5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cx(
                "h-8 rounded-full px-4 text-sm capitalize transition",
                filter === f ? "bg-moss-700 text-white ring-1 ring-lime/30" : "text-fog hover:text-white",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fog" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search galleries"
              className="h-10 w-56 rounded-full border border-white/10 bg-ink-900/70 pl-9 pr-4 text-sm text-white placeholder:text-fog/60 outline-none focus:border-lime/40"
            />
          </label>
          <Button onClick={() => setCreating(true)}>
            <Plus className="size-4" /> New gallery
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((g) => {
          const provider = getProvider(g.storageProviderId);
          return (
            <Link
              key={g.id}
              href={`/dashboard/galleries/${g.id}`}
              className="group overflow-hidden rounded-3xl border border-white/5 bg-ink-800/60 transition hover:-translate-y-0.5 hover:border-lime/30 hover:shadow-glow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Photo src={coverPhoto(g).src} alt={g.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
                <div className="absolute left-4 top-4">
                  <Pill tone={g.status === "published" ? "lime" : g.status === "draft" ? "peach" : "neutral"}>
                    <span className="size-1.5 rounded-full bg-current" />
                    {g.status}
                  </Pill>
                </div>
                <div className="absolute inset-x-4 bottom-4">
                  <h3 className="font-display text-2xl leading-tight text-white">{g.title}</h3>
                  <p className="mt-1 text-sm text-mist/80">{g.client}</p>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3 font-mono text-xs text-fog">
                <span>{formatDate(g.date)}</span>
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><ImageIcon className="size-3.5" />{g.photoIds.length}</span>
                  <span className="flex items-center gap-1"><Eye className="size-3.5" />{g.views}</span>
                  <span className="text-lime/70">{provider?.name.split(" ")[0]}</span>
                </span>
              </div>
            </Link>
          );
        })}
        {visible.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-white/10 p-16 text-center text-fog">
            Nothing growing here yet.
          </div>
        )}
      </div>

      {creating && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-950/80 p-4 backdrop-blur-sm" onClick={() => setCreating(false)}>
          <form
            onSubmit={create}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-ink-800 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-white">New gallery</h2>
              <button type="button" onClick={() => setCreating(false)} className="text-fog hover:text-white" aria-label="Close">
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <Input name="title" label="Gallery title" placeholder="Moonlit Orchids" required />
              <Input name="client" label="Client" placeholder="Client name" />
              <label className="block">
                <span className="mb-1.5 block text-sm text-mist">Store photos in</span>
                <select name="storage" className="h-11 w-full rounded-xl border border-white/10 bg-ink-900 px-3 text-white outline-none focus:border-lime/50">
                  {connectedStorage.map((s) => (
                    <option key={s.providerId} value={s.providerId}>
                      {s.label} ({s.bucket})
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-8 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
              <Button type="submit">Create gallery</Button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

function Input({ label, ...props }: { label: string } & React.ComponentProps<"input">) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-mist">{label}</span>
      <input
        className="h-11 w-full rounded-xl border border-white/10 bg-ink-900 px-4 text-white placeholder:text-fog/50 outline-none focus:border-lime/50 focus:ring-4 focus:ring-lime/10"
        {...props}
      />
    </label>
  );
}
