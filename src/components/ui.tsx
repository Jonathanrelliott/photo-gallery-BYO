import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { site } from "@/lib/site";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cx("group inline-flex items-center gap-2.5", className)}>
      {site.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={site.logo} alt="" className="size-8 rounded-full object-cover ring-1 ring-lime/40 transition group-hover:shadow-glow" />
      ) : (
        <span className="relative grid size-8 place-items-center rounded-full bg-moss-800 ring-1 ring-lime/40 transition group-hover:shadow-glow">
          <svg viewBox="0 0 24 24" className="size-4.5 text-lime" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 21c0-6 0-9 6-14-1 6-2 9-6 14Z" strokeLinejoin="round" />
            <path d="M12 21c0-5-1-8-6-11 0 5 2 8 6 11Z" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <span className="text-lg font-semibold tracking-tight text-white">
        EditGen<span className="text-lime">lx</span>
      </span>
    </Link>
  );
}

const buttonVariants = {
  primary:
    "bg-lime text-ink-900 hover:bg-lime-soft shadow-[0_0_24px_-6px_rgb(198_255_61/0.7)]",
  secondary: "bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10",
  ghost: "text-mist hover:text-white hover:bg-white/5",
};

type ButtonProps = {
  variant?: keyof typeof buttonVariants;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClass({ variant = "primary", size = "md" }: ButtonProps = {}) {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
    buttonVariants[variant],
    sizes[size],
  );
}

export function Button({ variant, size, className, ...props }: ButtonProps & ComponentProps<"button">) {
  return <button className={cx(buttonClass({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ButtonProps & ComponentProps<typeof Link>) {
  return <Link className={cx(buttonClass({ variant, size }), className)} {...props} />;
}

/** Marks features that will be limited to the paid plan once billing exists. */
export function ProTag({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full bg-lilac/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-lilac ring-1 ring-lilac/30",
        className,
      )}
    >
      Pro
    </span>
  );
}

export function Pill({ tone = "neutral", children }: { tone?: "lime" | "blossom" | "peach" | "neutral"; children: ReactNode }) {
  const tones = {
    lime: "bg-lime/10 text-lime ring-lime/30",
    blossom: "bg-blossom/10 text-blossom ring-blossom/30",
    peach: "bg-peach/10 text-peach ring-peach/30",
    neutral: "bg-white/5 text-fog ring-white/10",
  };
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1", tones[tone])}>
      {children}
    </span>
  );
}

export function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  // Plain img: user photos come from arbitrary customer buckets, so next/image
  // remote patterns can't be known ahead of time.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className={cx("block", className)} />;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime/80">{children}</p>
  );
}
