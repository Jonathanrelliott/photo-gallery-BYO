// Placeholder data for the UI until Supabase is wired up.

export type Plan = "free" | "pro";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  name: string;
  favorite?: boolean;
};

export type Gallery = {
  id: string;
  title: string;
  client: string;
  date: string;
  status: "published" | "draft" | "archived";
  coverIndex: number;
  photoIds: number[];
  views: number;
  downloads: number;
  storageProviderId: string;
};

const dims: [number, number][] = [
  [1200, 1500],
  [1500, 1000],
  [1200, 1200],
  [1000, 1500],
  [1600, 1000],
];

const illustrations: Photo[] = Array.from({ length: 18 }, (_, i) => {
  const [width, height] = dims[i % dims.length];
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `p${n}`,
    src: `/demo/photo-${n}.svg`,
    width,
    height,
    name: `IMG_${4180 + i}.jpg`,
    favorite: i % 5 === 1,
  };
});

// Real EditGenlx shots, indexes 18-20.
const realShots: Photo[] = ["_PIC0282", "_PIC2655", "_PIC2656"].map((name, i) => ({
  id: `e${i + 1}`,
  src: `/demo/editgenlx-0${i + 1}.jpg`,
  width: 675,
  height: 900,
  name: `${name}.jpg`,
  favorite: i === 0,
}));

export const photos: Photo[] = [...illustrations, ...realShots];

export const currentUser = {
  name: "Ivy Okafor",
  email: "ivy@verdantlens.studio",
  studio: "Verdant Lens Studio",
  plan: "free" as Plan,
  initials: "IO",
};

export const galleries: Gallery[] = [
  {
    id: "rush-lacrosse-senior-night",
    title: "Rush Lacrosse: Senior Night",
    client: "Rush Lacrosse Club",
    date: "2026-10-18",
    status: "published",
    coverIndex: 18,
    photoIds: [18, 4, 19, 0, 20, 2, 7, 10, 12, 14, 1, 5, 16, 8, 3],
    views: 1284,
    downloads: 96,
    storageProviderId: "cloudflare-r2",
  },
  {
    id: "varsity-baseball-home-opener",
    title: "Varsity Baseball Home Opener",
    client: "Varsity Baseball",
    date: "2026-10-02",
    status: "published",
    coverIndex: 19,
    photoIds: [19, 10, 11, 13, 15, 6, 9, 17, 2],
    views: 642,
    downloads: 41,
    storageProviderId: "cloudflare-r2",
  },
  {
    id: "softball-sectional-win",
    title: "Softball Sectional Win",
    client: "Varsity Softball",
    date: "2026-09-21",
    status: "published",
    coverIndex: 20,
    photoIds: [20, 17, 16, 14, 12, 0, 1, 3, 5, 7, 9, 11],
    views: 3120,
    downloads: 214,
    storageProviderId: "aws-s3",
  },
  {
    id: "night-garden-editorial",
    title: "Night Garden Editorial",
    client: "Fern Magazine",
    date: "2026-09-09",
    status: "draft",
    coverIndex: 8,
    photoIds: [8, 6, 4, 2],
    views: 0,
    downloads: 0,
    storageProviderId: "backblaze-b2",
  },
  {
    id: "terrarium-product",
    title: "Terrarium Product Shoot",
    client: "Glass & Fern Co.",
    date: "2026-08-27",
    status: "published",
    coverIndex: 13,
    photoIds: [13, 15, 1, 3, 5, 7],
    views: 418,
    downloads: 63,
    storageProviderId: "cloudflare-r2",
  },
  {
    id: "rooftop-blooms",
    title: "Rooftop Blooms",
    client: "Personal",
    date: "2026-07-14",
    status: "archived",
    coverIndex: 2,
    photoIds: [2, 4, 6, 8, 10],
    views: 207,
    downloads: 12,
    storageProviderId: "aws-s3",
  },
];

export function getGallery(id: string) {
  return galleries.find((g) => g.id === id);
}

export function galleryPhotos(g: Gallery) {
  return g.photoIds.map((i) => photos[i]);
}

export function coverPhoto(g: Gallery) {
  return photos[g.coverIndex];
}

export const connectedStorage = [
  { providerId: "cloudflare-r2", label: "Studio R2", bucket: "verdant-lens-galleries", status: "healthy" as const, usedGb: 48.2, objects: 6120 },
  { providerId: "aws-s3", label: "Archive S3", bucket: "vl-archive-2026", status: "healthy" as const, usedGb: 112.7, objects: 14388 },
  { providerId: "backblaze-b2", label: "Editorial B2", bucket: "vl-editorial", status: "needs-attention" as const, usedGb: 3.4, objects: 402 },
];

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
