// Carga todos los productos desde src/content/productos/*.json
// (un archivo por producto, editable desde el panel visual Pages CMS).

import { slugify } from "./utils";

const modules = import.meta.glob("../content/productos/*.json", { eager: true });

export interface Medida {
  medida: string;
  precio: number;
}

export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagenes: string[];
  destacado: boolean;
  agotado: boolean;
  oculto: boolean;
  material: string;
  incluye: string;
  medidas: Medida[];
}

export const productos: Producto[] = Object.entries(modules)
  .map(([ruta, mod]: [string, any]) => {
    const data = mod.default ?? mod;
    const id = ruta.split("/").pop()!.replace(/\.json$/, "");
    const imagenes = Array.isArray(data.imagenes)
      ? data.imagenes.filter(Boolean)
      : data.imagen
        ? [data.imagen]
        : [];
    return {
      id,
      slug: slugify(id),
      nombre: data.nombre,
      categoria: data.categoria,
      precio: data.precio ?? 0,
      descripcion: data.descripcion,
      imagenes,
      destacado: data.destacado ?? false,
      agotado: data.agotado ?? false,
      oculto: data.oculto ?? false,
      material: data.material ?? "",
      incluye: data.incluye ?? "",
      medidas: Array.isArray(data.medidas)
        ? data.medidas.filter((m: any) => m && m.medida)
        : [],
    };
  })
  // Los productos "ocultos" no se muestran en ningún lado (ni tarjeta, ni
  // página, ni conteo de categoría). El archivo queda: basta desactivar el
  // toggle para que reaparezca.
  .filter((p) => !p.oculto)
  .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
