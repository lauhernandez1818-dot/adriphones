"use client";

type ProductVideoProps = {
  src: string;
  poster?: string;
};

export function ProductVideo({ src, poster }: ProductVideoProps) {
  return (
    <div className="mx-auto w-full max-w-lg lg:max-w-xl">
      <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-lg shadow-black/20">
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="product-video block w-full bg-black"
        />
      </div>
    </div>
  );
}
