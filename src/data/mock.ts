// Datos de ejemplo (mock) para poblar el dashboard.
// En producción esto se reemplaza por llamadas a la API / base de datos y por
// los jobs reales (scraping de competidores, scan de tendencias, etc.) — ver
// CLAUDE.md § Datos de ejemplo para el detalle de qué reemplaza qué.

export type Platform = "Instagram" | "TikTok" | "YouTube Shorts";

// ---------------------------------------------------------------------------
// Biblioteca de Hooks
// ---------------------------------------------------------------------------

export type HookType =
  | "Lista"
  | "POV"
  | "Confesión"
  | "Pregunta"
  | "Advertencia"
  | "Comparación";

export const hookTypes: HookType[] = [
  "Lista",
  "POV",
  "Confesión",
  "Pregunta",
  "Advertencia",
  "Comparación",
];

export type Hook = {
  id: string;
  hook: string;
  template: string;
  transcript: string;
  hookType: HookType;
  niche: string;
  platform: Platform;
  creator: { name: string; handle: string };
  views: number;
  savedAt: string;
};

export const hooks: Hook[] = [
  {
    id: "h1",
    hook: "5 cosas que nadie te dice antes de venir a Puerto",
    template: "5 cosas que nadie te dice antes de venir a [destino]",
    transcript:
      "5 cosas que nadie te dice antes de venir a Puerto: uno, el clima cambia después de las 4pm. Dos, los mejores atardeceres no están donde crees. Tres, casi todo se paga mejor en efectivo. Cuatro...",
    hookType: "Lista",
    niche: "Viajes",
    platform: "Instagram",
    creator: { name: "Ana Beltrán", handle: "@anabeltran.travel" },
    views: 1420000,
    savedAt: "2026-08-12",
  },
  {
    id: "h2",
    hook: "POV: Son las 12pm, saliste del hotel y tu vuelo es a medianoche",
    template: "POV: Son las [hora], saliste de/tu [lugar] y tu [evento] es a [hora futura]",
    transcript:
      "POV: son las 12pm, ya tienes que dejar el hotel y tu vuelo sale a medianoche. Esto es lo que hicimos con esas 12 horas libres para no perder el día...",
    hookType: "POV",
    niche: "Viajes",
    platform: "TikTok",
    creator: { name: "Kevin Prado", handle: "@kevinpradoo" },
    views: 892000,
    savedAt: "2026-08-11",
  },
  {
    id: "h3",
    hook: "Nadie te dice esto antes de renunciar a tu trabajo...",
    template: "Nadie te dice esto antes de [decisión grande]...",
    transcript:
      "Nadie te dice esto antes de renunciar a tu trabajo: los primeros 90 días sin salario fijo se sienten como caída libre. Yo pasé por eso hace dos años y esto es lo que hubiera hecho distinto...",
    hookType: "Confesión",
    niche: "Negocios",
    platform: "Instagram",
    creator: { name: "Mariana Ruiz", handle: "@marianacrea" },
    views: 812000,
    savedAt: "2026-08-10",
  },
  {
    id: "h4",
    hook: "¿Por qué tus reels dejaron de crecer de la nada?",
    template: "¿Por qué [resultado negativo] de la nada?",
    transcript:
      "¿Por qué tus reels dejaron de crecer de la nada? No es el algoritmo castigándote, es uno de estos 3 errores que casi nadie revisa...",
    hookType: "Pregunta",
    niche: "Marketing",
    platform: "Instagram",
    creator: { name: "Valen Ortega", handle: "@valenortega" },
    views: 542000,
    savedAt: "2026-08-08",
  },
  {
    id: "h5",
    hook: "Deja de hacer esto si quieres que tus reels se vean",
    template: "Deja de hacer esto si quieres [resultado deseado]",
    transcript:
      "Deja de hacer esto si quieres que tus reels se vean: cortar el hook a los 3 segundos exactos. Te muestro el timing real que usan las cuentas grandes...",
    hookType: "Advertencia",
    niche: "Contenido",
    platform: "Instagram",
    creator: { name: "Sofía Lem", handle: "@sofialem" },
    views: 673000,
    savedAt: "2026-08-05",
  },
  {
    id: "h6",
    hook: "Mis primeros 10 reels vs. mis últimos 10, la diferencia me sorprendió",
    template: "Mis primeros [N] [cosa] vs. mis últimos [N], la diferencia me sorprendió",
    transcript:
      "Mis primeros 10 reels vs. mis últimos 10, la diferencia me sorprendió. Split screen del antes y el después, y esto es exactamente lo que cambié...",
    hookType: "Comparación",
    niche: "Creador",
    platform: "TikTok",
    creator: { name: "Diego Salas", handle: "@diegosalasbiz" },
    views: 951000,
    savedAt: "2026-08-03",
  },
  {
    id: "h7",
    hook: "3 apps gratis que reemplazaron mi editor de video",
    template: "[N] [herramientas] gratis que reemplazaron [herramienta cara]",
    transcript:
      "3 apps gratis que reemplazaron mi editor de video de $30 al mes. La primera edita subtítulos automáticos, la segunda...",
    hookType: "Lista",
    niche: "Educación",
    platform: "YouTube Shorts",
    creator: { name: "Romina Tecla", handle: "@rominatecla" },
    views: 298000,
    savedAt: "2026-07-30",
  },
  {
    id: "h8",
    hook: "POV: Llegaste a Puerto sin reservación y esto pasó",
    template: "POV: Llegaste a [destino] sin [preparación] y esto pasó",
    transcript:
      "POV: llegaste a Puerto sin reservación un viernes de temporada alta. Esto es exactamente lo que hicimos las siguientes 3 horas para conseguir hotel...",
    hookType: "POV",
    niche: "Viajes",
    platform: "TikTok",
    creator: { name: "Andrés Coba", handle: "@andrescoba.viajes" },
    views: 1105000,
    savedAt: "2026-07-28",
  },
];

