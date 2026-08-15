// Datos de ejemplo (mock) para poblar el dashboard.
// En producción esto se reemplaza por llamadas a la API / base de datos.
// Ver CLAUDE.md § Datos de ejemplo.

export type Hook = {
  id: string;
  hook: string;
  transcript: string;
  template: string;
  platform: "Instagram" | "TikTok" | "YouTube";
  niche: string;
  views: number;
  savedAt: string;
};

export const hooks: Hook[] = [
  {
    id: "h1",
    hook: "Nadie te dice esto antes de renunciar a tu trabajo...",
    transcript:
      "Nadie te dice esto antes de renunciar a tu trabajo: los primeros 90 días sin salario fijo se sienten como caída libre. Yo pasé por eso hace dos años y esto es lo que hubiera hecho distinto...",
    template: "Confesión + contraste temporal",
    platform: "Instagram",
    niche: "Negocios",
    views: 812000,
    savedAt: "2026-08-10",
  },
  {
    id: "h2",
    hook: "Esto que ves en pantalla me tomó 3 años entenderlo",
    transcript:
      "Esto que ves en pantalla me tomó 3 años entenderlo y te lo voy a explicar en 30 segundos para que no cometas el mismo error...",
    template: "Autoridad comprimida",
    platform: "TikTok",
    niche: "Educación",
    views: 1240000,
    savedAt: "2026-08-09",
  },
  {
    id: "h3",
    hook: "Si tu Instagram no crece, probablemente es por esto",
    transcript:
      "Si tu Instagram no crece, probablemente es por esto: estás publicando para ti, no para el algoritmo. Te muestro los 3 hooks que sí funcionan en 2026...",
    template: "Problema + culpable inesperado",
    platform: "Instagram",
    niche: "Marketing",
    views: 542000,
    savedAt: "2026-08-08",
  },
  {
    id: "h4",
    hook: "Guardé este video porque en 6 meses lo vas a necesitar",
    transcript:
      "Guardé este video porque en 6 meses lo vas a necesitar. Esto es lo que nadie explica sobre monetizar contenido sin depender de marcas...",
    template: "Urgencia futura",
    platform: "YouTube",
    niche: "Creador",
    views: 298000,
    savedAt: "2026-08-06",
  },
  {
    id: "h5",
    hook: "Deja de hacer esto si quieres que tus reels se vean",
    transcript:
      "Deja de hacer esto si quieres que tus reels se vean: cortar el hook a los 3 segundos exactos. Te muestro el timing real que usan las cuentas grandes...",
    template: "Prohibición directa",
    platform: "Instagram",
    niche: "Contenido",
    views: 673000,
    savedAt: "2026-08-05",
  },
  {
    id: "h6",
    hook: "Probé 30 hooks distintos, estos 5 fueron los únicos que funcionaron",
    transcript:
      "Probé 30 hooks distintos durante un mes, estos 5 fueron los únicos que funcionaron. Anótalos porque los vas a poder reciclar en cualquier nicho...",
    template: "Experimento + selección",
    platform: "TikTok",
    niche: "Creador",
    views: 951000,
    savedAt: "2026-08-03",
  },
];

export const hookTemplates = Array.from(
  new Set(hooks.map((h) => h.template))
).map((template) => ({
  template,
  count: hooks.filter((h) => h.template === template).length,
}));

export type WeeklyPoint = {
  day: string;
  views: number;
  saves: number;
  followers: number;
};

export const weeklyPerformance: WeeklyPoint[] = [
  { day: "Lun", views: 42000, saves: 610, followers: 84 },
  { day: "Mar", views: 38500, saves: 540, followers: 61 },
  { day: "Mié", views: 51200, saves: 780, followers: 112 },
  { day: "Jue", views: 47800, saves: 690, followers: 95 },
  { day: "Vie", views: 63400, saves: 1020, followers: 168 },
  { day: "Sáb", views: 91200, saves: 1640, followers: 241 },
  { day: "Dom", views: 76500, saves: 1310, followers: 189 },
];

export const analyticsSummary = {
  views: { value: 410600, delta: 18.4 },
  saves: { value: 6590, delta: 24.1 },
  newFollowers: { value: 950, delta: 12.7 },
  avgWatchRate: { value: 68, delta: 4.2 },
};

export type TopContent = {
  id: string;
  title: string;
  format: "Reel" | "Carrusel" | "Historia";
  views: number;
  saves: number;
  shares: number;
  publishedAt: string;
};

export const topContentThisWeek: TopContent[] = [
  {
    id: "t1",
    title: "El error que casi cierra mi negocio a los 6 meses",
    format: "Reel",
    views: 128400,
    saves: 3120,
    shares: 890,
    publishedAt: "2026-08-11",
  },
  {
    id: "t2",
    title: "5 herramientas de IA que reemplazaron a mi editor",
    format: "Carrusel",
    views: 96200,
    saves: 2440,
    shares: 512,
    publishedAt: "2026-08-09",
  },
  {
    id: "t3",
    title: "Así organizo mi contenido de todo el mes en 2 horas",
    format: "Reel",
    views: 84700,
    saves: 1980,
    shares: 401,
    publishedAt: "2026-08-13",
  },
  {
    id: "t4",
    title: "Lo que aprendí espiando a mis 10 competidores",
    format: "Historia",
    views: 51200,
    saves: 860,
    shares: 190,
    publishedAt: "2026-08-12",
  },
];

