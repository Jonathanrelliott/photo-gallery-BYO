import { ArrowRight, Check, Cloud, Globe, Heart, KeyRound, Lock, Sparkles, Upload } from "lucide-react";
import { ButtonLink, Eyebrow, Photo, ProTag } from "@/components/ui";
import { photos } from "@/lib/mock-data";
import { providers } from "@/lib/providers";
import { site } from "@/lib/site";

const features = [
  {
    icon: KeyRound,
    title: "Your keys, your bucket",
    body: "Connect S3, R2, B2 or a dozen others. Originals never leave storage you control, and you can walk away any time.",
  },
  {
    icon: Sparkles,
    title: "Galleries clients remember",
    body: "Full-bleed covers, editorial layouts and a dark-room viewer that lets every frame glow.",
  },
  {
    icon: Heart,
    title: "Favorites and proofing",
    body: "Clients heart their picks, leave notes and download in the sizes you allow.",
  },
  {
    icon: Upload,
    title: "Direct-to-bucket uploads",
    body: "Drag in a whole shoot. Files go straight from your browser to your storage, no middleman.",
  },
  {
    icon: Globe,
    title: "Your own domain",
    body: "Serve galleries from galleries.yourstudio.com with automatic HTTPS.",
    pro: true,
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "Password-protected galleries, expiring links and download controls per client.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-greenhouse">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1.05fr_1fr] lg:pt-28">
          <div className="flex flex-col justify-center">
            <Eyebrow>Client galleries · bring your own storage</Eyebrow>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Where your photos
              <br />
              grow <em className="text-lime text-glow">wild</em>,
              <br />
              <span className="text-blossom">and stay yours.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
              Deliver stunning client galleries straight from the cloud bucket you already pay for. No storage
              markups, no lock-in, just your work, beautifully presented.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/login?mode=signup" size="lg">
                Start free <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/g/rush-lacrosse-senior-night" variant="secondary" size="lg">
                View a demo gallery
              </ButtonLink>
            </div>
            <div className="mt-10 flex items-center gap-6 font-mono text-xs text-fog/80">
              <span className="flex items-center gap-2"><Check className="size-3.5 text-lime" /> Free plan forever</span>
              <span className="flex items-center gap-2"><Check className="size-3.5 text-lime" /> 14+ storage providers</span>
            </div>
          </div>

          {/* Mosaic */}
          <div className="relative h-[520px] lg:h-[620px]">
            <div className="absolute -inset-10 rounded-full bg-lime/10 blur-3xl" />
            <div className="absolute left-0 top-6 w-[58%] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-2xl">
              <Photo src={photos[18].src} alt="" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute right-0 top-0 w-[44%] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-2xl">
              <Photo src={photos[19].src} alt="" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-6 w-[52%] overflow-hidden rounded-3xl ring-1 ring-lime/30 shadow-glow">
              <Photo src={photos[20].src} alt="" className="aspect-[16/10] object-[center_30%] w-full object-cover" />
            </div>
            <div className="glass absolute bottom-14 left-4 flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="grid size-9 place-items-center rounded-full bg-lime/15 text-lime">
                <Cloud className="size-4.5" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">Synced to your R2 bucket</p>
                <p className="font-mono text-xs text-fog">verdant-lens-galleries · 6,120 objects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
        <div className="max-w-2xl">
          <Eyebrow>Everything a gallery needs</Eyebrow>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-white sm:text-5xl">
            Built like a greenhouse: <em className="text-mint">calm</em> on the inside.
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group bg-ink-900 p-8 transition hover:bg-ink-800">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-moss-800 text-lime ring-1 ring-lime/20 transition group-hover:shadow-glow">
                  <f.icon className="size-5" />
                </span>
                {f.pro && <ProTag />}
              </div>
              <h3 className="mt-6 text-lg font-medium text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase strip */}
      <section className="relative overflow-hidden border-y border-white/5 bg-ink-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>The client view</Eyebrow>
              <h2 className="mt-4 font-display text-4xl tracking-tight text-white">A dark room for every frame.</h2>
            </div>
            <ButtonLink href="/g/rush-lacrosse-senior-night" variant="secondary">
              Open the demo <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <div className="mt-12 columns-2 gap-4 md:columns-4 [&>*]:mb-4">
            {[18, 7, 19, 13, 20, 16, 8, 11].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl ring-1 ring-white/5">
                <Photo src={photos[i].src} alt="" className="w-full transition duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storage */}
      <section id="storage" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Bring your own bucket</Eyebrow>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-white sm:text-5xl">
              Plug in the storage <em className="text-peach">you already trust.</em>
            </h2>
            <p className="mt-6 max-w-lg text-fog">
              Paste a key, pick a bucket, done. Your credentials are encrypted at rest and only used to sign
              uploads and deliveries. Switch providers whenever you like.
            </p>
            <ol className="mt-10 space-y-5">
              {["Create a bucket with your provider", `Paste an access key into ${site.name}`, "Upload a shoot and share the link"].map(
                (step, i) => (
                  <li key={step} className="flex items-center gap-4">
                    <span className="grid size-8 place-items-center rounded-full border border-lime/40 font-mono text-xs text-lime">
                      {i + 1}
                    </span>
                    <span className="text-white">{step}</span>
                  </li>
                ),
              )}
            </ol>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {providers.map((p) => (
              <div
                key={p.id}
                className="flex min-h-20 flex-col justify-between rounded-2xl border border-white/5 bg-ink-800/60 p-4 transition hover:border-lime/30"
              >
                <span className="text-sm font-medium text-white">{p.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-fog">
                  {p.protocol === "s3" ? "S3 compatible" : p.protocol === "gcs" ? "Google API" : "Azure API"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 border-t border-white/5 bg-greenhouse py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-white sm:text-5xl">
              You already pay for storage. <br className="hidden sm:block" />
              <em className="text-lime">We won&apos;t charge you twice.</em>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-ink-900/80 p-8">
              <h3 className="text-lg font-medium text-white">Seedling</h3>
              <p className="mt-2 font-display text-5xl text-white">
                $0<span className="text-base text-fog"> / forever</span>
              </p>
              <ul className="mt-8 space-y-3 text-sm text-mist">
                {["Unlimited galleries", "Connect any storage provider", "Favorites & downloads", `${site.domain}/your-studio link`].map((x) => (
                  <li key={x} className="flex gap-3"><Check className="size-4 text-lime" /> {x}</li>
                ))}
              </ul>
              <ButtonLink href="/login?mode=signup" variant="secondary" className="mt-10 w-full">
                Start free
              </ButtonLink>
            </div>
            <div className="relative rounded-3xl border border-lime/40 bg-ink-900/80 p-8 shadow-glow">
              <span className="absolute -top-3 right-8 rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-900">
                Coming soon
              </span>
              <h3 className="flex items-center gap-2 text-lg font-medium text-white">Canopy <ProTag /></h3>
              <p className="mt-2 font-display text-5xl text-white">
                $—<span className="text-base text-fog"> / month</span>
              </p>
              <ul className="mt-8 space-y-3 text-sm text-mist">
                {["Everything in Seedling", "Custom domain with HTTPS", `Remove ${site.name} branding`, "Client proofing & print store"].map((x) => (
                  <li key={x} className="flex gap-3"><Check className="size-4 text-lime" /> {x}</li>
                ))}
              </ul>
              <button disabled className="mt-10 h-10 w-full rounded-full bg-lime/20 text-sm font-medium text-lime">
                Join the waitlist
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
