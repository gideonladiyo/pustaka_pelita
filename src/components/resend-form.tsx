"use client";

import { useState } from "react";
import { EnvelopeSimpleIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import { whatsappLink } from "@/data/site";

export function ResendForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (sentTo) {
    return (
      <div className="rounded-ui border border-line bg-surface p-7">
        <div className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent-ink">
          <EnvelopeSimpleIcon size={24} />
        </div>
        <h2 className="mt-5 font-serif text-[1.75rem] leading-tight text-ink">Silakan periksa email Anda</h2>
        {/* Respons selalu sama agar tidak membocorkan email mana yang terdaftar (PRD DLV-05) */}
        <p className="mt-3 leading-relaxed text-ink-2">
          Jika <strong className="text-ink">{sentTo}</strong> pernah dipakai untuk membeli, link unduhan akan masuk dalam beberapa
          menit. Periksa juga folder Spam atau Promosi.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSentTo(null)}>
            Pakai email lain
          </button>
          <a href={whatsappLink("Halo, saya belum menerima link unduhan e-book.")} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
            <WhatsappLogoIcon size={17} /> Tetap tidak masuk?
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="space-y-5 rounded-ui border border-line bg-surface p-7"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
          setError("Format email belum benar, contoh: nama@gmail.com");
          return;
        }
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setSentTo(email.trim().toLowerCase());
        }, 700);
      }}
    >
      <div className="space-y-2">
        <label htmlFor="resend-email" className="field-label">
          Email pembelian
        </label>
        <input
          id="resend-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className="input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby="resend-email-msg"
        />
        <p id="resend-email-msg" className={error ? "field-error" : "field-help"}>
          {error || "Link dikirim ke alamat ini, bukan ditampilkan di layar."}
        </p>
      </div>
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Mengirim..." : "Kirim Link"}
      </button>
    </form>
  );
}
