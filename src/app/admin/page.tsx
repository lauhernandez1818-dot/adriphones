import { AdminGate } from "@/components/admin-gate";
import { AdminDashboard } from "@/components/admin-dashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <AdminGate
        error={
          error === "auth"
            ? "Código incorrecto. Solo el equipo AdriiPhones tiene acceso."
            : undefined
        }
      />
    );
  }

  return <AdminDashboard />;
}
