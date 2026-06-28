import { PageShell, PageTitle, Card } from "@/components/layout";

const faqs = [
  {
    q: "¿Cada iPhone es diferente?",
    a: "Sí. No es una tienda con stock genérico. Cada unidad tiene su propio estado, batería, accesorios y precio.",
  },
  {
    q: "¿La tasación es vinculante?",
    a: "No. Es orientativa. La oferta final se confirma tras revisar el dispositivo.",
  },
  {
    q: "¿Cómo compro un iPhone?",
    a: "Eliges la unidad, ves la ficha completa y compras o reservas con pago seguro. También puedes escribir por WhatsApp.",
  },
  {
    q: "¿Hacéis envíos?",
    a: "Entrega en mano en Madrid y envíos a toda España. (Configurables en V1.)",
  },
  {
    q: "¿Los iPhones son originales?",
    a: "Sí. 100% originales, libres de iCloud y SIM, listos para usar.",
  },
];

export default function FaqsPage() {
  return (
    <PageShell>
      <PageTitle title="FAQs" subtitle="Todo lo que necesitas saber" />
      <div className="mx-auto grid max-w-2xl gap-3">
        {faqs.map((f) => (
          <Card key={f.q} className="!p-5">
            <h2 className="font-semibold">{f.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#86868b]">{f.a}</p>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
