"use client";

import { cx } from "@/components/ui";

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={cx("relative h-6 w-11 shrink-0 rounded-full transition", on ? "bg-lime shadow-glow" : "bg-ink-600")}
    >
      <span className={cx("absolute top-0.5 size-5 rounded-full bg-ink-900 transition", on ? "left-5.5" : "left-0.5")} />
    </button>
  );
}
