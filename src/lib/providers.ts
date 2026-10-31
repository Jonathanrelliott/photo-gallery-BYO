// Storage providers a client can connect. Most speak the S3 API, so they share
// one adapter and differ only in endpoint and region defaults.

export type ProviderProtocol = "s3" | "gcs" | "azure";

export type ProviderField = {
  key: string;
  label: string;
  placeholder?: string;
  secret?: boolean;
  optional?: boolean;
};

export type StorageProvider = {
  id: string;
  name: string;
  protocol: ProviderProtocol;
  popular?: boolean;
  /** Endpoint template, with {region} or {accountId} filled from the form. */
  endpoint?: string;
  docsUrl: string;
  fields: ProviderField[];
};

const s3Keys: ProviderField[] = [
  { key: "accessKeyId", label: "Access key ID", placeholder: "AKIA…" },
  { key: "secretAccessKey", label: "Secret access key", secret: true },
];

const bucket: ProviderField = { key: "bucket", label: "Bucket", placeholder: "my-gallery-photos" };

export const providers: StorageProvider[] = [
  {
    id: "aws-s3",
    name: "Amazon S3",
    protocol: "s3",
    popular: true,
    endpoint: "https://s3.{region}.amazonaws.com",
    docsUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/",
    fields: [bucket, { key: "region", label: "Region", placeholder: "us-east-1" }, ...s3Keys],
  },
  {
    id: "cloudflare-r2",
    name: "Cloudflare R2",
    protocol: "s3",
    popular: true,
    endpoint: "https://{accountId}.r2.cloudflarestorage.com",
    docsUrl: "https://developers.cloudflare.com/r2/",
    fields: [bucket, { key: "accountId", label: "Account ID", placeholder: "a1b2c3…" }, ...s3Keys],
  },
  {
    id: "backblaze-b2",
    name: "Backblaze B2",
    protocol: "s3",
    popular: true,
    endpoint: "https://s3.{region}.backblazeb2.com",
    docsUrl: "https://www.backblaze.com/docs/cloud-storage-s3-compatible-api",
    fields: [bucket, { key: "region", label: "Region", placeholder: "us-west-004" }, ...s3Keys],
  },
  {
    id: "gcs",
    name: "Google Cloud Storage",
    protocol: "gcs",
    popular: true,
    docsUrl: "https://cloud.google.com/storage/docs",
    fields: [
      bucket,
      { key: "projectId", label: "Project ID", placeholder: "my-project-123" },
      { key: "serviceAccountJson", label: "Service account JSON", secret: true },
    ],
  },
  {
    id: "azure-blob",
    name: "Azure Blob Storage",
    protocol: "azure",
    popular: true,
    docsUrl: "https://learn.microsoft.com/azure/storage/blobs/",
    fields: [
      { key: "container", label: "Container", placeholder: "gallery" },
      { key: "accountName", label: "Storage account name" },
      { key: "accountKey", label: "Account key", secret: true },
    ],
  },
  {
    id: "wasabi",
    name: "Wasabi",
    protocol: "s3",
    endpoint: "https://s3.{region}.wasabisys.com",
    docsUrl: "https://docs.wasabi.com/",
    fields: [bucket, { key: "region", label: "Region", placeholder: "us-east-1" }, ...s3Keys],
  },
  {
    id: "do-spaces",
    name: "DigitalOcean Spaces",
    protocol: "s3",
    endpoint: "https://{region}.digitaloceanspaces.com",
    docsUrl: "https://docs.digitalocean.com/products/spaces/",
    fields: [bucket, { key: "region", label: "Region", placeholder: "nyc3" }, ...s3Keys],
  },
  {
    id: "supabase-storage",
    name: "Supabase Storage",
    protocol: "s3",
    endpoint: "https://{projectRef}.supabase.co/storage/v1/s3",
    docsUrl: "https://supabase.com/docs/guides/storage/s3/compatibility",
    fields: [bucket, { key: "projectRef", label: "Project ref" }, { key: "region", label: "Region", placeholder: "us-east-1" }, ...s3Keys],
  },
  {
    id: "akamai-linode",
    name: "Akamai (Linode) Object Storage",
    protocol: "s3",
    endpoint: "https://{region}.linodeobjects.com",
    docsUrl: "https://techdocs.akamai.com/cloud-computing/docs/object-storage",
    fields: [bucket, { key: "region", label: "Region", placeholder: "us-east-1" }, ...s3Keys],
  },
  {
    id: "idrive-e2",
    name: "IDrive e2",
    protocol: "s3",
    docsUrl: "https://www.idrive.com/s3-storage-e2/",
    fields: [bucket, { key: "endpoint", label: "Endpoint", placeholder: "https://x1y2.va.idrivee2-1.com" }, ...s3Keys],
  },
  {
    id: "storj",
    name: "Storj",
    protocol: "s3",
    endpoint: "https://gateway.storjshare.io",
    docsUrl: "https://docs.storj.io/dcs/api/s3/s3-compatible-gateway",
    fields: [bucket, ...s3Keys],
  },
  {
    id: "scaleway",
    name: "Scaleway Object Storage",
    protocol: "s3",
    endpoint: "https://s3.{region}.scw.cloud",
    docsUrl: "https://www.scaleway.com/en/docs/object-storage/",
    fields: [bucket, { key: "region", label: "Region", placeholder: "fr-par" }, ...s3Keys],
  },
  {
    id: "oracle",
    name: "Oracle Cloud Object Storage",
    protocol: "s3",
    endpoint: "https://{namespace}.compat.objectstorage.{region}.oraclecloud.com",
    docsUrl: "https://docs.oracle.com/iaas/Content/Object/Tasks/s3compatibleapi.htm",
    fields: [bucket, { key: "namespace", label: "Namespace" }, { key: "region", label: "Region", placeholder: "us-ashburn-1" }, ...s3Keys],
  },
  {
    id: "minio",
    name: "MinIO / self-hosted S3",
    protocol: "s3",
    docsUrl: "https://min.io/docs/minio/linux/index.html",
    fields: [bucket, { key: "endpoint", label: "Endpoint", placeholder: "https://minio.example.com" }, { key: "region", label: "Region", optional: true, placeholder: "us-east-1" }, ...s3Keys],
  },
];

export function getProvider(id: string) {
  return providers.find((p) => p.id === id);
}
