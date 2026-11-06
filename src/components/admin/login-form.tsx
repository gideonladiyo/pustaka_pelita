"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon, InfoIcon } from "@phosphor-icons/react/ssr";

export function AdminLoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => router.push("/admin/dashboard"), 500);
      }}
    >
      <div className="space-y-2">
        <label htmlFor="admin-email" className="field-label">
          Email
        </label>
        <input id="admin-email" type="email" className="input" defaultValue="admin@pustakapelita.id" autoComplete="username" />
      </div>
      <div className="space-y-2">
        <label htmlFor="admin-password" className="field-label">
          Kata sandi
        </label>
        <div className="relative">
          <input
            id="admin-password"
            type={show ? "text" : "password"}
            className="input pr-12"
            defaultValue="prototype"
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-ui text-ink-3 hover:text-ink"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {show ? <EyeSlashIcon size={19} /> : <EyeIcon size={19} />}
          </button>
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Memeriksa..." : "Masuk"}
      </button>
      <p className="flex gap-2 rounded-ui bg-warn-soft px-3 py-2.5 text-[0.8125rem] leading-snug text-warn">
        <InfoIcon size={17} className="mt-px shrink-0" />
        Prototype: kredensial sudah terisi, cukup klik Masuk. Versi final memakai login aman dengan 2FA.
      </p>
    </form>
  );
}
