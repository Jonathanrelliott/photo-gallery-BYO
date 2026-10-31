"use client";

import { AlertTriangle, CheckCircle2, ExternalLink, Loader2, Plus, ShieldCheck, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button, cx, Pill } from "@/components/ui";
import { connectedStorage } from "@/lib/mock-data";
import { getProvider, providers, type StorageProvider } from "@/lib/providers";

type Connection = (typeof connectedStorage)[number];

export function StorageManager() {
  const [connections, setConnections] = useState<Connection[]>(connectedStorage);
  const [connecting, setConnecting] = useState<StorageProvider | null>(null);

  return (
    <>
      <section>
        <h2 className="text-sm font-medium uppercase tracking-wider text-fog">Connected</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {connections.map((c) => {
            const p = getProvider(c.providerId);
            const healthy = c.status === "healthy";
            return (
              <div key={c.bucket} className="glass rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white">{c.label}</p>
                    <p className="text-sm text-fog">{p?.name}</p>
                  </div>
                  <Pill tone={healthy ? "lime" : "peach"}>
                    {healthy ? <CheckCircle2 className="size-3.5" /> : <AlertTriangle className="size-3.5" />}
                    {healthy ? "Healthy" : "Check keys"}
                  </Pill>
                </div>
                <p className="mt-5 font-mono text-xs text-mist">{c.bucket}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-600">
                  <div className="h-full rounded-full bg-gradient-to-r from-moss-500 to-lime" style={{ width: `${Math.min(100, c.usedGb / 2)}%` }} />
                </div>
                <p className="mt-2 font-mono text-xs text-fog">
                  {c.usedGb} GB · {c.objects.toLocaleString()} objects
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wider text-fog">Add a provider</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() => setConnecting(p)}
              className="group flex items-center justify-between rounded-2xl border border-white/5 bg-ink-800/50 p-4 text-left transition hover:border-lime/30 hover:bg-ink-800"
            >
              <div>
                <p className="flex items-center gap-2 text-sm text-white">
                  {p.name}
                  {p.popular && <span className="size-1.5 rounded-full bg-lime shadow-glow" />}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-fog">
                  {p.protocol === "s3" ? "S3 compatible" : p.protocol === "gcs" ? "Google API" : "Azure API"}
                </p>
              </div>
              <Plus className="size-4 text-fog transition group-hover:text-lime" />
            </button>
          ))}
        </div>
      </section>

      {connecting && (
        <ConnectDrawer
          provider={connecting}
          onClose={() => setConnecting(null)}
          onConnected={(c) => {
            setConnections([...connections, c]);
            setConnecting(null);
          }}
        />
      )}
    </>
  );
}

function ConnectDrawer({
  provider,
  onClose,
  onConnected,
}: {
  provider: StorageProvider;
  onClose: () => void;
  onConnected: (c: Connection) => void;
}) {
  const [state, setState] = useState<"idle" | "testing" | "ok">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // TODO: verify credentials server-side with a HEAD/list call before saving.
    setState("testing");
    setTimeout(() => {
      setState("ok");
      setTimeout(
        () =>
          onConnected({
            providerId: provider.id,
            label: String(data.get("label")) || provider.name,
            bucket: String(data.get("bucket") ?? data.get("container") ?? "bucket"),
            status: "healthy",
            usedGb: 0,
            objects: 0,
          }),
        600,
      );
    }, 900);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink-950/70 backdrop-blur-sm" onClick={onClose}>
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-800 shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-white/5 p-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">Connect</p>
            <h2 className="mt-1 font-display text-3xl text-white">{provider.name}</h2>
            <a href={provider.docsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-fog hover:text-lime">
              Provider docs <ExternalLink className="size-3" />
            </a>
          </div>
          <button type="button" onClick={onClose} className="text-fog hover:text-white" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          <Field name="label" label="Nickname" placeholder={`My ${provider.name}`} optional />
          {provider.fields.map((f) =>
            f.key === "serviceAccountJson" ? (
              <label key={f.key} className="block">
                <span className="mb-1.5 block text-sm text-mist">{f.label}</span>
                <textarea
                  name={f.key}
                  required
                  rows={5}
                  placeholder='{ "type": "service_account", … }'
                  className="w-full rounded-xl border border-white/10 bg-ink-900 p-3 font-mono text-xs text-white placeholder:text-fog/50 outline-none focus:border-lime/50"
                />
              </label>
            ) : (
              <Field key={f.key} name={f.key} label={f.label} placeholder={f.placeholder} secret={f.secret} optional={f.optional} />
            ),
          )}
          {provider.endpoint && (
            <p className="rounded-xl bg-ink-900/80 p-3 font-mono text-[11px] text-fog">
              Endpoint: <span className="text-mist">{provider.endpoint}</span>
            </p>
          )}
          <div className="flex gap-3 rounded-xl border border-lime/20 bg-lime/5 p-3 text-xs text-mist">
            <ShieldCheck className="size-4 shrink-0 text-lime" />
            Use a key scoped to this one bucket with read, write and list access. Never paste your root account key.
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-white/5 p-6">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={state !== "idle"} className={cx(state === "ok" && "bg-mint")}>
            {state === "testing" && <Loader2 className="size-4 animate-spin" />}
            {state === "ok" && <CheckCircle2 className="size-4" />}
            {state === "idle" ? "Test & connect" : state === "testing" ? "Testing connection…" : "Connected"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, secret, optional, ...props }: { label: string; secret?: boolean; optional?: boolean } & React.ComponentProps<"input">) {
  return (
    <label className="block">
      <span className="mb-1.5 flex justify-between text-sm text-mist">
        {label}
        {optional && <span className="text-xs text-fog">optional</span>}
      </span>
      <input
        type={secret ? "password" : "text"}
        required={!optional}
        autoComplete="off"
        className="h-11 w-full rounded-xl border border-white/10 bg-ink-900 px-4 text-white placeholder:text-fog/50 outline-none focus:border-lime/50 focus:ring-4 focus:ring-lime/10"
        {...props}
      />
    </label>
  );
}
