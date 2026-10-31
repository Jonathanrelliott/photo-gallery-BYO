import { notFound } from "next/navigation";
import { Suspense } from "react";
import { galleries, galleryPhotos, getGallery } from "@/lib/mock-data";
import { ClientGallery } from "./client-gallery";

export function generateStaticParams() {
  return galleries.map((g) => ({ slug: g.id }));
}

export default function PublicGalleryPage({ params }: PageProps<"/g/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink-950" />}>
      {params.then(({ slug }) => {
        const gallery = getGallery(slug);
        if (!gallery) notFound();
        return <ClientGallery gallery={gallery} photos={galleryPhotos(gallery)} />;
      })}
    </Suspense>
  );
}
