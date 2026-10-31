import type { Metadata } from "next";
import { ProTag } from "@/components/ui";
import { PageHeader } from "../page-header";
import { DomainForm } from "./domain-form";

export const metadata: Metadata = { title: "Custom domain" };

export default function DomainsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Your brand, your address"
        title={<span className="flex items-center gap-3">Custom domain <ProTag className="text-xs" /></span>}
        description="Serve every gallery from a domain you own, like galleries.yourstudio.com. HTTPS certificates are issued automatically."
      />
      <DomainForm />
    </div>
  );
}
