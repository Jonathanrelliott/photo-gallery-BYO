"use client";

import { ChevronDown, ChevronLeft, ChevronRight, Download, Heart, Share2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cx, Photo } from "@/components/ui";
import { coverPhoto, currentUser, formatDate, type Gallery, type Photo as PhotoT } from "@/lib/mock-data";
import { site } from "@/lib/site";

export function ClientGallery({ gallery, photos }: { gallery: Gallery; photos: PhotoT[] }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const shown = onlyFavs ? photos.filter((p) => favorites.has(p.id)) : photos;

  function fav(id: string) {
    const next = new Set(favorites);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setFavorites(next);
  }

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? null : (i + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Cover */}
      <section className="relative h-[100svh] overflow-hidden">
        <Photo src={coverPhoto(gallery).src} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/45 to-ink-950" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-lime">{currentUser.studio}</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-tight text-white sm:text-7xl">{gallery.title}</h1>
          <p className="mt-4 font-mono text-sm text-mist/80">{formatDate(gallery.date)}</p>
          <a
            href="#photos"
            className="mt-10 inline-flex h-11 items-center rounded-full border border-white/30 px-6 text-sm text-white backdrop-blur transition hover:border-lime hover:text-lime"
          >
            View gallery
          </a>
        </div>
        <ChevronDown className="absolute bottom-8 left-1/2 size-6 -translate-x-1/2 animate-bounce text-white/60" />
      </section>

      {/* Toolbar */}
      <div id="photos" className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-8">
          <p className="truncate font-display text-lg text-white">{gallery.title}</p>
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => setOnlyFavs(!onlyFavs)}
              className={cx(
                "flex h-9 items-center gap-2 rounded-full px-3 transition",
                onlyFavs ? "bg-blossom/15 text-blossom" : "text-fog hover:text-white",
              )}
            >
              <Heart className={cx("size-4", onlyFavs && "fill-current")} />
              <span className="hidden sm:inline">Favorites</span> {favorites.size}
            </button>
            <button className="flex h-9 items-center gap-2 rounded-full px-3 text-fog hover:text-white">
              <Share2 className="size-4" /> <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex h-9 items-center gap-2 rounded-full bg-lime px-4 font-medium text-ink-900 hover:bg-lime-soft">
              <Download className="size-4" /> <span className="hidden sm:inline">Download all</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-[1600px] px-4 py-8 sm:px-8">
        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
          {shown.map((p, i) => (
            <div key={p.id} className="group relative cursor-zoom-in overflow-hidden" onClick={() => setOpen(i)}>
              <Photo src={p.src} alt={p.name} className="w-full transition duration-700 group-hover:scale-[1.03]" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fav(p.id);
                }}
                aria-label="Favorite"
                className={cx(
                  "absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ink-950/50 backdrop-blur transition",
                  favorites.has(p.id) ? "text-blossom" : "text-white opacity-0 group-hover:opacity-100",
                )}
              >
                <Heart className={cx("size-4", favorites.has(p.id) && "fill-current")} />
              </button>
            </div>
          ))}
        </div>
        {shown.length === 0 && <p className="py-24 text-center text-fog">Heart a few photos to build your selection.</p>}
      </section>

      <footer className="py-12 text-center font-mono text-xs text-fog/60">
        Delivered with <span className="text-lime">{site.name}</span>
      </footer>

      {/* Lightbox */}
      {open !== null && shown[open] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 backdrop-blur" onClick={() => setOpen(null)}>
          <button className="absolute right-5 top-5 text-white/70 hover:text-white" aria-label="Close">
            <X className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-4 grid size-12 place-items-center rounded-full text-white/70 hover:bg-white/5 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft className="size-7" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="flex max-h-[90vh] max-w-[90vw] flex-col items-center">
            <Photo src={shown[open].src} alt={shown[open].name} className="max-h-[82vh] w-auto object-contain shadow-2xl" />
            <div className="mt-4 flex items-center gap-4 font-mono text-xs text-fog">
              <span>{open + 1} / {shown.length}</span>
              <button onClick={() => fav(shown[open].id)} className={cx("flex items-center gap-1.5", favorites.has(shown[open].id) ? "text-blossom" : "hover:text-white")}>
                <Heart className={cx("size-4", favorites.has(shown[open].id) && "fill-current")} /> Favorite
              </button>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-4 grid size-12 place-items-center rounded-full text-white/70 hover:bg-white/5 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight className="size-7" />
          </button>
        </div>
      )}
    </div>
  );
}
