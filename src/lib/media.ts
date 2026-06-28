import fs from "fs";
import path from "path";

export type UnitMedia = {
  cover?: string;
  ficha?: string;
};

const mediaRoot = path.join(process.cwd(), "public", "media");

export function getUnitMedia(id: string): UnitMedia {
  const dir = path.join(mediaRoot, id);
  if (!fs.existsSync(dir)) return {};

  const coverExts = [".mp4", ".webm", ".jpg", ".jpeg", ".png", ".webp"];
  const fichaExts = [".jpg", ".jpeg", ".png", ".webp"];

  let cover: string | undefined;
  for (const ext of coverExts) {
    const file = path.join(dir, `01-cover${ext}`);
    if (fs.existsSync(file)) {
      cover = `/media/${id}/01-cover${ext}`;
      break;
    }
  }

  let ficha: string | undefined;
  for (const ext of fichaExts) {
    const file = path.join(dir, `02-ficha${ext}`);
    if (fs.existsSync(file)) {
      ficha = `/media/${id}/02-ficha${ext}`;
      break;
    }
  }

  return { cover, ficha };
}

export function getCatalogImage(id: string, media: UnitMedia) {
  return media.ficha ?? media.cover;
}
