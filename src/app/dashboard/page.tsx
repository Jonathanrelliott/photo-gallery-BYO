import { Download, Eye, HardDrive, Images } from "lucide-react";
import { connectedStorage, currentUser, galleries } from "@/lib/mock-data";
import { GalleryGrid } from "./gallery-grid";
import { PageHeader } from "./page-header";

export default function DashboardPage() {
  const stats = [
    { label: "Galleries", value: galleries.length, icon: Images, tone: "text-lime" },
    { label: "Photos delivered", value: galleries.reduce((n, g) => n + g.photoIds.length, 0) * 37, icon: Download, tone: "text-blossom" },
    { label: "Gallery views (30d)", value: galleries.reduce((n, g) => n + g.views, 0).toLocaleString(), icon: Eye, tone: "text-lilac" },
    { label: "In your buckets", value: `${connectedStorage.reduce((n, s) => n + s.usedGb, 0).toFixed(1)} GB`, icon: HardDrive, tone: "text-peach" },
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow={currentUser.studio}
        title={<>Good evening, <em className="text-lime">{currentUser.name.split(" ")[0]}</em></>}
        description="Here's what's growing across your galleries."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-fog">{s.label}</p>
              <s.icon className={`size-4 ${s.tone}`} />
            </div>
            <p className="mt-3 font-display text-3xl text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <GalleryGrid initial={galleries} />
    </div>
  );
}
