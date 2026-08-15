import type { CaptionVariant } from "@/data/mock";

const ctaByNiche: Record<string, string> = {
  Viajes: "Guarda esto antes de tu próximo viaje.",
  Negocios: "Guarda esto antes de tomar tu próxima decisión de negocio.",
  Educación: "Guárdalo para cuando lo necesites.",
  Marketing: "Aplica esto en tu próxima publicación.",
  Creador: "Guarda este post, te va a servir esta semana.",
  Contenido: "Comparte esto con alguien que también crea contenido.",
};

function hashtagsFor(niche?: string) {
  const base = niche ? `#${niche.toLowerCase().replace(/\s+/g, "")}` : "#contenido";
  return `${base} #creadores`;
}

function lowerFirst(text: string) {
  return text.length ? text.charAt(0).toLowerCase() + text.slice(1) : text;
}

export function generateCaptionVariants(
  hook: string,
  niche?: string
): Record<CaptionVariant, string> {
  const cta = (niche && ctaByNiche[niche]) ?? "Guarda este post para después.";
  const tags = hashtagsFor(niche);

  return {
    Directo: `${hook}\n\n${cta}\n\n${tags}`,
    Storytelling: `Todo empezó cuando pasó esto: ${lowerFirst(
      hook
    )}. Te cuento cómo terminó 👇\n\n${tags}`,
    Preguntas: `¿Te ha pasado esto? ${hook}\n\nCuéntame en los comentarios 👇\n\n${tags}`,
  };
}
