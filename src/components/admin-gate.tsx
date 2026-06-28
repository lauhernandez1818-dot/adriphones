import { LockKeyhole, ShieldCheck } from "lucide-react";
import { adminLogin } from "@/app/admin/actions";
import { PageShell, Card, PrimaryButton } from "@/components/layout";

export function AdminGate({ error }: { error?: string }) {
  return (
    <PageShell>
      <div className="mx-auto max-w-md">
        <Card className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
            <LockKeyhole className="h-7 w-7 text-accent" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Panel de administración</h1>
          <p className="mt-2 text-sm text-muted">
            Acceso restringido. Introduce el código que te ha facilitado el equipo para
            gestionar inventario y solicitudes de venta.
          </p>

          <form action={adminLogin} className="mt-6 space-y-4 text-left">
            <div>
              <label htmlFor="admin-code" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Código de acceso
              </label>
              <input
                id="admin-code"
                name="code"
                type="password"
                inputMode="text"
                autoComplete="off"
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-accent/30 transition focus:border-accent focus:ring-2"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            <PrimaryButton type="submit" className="flex w-full items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Entrar al panel
            </PrimaryButton>
          </form>

          <p className="mt-5 text-xs text-muted">
            Boceto V1 · En producción se usará login seguro con roles y 2FA.
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
