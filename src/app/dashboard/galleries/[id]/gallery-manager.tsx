"use client";

import { ArrowLeft, Check, CloudUpload, Copy, ExternalLink, Heart, Lock, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type DragEvent } from "react";
import { Toggle } from "@/components/toggle";
import { Button, ButtonLink, cx, Photo, Pill } from "@/components/ui";
import { connectedStorage, coverPhoto, formatDate, type Gallery, type Photo as PhotoT } from "@/lib/mock-data";
import { getProvider } from "@/lib/providers";

type Tab = "photos" | "settings";

export function GalleryManager({ gallery, initialPhotos }: { gallery: Gallery; initialPhotos: PhotoT[] }) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<Tab>("photos");
  const [status, setStatus] = useState(gallery.status);
  const [copied, setCopied] = useState(false);
  const storage = connectedStorage.find((s) => s.providerId === gallery.storageProviderId);
  const provider = getProvider(gallery.storageProviderId);
  const shareUrl = `/g/${gallery.id}`;

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function addFiles(files: FileList | null) {
    if (!files) return;
    // TODO: request presigned URLs and upload straight to the client's bucket.
    const added = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f, i) => ({ id: `u${Date.now()}-${i}`, src: URL.createObjectURL(f), width: 1, height: 1, name: f.name }));
    setPhotos((p) => [...added, ...p]);
  }

  async function copyLink() {
    await navigator.clipboard?.writeText(window.location.origin + shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-fog hover:text-white">
        <ArrowLeft className="size-4" /> All galleries
      </Link>

      <div className="relative overflow-hidden rounded-3xl border border-white/5">
        <Photo src={coverPhoto(gallery).src} alt="" className="h-64 w-full object-cover sm:h-72" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
          <div>
            <Pill tone={status === "published" ? "lime" : "peach"}>
              <span className="size-1.5 rounded-full bg-current" /> {status}
            </Pill>
            <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">{gallery.title}</h1>
            <p className="mt-2 font-mono text-xs text-mist/80">
              {gallery.client} · {formatDate(gallery.date)} · {photos.length} photos
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={copyLink}>
              {copied ? <Check className="size-4 text-lime" /> : <Copy className="size-4" />} {copied ? "Copied" : "Copy link"}
            </Button>
            <ButtonLink href={shareUrl} variant="secondary" target="_blank">
              <ExternalLink className="size-4" /> Preview
            </ButtonLink>
            <Button onClick={() => setStatus(status === "published" ? "draft" : "published")}>
              {status === "published" ? "Unpublish" : "Publish"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-white/5">
        {(["photos", "settings"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cx(
              "-mb-px border-b-2 pb-3 text-sm capitalize transition",
              tab === t ? "border-lime text-white" : "border-transparent text-fog hover:text-white",
            )}
          >
            {t}
          </button>
        ))}
        <span className="ml-auto pb-3 font-mono text-xs text-fog">
          Stored in <span className="text-lime">{provider?.name}</span>
          {storage && <> · {storage.bucket}</>}
        </span>
      </div>

      {tab === "photos" ? (
        <>
          <Dropzone onFiles={addFiles} />

          {selected.size > 0 && (
            <div className="glass sticky top-4 z-10 flex items-center justify-between rounded-2xl px-4 py-3">
              <span className="text-sm text-white">{selected.size} selected</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>Clear</Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setPhotos(photos.filter((p) => !selected.has(p.id)));
                    setSelected(new Set());
                  }}
                >
                  <Trash2 className="size-4 text-blossom" /> Remove
                </Button>
              </div>
            </div>
          )}

          <div className="columns-2 gap-4 md:columns-3 xl:columns-4 [&>*]:mb-4">
            {photos.map((p) => {
              const isSel = selected.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className={cx(
                    "group relative block w-full overflow-hidden rounded-2xl ring-2 transition",
                    isSel ? "ring-lime shadow-glow" : "ring-transparent hover:ring-white/20",
                  )}
                >
                  <Photo src={p.src} alt={p.name} className="w-full" />
                  <span
                    className={cx(
                      "absolute left-3 top-3 grid size-6 place-items-center rounded-full border transition",
                      isSel ? "border-lime bg-lime text-ink-900" : "border-white/60 bg-ink-950/40 opacity-0 group-hover:opacity-100",
                    )}
                  >
                    {isSel && <Check className="size-3.5" />}
                  </span>
                  {p.favorite && (
                    <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-ink-950/60 text-blossom">
                      <Heart className="size-3.5 fill-current" />
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-ink-950/80 to-transparent px-3 pb-2 pt-6 text-left font-mono text-[11px] text-mist opacity-0 transition group-hover:opacity-100">
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <GallerySettings />
      )}
    </div>
  );
}

function Dropzone({ onFiles }: { onFiles: (f: FileList | null) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setOver(false);
    onFiles(e.dataTransfer.files);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      onClick={() => input.current?.click()}
      className={cx(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-10 text-center transition",
        over ? "border-lime bg-lime/5 shadow-glow" : "border-white/10 bg-ink-800/40 hover:border-lime/40",
      )}
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-moss-800 text-lime ring-1 ring-lime/30">
        <CloudUpload className="size-6" />
      </span>
      <p className="text-white">Drop photos here, or <span className="text-lime">browse</span></p>
      <p className="font-mono text-xs text-fog">JPG, PNG, HEIC, WebP · uploaded straight to your bucket</p>
      <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
    </div>
  );
}

function GallerySettings() {
  const [settings, setSettings] = useState({ password: false, downloads: true, favorites: true, watermark: false });
  const rows: { key: keyof typeof settings; title: string; body: string }[] = [
    { key: "password", title: "Password protection", body: "Visitors need a password to open this gallery." },
    { key: "downloads", title: "Allow downloads", body: "Clients can download web-size or original files." },
    { key: "favorites", title: "Favorites", body: "Let clients heart photos and build a selection." },
    { key: "watermark", title: "Watermark previews", body: "Overlay your studio mark on gallery previews." },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {rows.map((r) => (
        <div key={r.key} className="glass flex items-start justify-between gap-6 rounded-2xl p-5">
          <div>
            <p className="flex items-center gap-2 text-white">
              {r.key === "password" && <Lock className="size-4 text-lilac" />} {r.title}
            </p>
            <p className="mt-1 text-sm text-fog">{r.body}</p>
          </div>
          <Toggle on={settings[r.key]} onChange={(v) => setSettings({ ...settings, [r.key]: v })} />
        </div>
      ))}
    </div>
  );
}