export const hookNiches = Array.from(new Set(hooks.map((h) => h.niche))).sort();

// ---------------------------------------------------------------------------
// Analíticas
// ---------------------------------------------------------------------------

export type AnalyticsSummary = {
  views: { value: number; delta: number };
  saves: { value: number; delta: number };
  newFollowers: { value: number; delta: number };
  dms: { value: number; delta: number };
};

export const analyticsSummary: AnalyticsSummary = {
  views: { value: 410600, delta: 18.4 },
  saves: { value: 6590, delta: 24.1 },
  newFollowers: { value: 950, delta: 12.7 },
  dms: { value: 214, delta: 31.5 },
};

export type TrendPoint = {
  label: string;
  views: number;
  saves: number;
  followers: number;
  dms: number;
};

function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildRange(
  points: number,
  seed: number,
  base: { views: number; saves: number; followers: number; dms: number },
  label: (index: number) => string
): TrendPoint[] {
  const random = mulberry32(seed);
  const series: TrendPoint[] = [];
  for (let i = 0; i < points; i++) {
    const growth = 1 + i * 0.028;
    const noise = () => 0.86 + random() * 0.28;
    series.push({
      label: label(i),
      views: Math.round(base.views * growth * noise()),
      saves: Math.round(base.saves * growth * noise()),
      followers: Math.round(base.followers * growth * noise()),
      dms: Math.round(base.dms * growth * noise()),
    });
  }
  return series;
}

const dayLabels = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export type RangeKey = "7d" | "30d" | "90d";

export const rangeLabels: Record<RangeKey, string> = {
  "7d": "7 días",
  "30d": "30 días",
  "90d": "90 días",
};

export const performanceRanges: Record<RangeKey, TrendPoint[]> = {
  "7d": buildRange(
    7,
    11,
    { views: 52000, saves: 820, followers: 110, dms: 22 },
    (i) => dayLabels[i]
  ),
  "30d": buildRange(
    5,
    22,
    { views: 340000, saves: 5200, followers: 640, dms: 150 },
    (i) => `Sem ${i + 1}`
  ),
  "90d": buildRange(
    13,
    33,
    { views: 320000, saves: 4900, followers: 600, dms: 140 },
    (i) => `Sem ${i + 1}`
  ),
};

export type ContentPerformanceItem = {
  id: string;
  title: string;
  format: "Reel" | "Carrusel" | "Historia";
  views: number;
  saves: number;
  shares: number;
  publishedAt: string;
  reason: string;
};

