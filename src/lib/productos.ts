// Carga todos los productos desde src/content/productos/*.json
// (un archivo por producto, editable desde el panel visual Pages CMS).

const modules = import.meta.glob("../content/productos/*.json", { eager: true });

export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagen: string;
  destacado: boolean;
}

export const productos: Producto[] = Object.entries(modules)
  .map(([ruta, mod]: [string, any]) => {
    const data = mod.default ?? mod;
    const id = ruta.split("/").pop()!.replace(/\.json$/, "");
    return {
      id,
      nombre: data.nombre,
      categoria: data.categoria,
      precio: data.precio,
      descripcion: data.descripcion,
      imagen: data.imagen ?? "",
      destacado: data.destacado ?? false,
    };
  })
  .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
