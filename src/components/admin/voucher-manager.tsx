"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { vouchers as seed, type Voucher } from "@/data/vouchers";
import { Dialog } from "@/components/dialog";
import { Switch } from "./ui";
import { formatDate, formatRupiah } from "@/lib/format";

const empty = { code: "", type: "percent" as Voucher["type"], value: "", minPurchase: "", quota: "", endsAt: "2026-12-31" };

export function VoucherManager() {
  const [rows, setRows] = useState<Voucher[]>(seed);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(empty);
  const [error, setError] = useState("");

  function create(e: React.FormEvent) {
    e.preventDefault();
    const code = f.code.trim().toUpperCase();
    const value = Number(f.value);
    if (!/^[A-Z0-9]{4,16}$/.test(code)) return setError("Kode 4-16 karakter, huruf dan angka saja.");
    if (rows.some((r) => r.code === code)) return setError("Kode voucher sudah dipakai.");
    if (!value || (f.type === "percent" && value > 100)) return setError("Nilai potongan belum benar.");
    setRows((r) => [
      {
        code,
        type: f.type,
        value,
        minPurchase: Number(f.minPurchase) || 0,
        quota: f.quota ? Number(f.quota) : null,
        used: 0,
        startsAt: "2026-11-06",
        endsAt: f.endsAt,
        isActive: true,
      },
      ...r,
    ]);
    setOpen(false);
    setF(empty);
    setError("");
    toast.success("Voucher dibuat", { description: code });
  }

  return (
    <>
      <div className="flex justify-end">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>
          <PlusIcon size={17} /> Buat Voucher
        </button>
      </div>
      <div className="mt-4 overflow-x-auto rounded-ui border border-line bg-surface">
        <table className="w-full min-w-[760px] text-left text-[0.9375rem]">
          <thead className="text-[0.8125rem] text-ink-3">
            <tr>
              <th className="px-5 py-3 font-medium">Kode</th>
              <th className="px-5 py-3 font-medium">Potongan</th>
              <th className="px-5 py-3 font-medium">Min. belanja</th>
              <th className="px-5 py-3 font-medium">Terpakai</th>
              <th className="px-5 py-3 font-medium">Berlaku sampai</th>
              <th className="px-5 py-3 font-medium">Aktif</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.code} className="border-t border-line">
                <td className="px-5 py-3.5 font-semibold tracking-wide text-ink">{v.code}</td>
                <td className="px-5 py-3.5 text-ink-2 tabular">{v.type === "percent" ? `${v.value}%` : formatRupiah(v.value)}</td>
                <td className="px-5 py-3.5 text-ink-2 tabular">{v.minPurchase ? formatRupiah(v.minPurchase) : "Tanpa minimum"}</td>
                <td className="px-5 py-3.5 text-ink-2 tabular">
                  {v.used}
                  {v.quota !== null ? <span className="text-ink-3"> / {v.quota}</span> : null}
                </td>
                <td className="px-5 py-3.5 text-ink-2">{formatDate(v.endsAt)}</td>
                <td className="px-5 py-3.5">
                  <Switch
                    checked={v.isActive}
                    label={`Aktifkan ${v.code}`}
                    onChange={(x) => {
                      setRows((r) => r.map((y) => (y.code === v.code ? { ...y, isActive: x } : y)));
                      toast.success(x ? "Voucher diaktifkan" : "Voucher dinonaktifkan", { description: v.code });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} title="Buat voucher">
        <form onSubmit={create} noValidate className="space-y-5 p-5">
          <div className="space-y-2">
            <label htmlFor="v-code" className="field-label">
              Kode
            </label>
            <input id="v-code" className="input uppercase" value={f.code} onChange={(e) => setF({ ...f, code: e.target.value })} />
            <p className="field-help">Contoh: NATAL26</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="v-type" className="field-label">
                Jenis potongan
              </label>
              <select id="v-type" className="input" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value as Voucher["type"] })}>
                <option value="percent">Persen</option>
                <option value="fixed">Nominal (Rp)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="v-value" className="field-label">
                Nilai
              </label>
              <input id="v-value" className="input tabular" inputMode="numeric" value={f.value} onChange={(e) => setF({ ...f, value: e.target.value.replace(/\D/g, "") })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="v-min" className="field-label">
                Min. belanja <span className="font-normal text-ink-3">(Rp)</span>
              </label>
              <input id="v-min" className="input tabular" inputMode="numeric" value={f.minPurchase} onChange={(e) => setF({ ...f, minPurchase: e.target.value.replace(/\D/g, "") })} />
            </div>
            <div className="space-y-2">
              <label htmlFor="v-quota" className="field-label">
                Kuota <span className="font-normal text-ink-3">(opsional)</span>
              </label>
              <input id="v-quota" className="input tabular" inputMode="numeric" value={f.quota} onChange={(e) => setF({ ...f, quota: e.target.value.replace(/\D/g, "") })} />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="v-end" className="field-label">
              Berlaku sampai
            </label>
            <input id="v-end" type="date" className="input" value={f.endsAt} onChange={(e) => setF({ ...f, endsAt: e.target.value })} />
          </div>
          {error ? <p className="field-error">{error}</p> : null}
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan Voucher
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