// Rendimiento de los últimos 30 días — se usa tanto para el top 5 como para
// calcular el promedio que determina qué se marca como "contenido destacado".
export const contentPerformance: ContentPerformanceItem[] = [
  {
    id: "cp1",
    title: "Así reaccioné cuando perdí mi vuelo por 5 minutos",
    format: "Reel",
    views: 132000,
    saves: 4100,
    shares: 1240,
    publishedAt: "2026-08-11",
    reason:
      "Hook de urgencia + remate cómico en los primeros 2 segundos; el guardado se disparó porque funciona como advertencia útil, no solo anécdota.",
  },
  {
    id: "cp2",
    title: "5 cosas que nadie te dice antes de venir a Puerto",
    format: "Carrusel",
    views: 118000,
    saves: 3820,
    shares: 960,
    publishedAt: "2026-08-09",
    reason:
      "Formato lista clásico con portada de atardecer; alto guardado porque la audiencia lo usa como checklist antes de viajar.",
  },
  {
    id: "cp3",
    title: "POV: Son las 12pm, saliste del hotel y tu vuelo es a medianoche",
    format: "Reel",
    views: 116000,
    saves: 2950,
    shares: 1080,
    publishedAt: "2026-08-13",
    reason:
      "El formato POV genera identificación inmediata; resuelve una duda real (qué hacer con horas libres) sin decirlo de forma directa.",
  },
  {
    id: "cp4",
    title: "El error que casi arruina mi primer viaje solo",
    format: "Reel",
    views: 61000,
    saves: 1450,
    shares: 310,
    publishedAt: "2026-08-07",
    reason:
      "Buen ritmo de edición, pero el hook tarda casi 4 segundos en enganchar — rendimiento sólido, no viral.",
  },
  {
    id: "cp5",
    title: "3 apps que reemplazaron mi guía de viaje",
    format: "Carrusel",
    views: 52000,
    saves: 1680,
    shares: 205,
    publishedAt: "2026-08-04",
    reason:
      "Utilidad clara y directa; buen guardado pero alcance limitado por no tener un gancho emocional en la portada.",
  },
  {
    id: "cp6",
    title: "Un día completo de grabación, sin editar",
    format: "Reel",
    views: 44000,
    saves: 890,
    shares: 140,
    publishedAt: "2026-08-06",
    reason: "Contenido de rutina; rendimiento estable dentro del promedio esperado.",
  },
  {
    id: "cp7",
    title: "Cómo empaco mi mochila en 10 minutos",
    format: "Reel",
    views: 39000,
    saves: 1120,
    shares: 95,
    publishedAt: "2026-08-02",
    reason: "Formato tutorial; buen guardado, alcance dentro del promedio.",
  },
  {
    id: "cp8",
    title: "Lo que como en un día de viaje",
    format: "Historia",
    views: 35000,
    saves: 410,
    shares: 60,
    publishedAt: "2026-08-14",
    reason: "Contenido de conexión diaria; no busca viralidad, mantiene engagement.",
  },
  {
    id: "cp9",
    title: "3 lugares que no salen en Google Maps",
    format: "Carrusel",
    views: 28000,
    saves: 980,
    shares: 145,
    publishedAt: "2026-07-31",
    reason: "Nicho específico; guardado alto mas alcance moderado.",
  },
  {
    id: "cp10",
    title: "Responde: ¿vale la pena viajar en temporada alta?",
    format: "Historia",
    views: 24000,
    saves: 210,
    shares: 30,
    publishedAt: "2026-08-01",
    reason: "Formato pregunta/encuesta; genera conversación, no alcance masivo.",
  },
  {
    id: "cp11",
    title: "Cómo negocio el precio del hotel en la puerta",
    format: "Reel",
    views: 19000,
    saves: 640,
    shares: 88,
    publishedAt: "2026-07-29",
    reason: "Tema útil pero de nicho; rendimiento por debajo del promedio.",
  },
  {
    id: "cp12",
    title: "Detrás de cámaras: así planeo el contenido del mes",
    format: "Reel",
    views: 15000,
    saves: 320,
    shares: 40,
    publishedAt: "2026-07-27",
    reason: "Contenido meta/proceso; audiencia fiel, alcance más bajo de lo usual.",
  },
];

export const averageViews30d = Math.round(
  contentPerformance.reduce((sum, item) => sum + item.views, 0) /
    contentPerformance.length
);

export const featuredThreshold = averageViews30d * 2;

export const isFeatured = (views: number) => views >= featuredThreshold;

export const top5ContentThisWeek = [...contentPerformance]
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);

// ---------------------------------------------------------------------------
// Seguimiento de Competidores
// ---------------------------------------------------------------------------

export type CompetitorAccount = {
  handle: string;
  name: string;
  followers: number;
  niche: string;
};

export const competitorAccounts: CompetitorAccount[] = [
  { handle: "@marianacrea", name: "Mariana Ruiz", followers: 182000, niche: "Creador" },
  { handle: "@diegosalasbiz", name: "Diego Salas", followers: 240000, niche: "Negocios" },
  { handle: "@valenortega", name: "Valen Ortega", followers: 96000, niche: "Marketing" },
  { handle: "@kevinpradoo", name: "Kevin Prado", followers: 310000, niche: "Viajes" },
  { handle: "@sofialem", name: "Sofía Lem", followers: 74000, niche: "Contenido" },
  { handle: "@rominatecla", name: "Romina Tecla", followers: 128000, niche: "Educación" },
  {
    handle: "@andrescoba.viajes",
    name: "Andrés Coba",
    followers: 205000,
    niche: "Viajes",
  },
  {
    handle: "@luciafernandaok",
    name: "Lucía Fernanda",
    followers: 89000,
    niche: "Lifestyle",
  },
];

