import type { Metadata } from "next";
import { PageHeader } from "../page-header";
import { StorageManager } from "./storage-manager";

export const metadata: Metadata = { title: "Storage" };

export default function StoragePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Bring your own bucket"
        title="Storage"
        description="Connect the buckets your galleries live in. Keys are encrypted at rest and only used to sign uploads and downloads."
      />
      <StorageManager />
    </div>
  );
}
