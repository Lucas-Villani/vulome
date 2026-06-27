/** Convierte un texto en un slug apto para URL: "Vasos y Tazas" -> "vasos-y-tazas" */
export function slugify(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Formatea un número como precio en pesos argentinos: 22900 -> "$ 22.900" */
export function formatearPrecio(valor: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(valor);
}

/** Arma un link de WhatsApp con mensaje pre-cargado. El número se limpia a solo dígitos. */
export function linkWhatsapp(numero: string, mensaje: string): string {
  const limpio = (numero || "").replace(/[^0-9]/g, "");
  return `https://wa.me/${limpio}?text=${encodeURIComponent(mensaje)}`;
}