export type CompetitorReel = {
  id: string;
  accountHandle: string;
  title: string;
  hook: string;
  onScreenText: string;
  views: number;
  likes: number;
  comments: number;
  postedAt: string;
};

export const competitorReels: CompetitorReel[] = [
  {
    id: "c1",
    accountHandle: "@marianacrea",
    title: "Por qué dejé de postear todos los días (y crecí más)",
    hook: "Dejé de postear todos los días y así crecí más",
    onScreenText: "0 posts por 2 semanas → +40K seguidores",
    views: 2140000,
    likes: 184000,
    comments: 3200,
    postedAt: "2026-08-12",
  },
  {
    id: "c2",
    accountHandle: "@diegosalasbiz",
    title: "El framework de 4 pasos para vender sin sonar a vendedor",
    hook: "Así vendo sin sonar a vendedor",
    onScreenText: "Paso 1 → Paso 2 → Paso 3 → Paso 4",
    views: 1480000,
    likes: 96500,
    comments: 1450,
    postedAt: "2026-08-11",
  },
  {
    id: "c3",
    accountHandle: "@kevinpradoo",
    title: "Así organicé un viaje de 7 días con $300",
    hook: "Viajé 7 días con solo $300, así lo hice",
    onScreenText: "Día 1 · Día 2 · Día 3 · Día 4...",
    views: 940000,
    likes: 71400,
    comments: 1120,
    postedAt: "2026-08-10",
  },
  {
    id: "c4",
    accountHandle: "@valenortega",
    title: "Recreé el reel viral de mi competencia y esto pasó",
    hook: "Recreé el reel #1 de mi nicho y esto pasó",
    onScreenText: "Original: 2M vistas · Mi versión: 987K",
    views: 987000,
    likes: 71200,
    comments: 980,
    postedAt: "2026-08-10",
  },
  {
    id: "c5",
    accountHandle: "@andrescoba.viajes",
    title: "El error que cometí en mi primer check-in y me costó $80",
    hook: "Este error de check-in me costó $80",
    onScreenText: "$80 USD perdidos ↓",
    views: 675000,
    likes: 48900,
    comments: 610,
    postedAt: "2026-08-09",
  },
  {
    id: "c6",
    accountHandle: "@sofialem",
    title: "3 hooks que copié de cuentas gringas y funcionaron en español",
    hook: "3 hooks que copié de cuentas gringas y funcionaron en español",
    onScreenText: "Hook 1 · Hook 2 · Hook 3",
    views: 764000,
    likes: 52100,
    comments: 690,
    postedAt: "2026-08-08",
  },
  {
    id: "c7",
    accountHandle: "@rominatecla",
    title: "5 herramientas gratis para editar como pro",
    hook: "5 herramientas gratis que uso siempre",
    onScreenText: "Herramienta 1/5",
    views: 512000,
    likes: 38200,
    comments: 410,
    postedAt: "2026-08-07",
  },
  {
    id: "c8",
    accountHandle: "@luciafernandaok",
    title: "Un día en mi vida como creadora de contenido de viajes",
    hook: "Un día en mi vida como creadora de viajes",
    onScreenText: "6:00am → 11:00pm",
    views: 430000,
    likes: 29800,
    comments: 350,
    postedAt: "2026-08-06",
  },
  {
    id: "c9",
    accountHandle: "@diegosalasbiz",
    title: "Cómo respondo objeciones de precio en 10 segundos",
    hook: "Así respondo objeciones de precio en 10 segundos",
    onScreenText: "Objeción → Respuesta (10s)",
    views: 398000,
    likes: 26400,
    comments: 320,
    postedAt: "2026-08-05",
  },
  {
    id: "c10",
    accountHandle: "@kevinpradoo",
    title: "La app de IA que está reemplazando editores completos",
    hook: "Esta app de IA reemplazó mi editor",
    onScreenText: "Antes vs. Después (mismo clip)",
    views: 812000,
    likes: 58900,
    comments: 740,
    postedAt: "2026-08-04",
  },
];

