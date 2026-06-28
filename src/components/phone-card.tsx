import Image from "next/image";
import Link from "next/link";
import { ProductVideo } from "@/components/product-video";
import type { iPhoneUnit } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import type { UnitMedia } from "@/lib/media";

export function PhoneCard({ unit, media }: { unit: iPhoneUnit; media: UnitMedia }) {
  const sold = unit.status === "sold";
  const image = media.ficha ?? media.cover;

  return (
    <Link
      href={sold ? "#" : `/iphone/${unit.id}`}
      className={`group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/10 ${sold ? "pointer-events-none opacity-55" : ""}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-background">
        {image ? (
          media.cover?.endsWith(".mp4") && !media.ficha ? (
            <video
              src={media.cover}
              className="h-full w-full object-cover"
              muted
              playsInline
              loop
              autoPlay
            />
          ) : (
            <Image
              src={image}
              alt={`${unit.model} ${unit.condition}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Sin foto
          </div>
        )}
        {unit.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
            Nuevo
          </span>
        )}
        {sold && (
          <span className="absolute right-3 top-3 rounded-full bg-[#1d1d1f] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
            Vendido
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold tracking-tight">{unit.model}</h3>
        <p className="mt-1 text-sm text-muted">
          {unit.storage} · {unit.color}
        </p>
        <p className="mt-0.5 text-xs text-[#86868b]">
          {unit.condition}
          {unit.battery < 100 ? ` · Bat. ${unit.battery}%` : ""}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">{formatPrice(unit.price)}</span>
          {!sold && (
            <span className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-md transition group-hover:opacity-90">
              Comprar
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function PhoneGallery({ media, alt }: { media: UnitMedia; alt: string }) {
  return (
    <div className="space-y-4">
      {media.cover?.endsWith(".mp4") && (
        <ProductVideo src={media.cover} poster={media.ficha} />
      )}
      {media.ficha && (
        <div className="overflow-hidden rounded-2xl border border-border bg-black">
          <Image
            src={media.ficha}
            alt={alt}
            width={1080}
            height={1920}
            className="h-auto w-full"
            priority
          />
        </div>
      )}
      {!media.cover && !media.ficha && (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-background text-muted">
          Sin fotos
        </div>
      )}
    </div>
  );
}
