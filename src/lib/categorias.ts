// Carga las categorías desde src/content/categorias/*.json
// (un archivo por categoría, editable desde el panel visual Pages CMS).
// El slug para la URL se genera automáticamente desde el nombre.

import { slugify } from "./utils";

const modules = import.meta.glob("../content/categorias/*.json", { eager: true });

export interface Categoria {
  nombre: string;
  slug: string;
  descripcion: string;
  orden: number;
}

export const categorias: Categoria[] = Object.entries(modules)
  .map(([, mod]: [string, any]) => {
    const data = mod.default ?? mod;
    return {
      nombre: data.nombre,
      slug: slugify(data.nombre),
      descripcion: data.descripcion ?? "",
      orden: typeof data.orden === "number" ? data.orden : 999,
    };
  })
  .sort((a, b) => a.orden - b.orden || a.nombre.localeCompare(b.nombre, "es"));
