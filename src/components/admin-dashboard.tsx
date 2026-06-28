import { PageShell } from "@/components/layout";
import { AdminPanel } from "@/components/admin-panel";
import { units, sellRequests } from "@/lib/data";

export function AdminDashboard() {
  return (
    <PageShell admin>
      <AdminPanel initialUnits={units} initialRequests={sellRequests} />
    </PageShell>
  );
}
