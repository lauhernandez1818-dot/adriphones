import { PageShell, PageTitle, Card } from "@/components/layout";

const steps = [
  {
    title: "1. Publicamos tu unidad",
    text: "Cada iPhone es una ficha única con fotos, vídeo, specs y precio — como en Instagram, pero en web.",
  },
  {
    title: "2. El cliente compra o reserva",
    text: "Pago seguro con Stripe. El primero que lo compra se lo queda. Sin cientos de DMs.",
  },
  {
    title: "3. Tú gestionas desde el móvil",
    text: "Panel admin protegido por código: añadir, editar y marcar vendido en segundos.",
  },
  {
    title: "4. Compramos iPhones también",
    text: "Tasación orientativa + formulario. Las solicitudes llegan a tu panel.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <PageShell>
      <PageTitle
        title="Cómo funciona"
        subtitle="Automatiza ventas y compras sin perder el trato personal"
      />
      <div className="mx-auto grid max-w-2xl gap-4">
        {steps.map((s) => (
          <Card key={s.title}>
            <h2 className="font-bold">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#86868b]">{s.text}</p>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
