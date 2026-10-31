"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, cx } from "@/components/ui";

type Mode = "login" | "signup";

export function AuthForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [mode, setMode] = useState<Mode>(params.get("mode") === "signup" ? "signup" : "login");
  const [pending, setPending] = useState(false);

  // TODO: replace with Supabase auth once the project is connected.
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setTimeout(() => router.push("/dashboard"), 500);
  }

  return (
    <>
      <h1 className="font-display text-4xl tracking-tight text-white">
        {mode === "login" ? "Welcome back" : "Plant your studio"}
      </h1>
      <p className="mt-2 text-sm text-fog">
        {mode === "login" ? "Log in to manage your galleries." : "Create a free account. No card required."}
      </p>

      <div className="mt-8 grid grid-cols-2 rounded-full bg-ink-800 p-1 ring-1 ring-white/5">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cx(
              "h-9 rounded-full text-sm font-medium transition",
              mode === m ? "bg-moss-700 text-white ring-1 ring-lime/30" : "text-fog hover:text-white",
            )}
          >
            {m === "login" ? "Log in" : "Sign up"}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {mode === "signup" && <Field label="Studio name" name="studio" placeholder="Verdant Lens Studio" />}
        <Field label="Email" name="email" type="email" placeholder="you@studio.com" />
        <Field
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          hint={mode === "login" ? <a href="#" className="text-lime/80 hover:text-lime">Forgot?</a> : undefined}
        />
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? "Opening the greenhouse…" : mode === "login" ? "Log in" : "Create account"}
          {!pending && <ArrowRight className="size-4" />}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4 text-xs text-fog/70">
        <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid gap-3">
        <Button variant="secondary" onClick={onSubmit} className="w-full">
          <GoogleMark /> Continue with Google
        </Button>
        <Button variant="secondary" onClick={onSubmit} className="w-full">
          <Mail className="size-4" /> Email me a magic link
        </Button>
      </div>

      <p className="mt-8 text-center text-xs text-fog/70">
        By continuing you agree to the Terms and Privacy Policy.
      </p>
    </>
  );
}

function Field({
  label,
  hint,
  ...props
}: { label: string; hint?: React.ReactNode } & React.ComponentProps<"input">) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm text-mist">
        {label}
        {hint && <span className="text-xs">{hint}</span>}
      </span>
      <input
        required
        className="h-11 w-full rounded-xl border border-white/10 bg-ink-900/80 px-4 text-white placeholder:text-fog/50 outline-none transition focus:border-lime/50 focus:ring-4 focus:ring-lime/10"
        {...props}
      />
    </label>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.6 2.3 2.3 6.6 2.3 12s4.3 9.7 9.7 9.7c5.6 0 9.3-3.9 9.3-9.5 0-.6-.1-1.1-.2-1.6H12Z" />
    </svg>
  );
}