function mostRecentSunday8am(reference: Date): Date {
  const day = reference.getDay(); // 0 = domingo
  const candidate = new Date(reference);
  candidate.setDate(reference.getDate() - day);
  candidate.setHours(8, 0, 0, 0);
  if (candidate.getTime() > reference.getTime()) {
    candidate.setDate(candidate.getDate() - 7);
  }
  return candidate;
}

export function getCompetitorScanWindow(reference: Date = new Date()) {
  const last = mostRecentSunday8am(reference);
  const next = new Date(last);
  next.setDate(next.getDate() + 7);
  return { last, next };
}

// ---------------------------------------------------------------------------
// Calendario de Contenido
// ---------------------------------------------------------------------------

export type CalendarEntry = {
  id: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  platform: Platform;
  angle: string;
  hook: string;
  format: "Reel" | "Carrusel" | "Historia";
  source: "Script" | "Manual";
  script: string;
  caption: string;
};

export const calendarEntries: CalendarEntry[] = [
  {
    id: "cal1",
    date: "2026-08-03",
    time: "09:00",
    platform: "Instagram",
    angle: "Rutina de la mañana antes de grabar",
    hook: "Así se ve mi rutina real antes de grabar (nada glamorosa)",
    format: "Reel",
    source: "Script",
    script:
      "Abro con la alarma sonando a las 6am, cámara en mano sin arreglar. Corto a preparar café y revisar el guion del día. Cierro con la primera toma del reel de hoy, mostrando que el 'detrás de cámaras' también es contenido.",
    caption: "Mi rutina real antes de grabar (sin filtro) ☕️ #detrasdecamaras #creador",
  },
  {
    id: "cal2",
    date: "2026-08-05",
    time: "18:30",
    platform: "TikTok",
    angle: "Pregunta directa a la audiencia",
    hook: "¿Cuál fue tu peor error de maleta?",
    format: "Historia",
    source: "Manual",
    script:
      "Pregunta directa a cámara sobre errores de empaque. Muestro 2 respuestas de la audiencia en pantalla. Cierro pidiendo que comenten su propia historia.",
    caption: "Cuéntame tu peor error de maleta 👇",
  },
  {
    id: "cal3",
    date: "2026-08-08",
    time: "12:00",
    platform: "Instagram",
    angle: "Lista rápida de recursos",
    hook: "5 recursos gratis que uso todas las semanas para crear contenido",
    format: "Carrusel",
    source: "Script",
    script:
      "Portada con el número 5 en grande. Cada slide muestra un recurso con captura de pantalla y una frase de por qué lo uso. Cierre con CTA a guardar el carrusel.",
    caption: "Guarda esto, los vas a necesitar 📌 #recursos #creadores",
  },
  {
    id: "cal4",
    date: "2026-08-10",
    time: "20:00",
    platform: "YouTube Shorts",
    angle: "Resultado inesperado",
    hook: "Recreé el reel viral de mi competencia y esto pasó",
    format: "Reel",
    source: "Manual",
    script:
      "Muestro el reel original brevemente. Explico qué repliqué y qué cambié. Revelo el resultado (vistas y guardados) al final.",
    caption: "Recreé el reel #1 de mi nicho, esto pasó 👀",
  },
  {
    id: "cal5",
    date: "2026-08-12",
    time: "09:00",
    platform: "Instagram",
    angle: "Detrás de cámaras del proceso de edición",
    hook: "Así se ve mi timeline real, sin filtros",
    format: "Reel",
    source: "Script",
    script:
      "Grabación de pantalla de mi editor con capas desordenadas. Voz en off explicando el caos real detrás del resultado final. Cierre mostrando el video terminado.",
    caption: "Mi timeline real (no es tan bonito como crees) 😅",
  },
  {
    id: "cal6",
    date: "2026-08-14",
    time: "16:00",
    platform: "TikTok",
    angle: "Mito común del algoritmo, desmentido",
    hook: "El algoritmo no odia tus reels, esto es lo que pasa en realidad",
    format: "Reel",
    source: "Script",
    script:
      "Explico en cámara el mito común. Uso ejemplos de mi propia cuenta con capturas de analíticas. Cierro con 1 consejo accionable.",
    caption: "El algoritmo no te odia, esto es lo que pasa 🧠",
  },
  {
    id: "cal7",
    date: "2026-08-17",
    time: "10:00",
    platform: "Instagram",
    angle: "Comparación antes/después de resultados",
    hook: "Mis primeros 10 reels vs. mis últimos 10, la diferencia me sorprendió",
    format: "Reel",
    source: "Script",
    script:
      "Split screen con clips viejos vs. nuevos. Voz en off comentando qué cambió en edición, hook y ritmo. Cierro con la lección principal.",
    caption: "Mis primeros 10 reels vs. los últimos 10 😳",
  },
  {
    id: "cal8",
    date: "2026-08-19",
    time: "18:00",
    platform: "TikTok",
    angle: "Pregunta directa a la audiencia",
    hook: "¿Cuál es tu mayor bloqueo para publicar todos los días?",
    format: "Historia",
    source: "Manual",
    script:
      "Pregunta a cámara. Muestro una encuesta en pantalla con 2 opciones. Cierro invitando a responder en comentarios.",
    caption: "¿Cuál es tu mayor bloqueo? 👇",
  },
  {
    id: "cal9",
    date: "2026-08-21",
    time: "08:00",
    platform: "Instagram",
    angle: "Reacción a tendencia de IA de la semana",
    hook: "Probé la herramienta de IA que todos están comentando",
    format: "Reel",
    source: "Script",
    script:
      "Muestro la herramienta en pantalla compartida. Reacciono en vivo a los resultados. Cierro con mi opinión honesta.",
    caption: "Probé la app de IA de la semana, esto pasó 🤖",
  },
  {
    id: "cal10",
    date: "2026-08-24",
    time: "12:00",
    platform: "Instagram",
    angle: "Checklist antes de viajar",
    hook: "5 cosas que nadie te dice antes de venir a Puerto",
    format: "Carrusel",
    source: "Script",
    script:
      "Portada con foto del atardecer. Cada slide cubre un tip práctico (clima, transporte, moneda). Cierre invitando a guardar antes de su próximo viaje.",
    caption: "Guarda esto antes de tu próximo viaje a Puerto 🌅",
  },
  {
    id: "cal11",
    date: "2026-08-26",
    time: "20:00",
    platform: "YouTube Shorts",
    angle: "POV de un momento real de viaje",
    hook: "POV: Son las 12pm, saliste del hotel y tu vuelo es a medianoche",
    format: "Reel",
    source: "Script",
    script:
      "Cámara en mano mostrando el equipaje afuera del hotel. Corto a las actividades improvisadas del día. Cierro en el aeropuerto con el resumen del día.",
    caption: "POV: 12 horas libres antes de un vuelo nocturno ✈️",
  },
  {
    id: "cal12",
    date: "2026-08-28",
    time: "09:00",
    platform: "Instagram",
    angle: "Resumen semanal + adelanto",
    hook: "Así me fue esta semana (y lo que viene la próxima)",
    format: "Reel",
    source: "Manual",
    script:
      "Recap rápido de 3 highlights de la semana con clips cortos. Adelanto de la próxima pieza de contenido. Cierre pidiendo seguir para no perdérselo.",
    caption: "Así me fue esta semana 📊 (spoiler de lo que viene)",
  },
  {
    id: "cal13",
    date: "2026-08-30",
    time: "18:00",
    platform: "TikTok",
    angle: "Consejo directo y accionable",
    hook: "Deja de hacer esto si quieres que tus reels se vean",
    format: "Reel",
    source: "Script",
    script:
      "Explico el error común de cortar el hook demasiado rápido. Muestro un ejemplo en pantalla con el timing correcto vs. incorrecto. Cierro con el consejo final.",
    caption: "Deja de hacer esto en tus reels 🚫",
  },
];