export type CompetitorReel = {
  id: string;
  creator: string;
  handle: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  postedAt: string;
  niche: string;
};

export const competitorReels: CompetitorReel[] = [
  {
    id: "c1",
    creator: "Mariana Ruiz",
    handle: "@marianacrea",
    title: "Por qué dejé de postear todos los días (y crecí más)",
    views: 2140000,
    likes: 184000,
    comments: 3200,
    postedAt: "2026-08-12",
    niche: "Creador",
  },
  {
    id: "c2",
    creator: "Diego Salas",
    handle: "@diegosalasbiz",
    title: "El framework de 4 pasos para vender sin sonar a vendedor",
    views: 1480000,
    likes: 96500,
    comments: 1450,
    postedAt: "2026-08-11",
    niche: "Negocios",
  },
  {
    id: "c3",
    creator: "Valen Ortega",
    handle: "@valenortega",
    title: "Recreé el reel viral de mi competencia y esto pasó",
    views: 987000,
    likes: 71200,
    comments: 980,
    postedAt: "2026-08-10",
    niche: "Marketing",
  },
  {
    id: "c4",
    creator: "Kevin Prado",
    handle: "@kevinpradoo",
    title: "La app de IA que está reemplazando editores completos",
    views: 812000,
    likes: 58900,
    comments: 740,
    postedAt: "2026-08-09",
    niche: "Tecnología",
  },
  {
    id: "c5",
    creator: "Sofía Lem",
    handle: "@sofialem",
    title: "3 hooks que copié de cuentas gringas y funcionaron en español",
    views: 764000,
    likes: 52100,
    comments: 690,
    postedAt: "2026-08-08",
    niche: "Contenido",
  },
];

export type ScheduledPost = {
  id: string;
  caption: string;
  hookUsed: string;
  platforms: ("Instagram" | "TikTok" | "YouTube")[];
  status: "Borrador" | "Listo" | "Programado" | "Publicado";
  scheduledAt: string;
};

export const scheduledPosts: ScheduledPost[] = [
  {
    id: "s1",
    caption:
      "El error que casi cierra mi negocio a los 6 meses 👇 Guarda esto antes de lanzar tu próximo producto. #emprendimiento #negocios",
    hookUsed: "Confesión + contraste temporal",
    platforms: ["Instagram", "TikTok"],
    status: "Programado",
    scheduledAt: "2026-08-16T10:00:00",
  },
  {
    id: "s2",
    caption:
      "5 herramientas de IA que reemplazaron a mi editor este mes. Guarda el carrusel completo ✨",
    hookUsed: "Autoridad comprimida",
    platforms: ["Instagram"],
    status: "Listo",
    scheduledAt: "2026-08-16T18:30:00",
  },
  {
    id: "s3",
    caption:
      "Así organizo mi contenido de todo el mes en 2 horas (plantilla en comentarios)",
    hookUsed: "Urgencia futura",
    platforms: ["TikTok", "YouTube"],
    status: "Borrador",
    scheduledAt: "2026-08-17T09:00:00",
  },
  {
    id: "s4",
    caption:
      "Deja de hacer esto si quieres que tus reels se vean. El timing real del hook explicado.",
    hookUsed: "Prohibición directa",
    platforms: ["Instagram", "TikTok", "YouTube"],
    status: "Programado",
    scheduledAt: "2026-08-18T12:00:00",
  },
  {
    id: "s5",
    caption: "Lo que aprendí espiando a mis 10 competidores esta semana",
    hookUsed: "Problema + culpable inesperado",
    platforms: ["Instagram"],
    status: "Publicado",
    scheduledAt: "2026-08-13T20:00:00",
  },
];

export type CalendarEntry = {
  date: string;
  angle: string;
  hook: string;
  format: "Reel" | "Carrusel" | "Historia";
  source: "Script" | "Manual";
};

export const calendarEntries: CalendarEntry[] = [
  {
    date: "2026-08-17",
    angle: "Detrás de cámaras del proceso de edición",
    hook: "Así se ve mi timeline real, sin filtros",
    format: "Reel",
    source: "Script",
  },
  {
    date: "2026-08-18",
    angle: "Mito común del algoritmo, desmentido",
    hook: "El algoritmo no odia tus reels, esto es lo que pasa en realidad",
    format: "Carrusel",
    source: "Script",
  },
  {
    date: "2026-08-19",
    angle: "Comparación antes/después de resultados",
    hook: "Mis primeros 10 reels vs. mis últimos 10, la diferencia me sorprendió",
    format: "Reel",
    source: "Script",
  },
  {
    date: "2026-08-20",
    angle: "Pregunta directa a la audiencia",
    hook: "¿Cuál es tu mayor bloqueo para publicar todos los días?",
    format: "Historia",
    source: "Manual",
  },
  {
    date: "2026-08-21",
    angle: "Reacción a tendencia de IA de la semana",
    hook: "Probé la herramienta de IA que todos están comentando",
    format: "Reel",
    source: "Script",
  },
  {
    date: "2026-08-22",
    angle: "Lista rápida de recursos gratuitos",
    hook: "5 recursos gratis que uso todas las semanas para crear contenido",
    format: "Carrusel",
    source: "Script",
  },
  {
    date: "2026-08-23",
    angle: "Resumen semanal + adelanto",
    hook: "Así me fue esta semana (y lo que viene la próxima)",
    format: "Historia",
    source: "Manual",
  },
];

