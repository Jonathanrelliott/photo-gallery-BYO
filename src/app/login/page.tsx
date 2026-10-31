import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo, Photo } from "@/components/ui";
import { photos } from "@/lib/mock-data";
import { AuthForm } from "./auth-form";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Photo src={photos[17].src} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <blockquote className="max-w-md font-display text-3xl leading-snug text-white">
            &ldquo;My clients think I hired a design studio. I just plugged in my R2 bucket.&rdquo;
          </blockquote>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-lime">
            Sample testimonial · placeholder
          </p>
        </div>
      </div>

      <div className="relative flex flex-col bg-greenhouse px-6 py-8 sm:px-12">
        <Logo />
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <Suspense>
            <AuthForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