// ---------------------------------------------------------------------------
// Programador
// ---------------------------------------------------------------------------

export type CaptionVariant = "Directo" | "Storytelling" | "Preguntas";

export const captionVariants: CaptionVariant[] = ["Directo", "Storytelling", "Preguntas"];

export type TargetStatus = "Borrador" | "Programado" | "Publicando";

export type PlatformTarget = {
  platform: Platform;
  scheduledAt: string;
  status: TargetStatus;
};

export type ScheduledPost = {
  id: string;
  hookUsed: string;
  captions: Record<CaptionVariant, string>;
  activeVariant: CaptionVariant;
  targets: PlatformTarget[];
};

export const scheduledPosts: ScheduledPost[] = [
  {
    id: "s1",
    hookUsed: "5 cosas que nadie te dice antes de venir a Puerto",
    activeVariant: "Directo",
    captions: {
      Directo:
        "5 cosas que nadie te dice antes de venir a Puerto 👇 Guarda esto antes de tu próximo viaje. #viajes #puerto",
      Storytelling:
        "La primera vez que vine a Puerto cometí los 5 errores que te muestro en este video... ojalá alguien me lo hubiera dicho antes.",
      Preguntas:
        "¿Sabías esto antes de venir a Puerto? Te dejo las 5 cosas que a mí nadie me dijo 👀",
    },
    targets: [
      { platform: "Instagram", scheduledAt: "2026-08-16T10:00:00", status: "Programado" },
      { platform: "TikTok", scheduledAt: "2026-08-16T10:00:00", status: "Programado" },
      { platform: "YouTube Shorts", scheduledAt: "2026-08-16T14:00:00", status: "Borrador" },
    ],
  },
  {
    id: "s2",
    hookUsed: "POV: Son las 12pm, saliste del hotel y tu vuelo es a medianoche",
    activeVariant: "Storytelling",
    captions: {
      Directo:
        "POV: son las 12pm, dejaste el hotel y tu vuelo es a medianoche. Así usamos esas 12 horas libres.",
      Storytelling:
        "Todo empezó cuando el hotel nos pidió salir a las 12pm y el vuelo no salía hasta medianoche. Esto es lo que hicimos con esas horas libres...",
      Preguntas:
        "¿Qué harías tú con 12 horas libres sin hotel antes de un vuelo nocturno? Esto hicimos nosotros 👇",
    },
    targets: [
      { platform: "Instagram", scheduledAt: "2026-08-15T09:00:00", status: "Publicando" },
      { platform: "TikTok", scheduledAt: "2026-08-15T09:00:00", status: "Publicando" },
    ],
  },
  {
    id: "s3",
    hookUsed: "Deja de hacer esto si quieres que tus reels se vean",
    activeVariant: "Preguntas",
    captions: {
      Directo:
        "Deja de hacer esto si quieres que tus reels se vean. El timing real del hook explicado.",
      Storytelling:
        "Durante meses corté mis hooks mal y no entendía por qué mis reels no crecían, hasta que encontré esto...",
      Preguntas:
        "¿Estás cortando tu hook en el segundo equivocado? Así lo puedes revisar tú mismo 👇",
    },
    targets: [
      { platform: "YouTube Shorts", scheduledAt: "2026-08-18T12:00:00", status: "Programado" },
    ],
  },
  {
    id: "s4",
    hookUsed: "El error que casi arruina mi primer viaje solo",
    activeVariant: "Directo",
    captions: {
      Directo:
        "El error que casi arruina mi primer viaje solo (y cómo evitarlo tú). #viajes #solotravel",
      Storytelling:
        "Iba tan seguro de mi plan de viaje hasta que pasó esto... les cuento el error que casi lo arruina todo.",
      Preguntas: "¿Ya cometiste este error viajando solo? Yo sí, y así lo resolví.",
    },
    targets: [
      { platform: "Instagram", scheduledAt: "2026-08-13T20:00:00", status: "Publicando" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Tendencias
// ---------------------------------------------------------------------------

export type SourceType = "Newsletter" | "Cuenta" | "Comunidad";

export type TrendSource = { name: string; type: SourceType };

export const trendSources: TrendSource[] = [
  { name: "The Rundown AI", type: "Newsletter" },
  { name: "Ben's Bites", type: "Newsletter" },
  { name: "Import AI", type: "Newsletter" },
  { name: "TechCrunch AI", type: "Cuenta" },
  { name: "The Verge", type: "Cuenta" },
  { name: "Wired", type: "Cuenta" },
  { name: "AI Explained", type: "Cuenta" },
  { name: "MIT Tech Review", type: "Cuenta" },
  { name: "Hacker News", type: "Comunidad" },
  { name: "Product Hunt", type: "Comunidad" },
  { name: "Reddit r/ArtificialIntelligence", type: "Comunidad" },
  { name: "X / Twitter Trending", type: "Comunidad" },
];

export type TrendItem = {
  id: string;
  title: string;
  summary: string;
  justification: string;
  potential: number; // 1-10
  mentionedBy: string[];
  detectedAt: string;
};

export const trends: TrendItem[] = [
  {
    id: "tr1",
    title: "Nuevo modelo genera video de 60s a partir de una sola foto",
    summary:
      "Una startup lanzó un modelo que anima fotos estáticas en clips realistas de un minuto.",
    justification:
      "Formato demo en vivo + resultado visual impactante = alto potencial de hook tipo 'reacción en tiempo real'.",
    potential: 10,
    mentionedBy: ["The Rundown AI", "TechCrunch AI", "X / Twitter Trending"],
    detectedAt: "2026-08-14",
  },
  {
    id: "tr2",
    title: "Herramienta de IA escribe captions virales en 3 segundos",
    summary: "Compara resultados humanos vs. IA en engagement real.",
    justification:
      "Ángulo de comparación directa ('reemplacé mi copywriter por esto') funciona casi siempre como hook.",
    potential: 9,
    mentionedBy: ["Ben's Bites", "Product Hunt"],
    detectedAt: "2026-08-14",
  },
  {
    id: "tr3",
    title: "Nueva función permite clonar tu voz para doblar reels a otro idioma",
    summary: "Pensada para creadores que quieren expandir su audiencia sin regrabar.",
    justification:
      "Hook directo y demostrable en cámara: 'así sonaría mi cuenta en inglés sin grabar de nuevo'.",
    potential: 9,
    mentionedBy: ["The Verge", "Wired", "Hacker News"],
    detectedAt: "2026-08-08",
  },
  {
    id: "tr4",
    title: "Instagram prueba un feed generado completamente por IA",
    summary: "Polémica entre creadores por la propuesta.",
    justification:
      "Tema polarizante con ángulo directo ('¿esto significa el fin de los creadores humanos?'); genera comentarios garantizados.",
    potential: 9,
    mentionedBy: ["TechCrunch AI", "X / Twitter Trending", "Reddit r/ArtificialIntelligence"],
    detectedAt: "2026-08-13",
  },
  {
    id: "tr5",
    title: "Comparativa: los 3 modelos de IA más rápidos para generar guiones",
    summary: "Formato ranking probado con los mismos prompts.",
    justification:
      "Formato lista/ranking es de los que mejor retención tiene; fácil de convertir en hook tipo 'probé 3 IAs, esta ganó'.",
    potential: 8,
    mentionedBy: ["AI Explained", "Product Hunt"],
    detectedAt: "2026-08-09",
  },
  {
    id: "tr6",
    title: "Hilo viral: 'la IA me ahorra 12 horas a la semana, así lo hago'",
    summary: "Formato testimonial con cifras concretas.",
    justification:
      "El testimonio con número concreto es fácil de adaptar a hook personal ('a mí me ahorra X horas').",
    potential: 8,
    mentionedBy: ["Reddit r/ArtificialIntelligence", "X / Twitter Trending"],
    detectedAt: "2026-08-12",
  },
  {
    id: "tr7",
    title: "Top del día: asistente de edición de video con IA en tiempo real",
    summary: "Debutó en el top 1 de lanzamientos del día.",
    justification:
      "Buen candidato para review en vivo grabando pantalla; hook tipo 'probé la app #1 de hoy' funciona casi siempre.",
    potential: 7,
    mentionedBy: ["Product Hunt"],
    detectedAt: "2026-08-11",
  },
  {
    id: "tr8",
    title: "Debate viral sobre créditos de IA y derechos de autor",
    summary: "Tema polarizante entre creadores y estudios.",
    justification:
      "Alto potencial de comentarios si se presenta con una postura clara, aunque exige más cuidado editorial.",
    potential: 7,
    mentionedBy: ["X / Twitter Trending", "Wired"],
    detectedAt: "2026-08-11",
  },
  {
    id: "tr9",
    title: "Cómo las marcas están usando avatares de IA en campañas reales",
    summary: "Casos de estudio documentados de marcas grandes.",
    justification:
      "Buen ángulo de caso de estudio ('esta marca ahorró miles con un avatar de IA'), pero requiere más investigación previa.",
    potential: 6,
    mentionedBy: ["Wired", "MIT Tech Review"],
    detectedAt: "2026-08-10",
  },
  {
    id: "tr10",
    title: "Modelo open-source iguala a los gigantes en generación de imagen",
    summary: "Comparación técnica publicada por la comunidad.",
    justification:
      "Ángulo técnico-accesible ('la herramienta gratis que reemplaza un plan de $30/mes'), audiencia más de nicho.",
    potential: 6,
    mentionedBy: ["Hacker News"],
    detectedAt: "2026-08-13",
  },
  {
    id: "tr11",
    title: "Reporte semanal detalla riesgos de agentes autónomos",
    summary: "Análisis extenso orientado a desarrolladores.",
    justification:
      "Contenido denso, mejor para carrusel educativo que para hook rápido de reel — potencial medio-bajo.",
    potential: 4,
    mentionedBy: ["Import AI"],
    detectedAt: "2026-08-12",
  },
  {
    id: "tr12",
    title: "Análisis profundo sobre el consumo energético de los data centers de IA",
    summary: "Más informativo que viral.",
    justification:
      "Útil como fuente de autoridad en un carrusel largo, pero no tiene un momento de hook claro.",
    potential: 3,
    mentionedBy: ["MIT Tech Review"],
    detectedAt: "2026-08-09",
  },
];