export type TrendItem = {
  id: string;
  source: string;
  title: string;
  summary: string;
  hookPotential: number;
  publishedAt: string;
};

export const trendSources = [
  "TechCrunch AI",
  "The Verge",
  "Ben's Bites",
  "Import AI",
  "Hacker News",
  "Product Hunt",
  "The Rundown AI",
  "MIT Tech Review",
  "Reddit r/ArtificialIntelligence",
  "X / Twitter Trending",
  "AI Explained",
  "Wired",
];

export const trends: TrendItem[] = [
  {
    id: "tr1",
    source: "The Rundown AI",
    title: "Nuevo modelo genera video de 60s a partir de una sola foto",
    summary:
      "Una startup lanzó un modelo que anima fotos estáticas en clips realistas de un minuto, ideal para mostrar en un reel de reacción en vivo.",
    hookPotential: 96,
    publishedAt: "2026-08-14",
  },
  {
    id: "tr2",
    source: "Ben's Bites",
    title: "Herramienta de IA escribe captions virales en 3 segundos",
    summary:
      "Compara resultados humanos vs. IA en engagement real. Excelente para un hook tipo 'reemplacé mi copywriter por esto'.",
    hookPotential: 91,
    publishedAt: "2026-08-14",
  },
  {
    id: "tr3",
    source: "TechCrunch AI",
    title: "Instagram prueba un feed generado completamente por IA",
    summary:
      "Polémica entre creadores. Ángulo directo: '¿esto significa el fin de los creadores humanos?'",
    hookPotential: 88,
    publishedAt: "2026-08-13",
  },
  {
    id: "tr4",
    source: "Hacker News",
    title: "Modelo open-source iguala a los gigantes en generación de imagen",
    summary:
      "Ángulo técnico-accesible: 'la herramienta gratis que reemplaza un plan de $30/mes'.",
    hookPotential: 79,
    publishedAt: "2026-08-13",
  },
  {
    id: "tr5",
    source: "Import AI",
    title: "Reporte semanal detalla riesgos de agentes autónomos",
    summary:
      "Contenido más denso, mejor para carrusel educativo que para hook rápido de reel.",
    hookPotential: 54,
    publishedAt: "2026-08-12",
  },
  {
    id: "tr6",
    source: "Reddit r/ArtificialIntelligence",
    title: "Hilo viral: 'la IA me ahorra 12 horas a la semana, así lo hago'",
    summary:
      "Formato testimonial fácil de adaptar a hook personal con cifras concretas.",
    hookPotential: 84,
    publishedAt: "2026-08-12",
  },
  {
    id: "tr7",
    source: "Product Hunt",
    title: "Top del día: asistente de edición de video con IA en tiempo real",
    summary:
      "Buen candidato para review en vivo grabando pantalla, hook tipo 'probé la app #1 de hoy'.",
    hookPotential: 82,
    publishedAt: "2026-08-11",
  },
  {
    id: "tr8",
    source: "X / Twitter Trending",
    title: "Debate viral sobre créditos de IA y derechos de autor",
    summary:
      "Tema polarizante, alto potencial de comentarios si se presenta con una postura clara.",
    hookPotential: 77,
    publishedAt: "2026-08-11",
  },
  {
    id: "tr9",
    source: "Wired",
    title: "Cómo las marcas están usando avatares de IA en campañas reales",
    summary:
      "Ángulo de caso de estudio: 'esta marca ahorró miles usando un avatar de IA'.",
    hookPotential: 71,
    publishedAt: "2026-08-10",
  },
  {
    id: "tr10",
    source: "MIT Tech Review",
    title: "Análisis profundo sobre el consumo energético de los data centers de IA",
    summary:
      "Más informativo que viral, útil como fuente de autoridad en carrusel largo.",
    hookPotential: 42,
    publishedAt: "2026-08-09",
  },
  {
    id: "tr11",
    source: "AI Explained",
    title: "Comparativa: los 3 modelos de IA más rápidos para generar guiones",
    summary:
      "Formato ranking, funciona bien como hook de lista: 'probé 3 IAs para escribir guiones, esta ganó'.",
    hookPotential: 86,
    publishedAt: "2026-08-09",
  },
  {
    id: "tr12",
    source: "The Verge",
    title: "Nueva función permite clonar tu voz para doblar reels a otro idioma",
    summary:
      "Hook directo: 'así sonaría mi cuenta en inglés sin grabar de nuevo'.",
    hookPotential: 89,
    publishedAt: "2026-08-08",
  },
];
