import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/login-form";
import { LogoMark } from "@/components/logo";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Masuk" };

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-5 py-12">
      <div className="w-full max-w-sm">
        <LogoMark className="h-9 text-accent-ink" />
        <h1 className="mt-6 text-[1.75rem] font-semibold tracking-tight text-ink">Masuk ke panel admin</h1>
        <p className="mt-1.5 text-[0.9375rem] text-ink-2">{site.name}</p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
