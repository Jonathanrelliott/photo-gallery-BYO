import { Suspense } from "react";
import { galleries, galleryPhotos, getGallery, type Gallery } from "@/lib/mock-data";
import { GalleryManager } from "./gallery-manager";

export function generateStaticParams() {
  // "untitled-draft" is where galleries created in the UI open until they are saved for real.
  return [...galleries.map((g) => ({ id: g.id })), { id: "untitled-draft" }];
}

export default function GalleryPage({ params }: PageProps<"/dashboard/galleries/[id]">) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-ink-800/60" />}>
      {params.then(({ id }) => {
        // Galleries created in the UI aren't persisted yet, so fall back to an empty draft.
        const gallery: Gallery = getGallery(id) ?? {
          id,
          title: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          client: "Personal",
          date: "2026-10-31",
          status: "draft",
          coverIndex: 6,
          photoIds: [],
          views: 0,
          downloads: 0,
          storageProviderId: "cloudflare-r2",
        };
        return <GalleryManager gallery={gallery} initialPhotos={galleryPhotos(gallery)} />;
      })}
    </Suspense>
  );
}
