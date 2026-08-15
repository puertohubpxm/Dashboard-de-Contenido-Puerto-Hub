# CLAUDE.md

Guía técnica del proyecto **Puerto Hub · Content Dashboard**, un panel de contenido
para el negocio de creador `@puertohub.pxm`. Este documento describe el stack,
la estructura del código y las decisiones de diseño/arquitectura tomadas al
construir el dashboard, para que cualquier sesión futura de Claude Code (u otro
colaborador) entienda el "por qué" sin tener que releer todo el código.

## Stack tecnológico

| Capa | Elección | Notas |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) | Generado con `create-next-app`, TypeScript + `src/` dir + alias `@/*`. |
| UI runtime | **React 19** | Server Components por defecto; `"use client"` solo donde hay estado/interacción. |
| Estilos | **Tailwind CSS v4** | Configuración "CSS-first" (`@theme` en `globals.css`), sin `tailwind.config.ts`. |
| Componentes | **shadcn/ui** (estilo "new-york", basado en Radix UI) | Ver [§ shadcn/ui sin CLI](#shadcnui-instalado-manualmente-sin-cli) — se vendorizaron a mano en `src/components/ui`. |
| Primitivas headless | `@radix-ui/react-*` | avatar, dialog (Sheet), dropdown-menu, label, progress, scroll-area, select, separator, slot, switch, tabs, tooltip. |
| Iconos | `lucide-react` | v1.x — **ya no incluye logos de marcas** (Instagram/TikTok/YouTube); se usan iconos genéricos equivalentes (ver tabla de decisiones). |
| Gráficas | `recharts` | Usado en Analíticas para el chart de tendencia (7/30/90 días). |
| Utilidades de clases | `class-variance-authority`, `clsx`, `tailwind-merge` | Patrón estándar de shadcn/ui (`cn()` en `src/lib/utils.ts`). |
| Tipografía | `next/font/google` — Geist Sans / Geist Mono | Autohospedada por Next.js (no requiere `<link>` externo en runtime). |
| Linting | ESLint (`eslint-config-next`) | `npm run lint` sin warnings. |

### Scripts

```bash
npm run dev     # servidor de desarrollo (Turbopack)
npm run build   # build de producción, valida tipos y genera las rutas estáticas
npm run start   # sirve el build de producción
npm run lint    # ESLint
```

Todas las rutas del dashboard son **estáticas** (`○ Static`) porque los datos
son mock locales — no hay `fetch` a APIs externas todavía.

## Estructura del proyecto

```
src/
  app/
    layout.tsx          # Root layout: fuentes, <html class="dark">, envuelve todo en <AppShell>
    page.tsx             # "/" — Resumen general (accesos rápidos + KPIs)
    hooks/page.tsx        # Biblioteca de Hooks
    script/page.tsx       # "/script" — Editor de guion (no está en el sidebar, ver § flujo hook → guion → programador)
    analytics/page.tsx    # Analíticas
    competitors/page.tsx  # Seguimiento de Competidores
    scheduler/page.tsx    # Programador
    calendar/page.tsx     # Calendario de Contenido
    trends/page.tsx       # Tendencias
    globals.css           # Tokens de diseño (tema oscuro + paleta de marca) y Tailwind v4
  components/
    ui/                  # Primitivas shadcn/ui vendorizadas (button, card, badge, tabs, table, sheet, ...)
    dashboard/           # Componentes compuestos específicos del producto (sidebar, page-header, stat-card, calendar-month, ...)
  data/
    mock.ts              # Toda la data de ejemplo del dashboard (ver más abajo)
  lib/
    utils.ts             # cn() — merge de clases Tailwind
    format.ts             # Formateo de números/fechas en es-ES
    nav.ts                # Definición de la navegación (las 6 secciones + "Resumen")
    calendar-grid.ts      # Construye la cuadrícula mensual (semanas completas, incluye días de meses vecinos)
    captions.ts           # generateCaptionVariants() — genera las 3 variantes de caption (Directo/Storytelling/Preguntas)
    local-store.ts        # Wrapper seguro para SSR sobre localStorage
    content-store.ts      # Banco de hooks + borrador de guion (ver § flujo hook → guion → programador)
```

## Decisiones de diseño

### Modo oscuro fijo (sin toggle)

El brief pide "modo oscuro" como identidad visual del panel, no como una
preferencia conmutable. Se fuerza `class="dark"` en `<html>` (`src/app/layout.tsx`)
y **no** se implementó un theme-toggle ni `next-themes`. Si en el futuro se
quiere soportar modo claro, los tokens ya están centralizados en
`src/app/globals.css` (`:root` + `@theme inline`) y sería cuestión de:
1. Añadir un segundo bloque de tokens bajo `.light` o `@media (prefers-color-scheme: light)`.
2. Quitar la clase `dark` fija del layout y añadir un toggle (`next-themes` es la ruta estándar).

### Paleta de marca: "atardecer en el puerto"

El dashboard usa la paleta de marca oficial de Puerto Hub — cinco colores con
nombre propio que, juntos, leen como un atardecer costero (cielo azul marino,
naranja y rojo del atardecer, arena, palmeras) — sobre un fondo casi negro
neutro para que los cinco colores puedan convivir sin pelearse entre sí.
Todos los tokens están en `globals.css`; el mapeo de rol semántico se decidió
así:

| Color de marca | Hex | Rol en el dashboard |
| --- | --- | --- |
| Azul marino | `#4b7bcd` | `--primary` — botones primarios, links activos, badge/ícono activo del sidebar, barra de progreso por defecto, `chart-1`. |
| Naranja atardecer | `#ffb26b` | `--warning` — estado "Listo" en el Programador, potencial "Medio" en Tendencias, `chart-2`. |
| Rojo pastel | `#ff8a80` | `--destructive` — acciones destructivas, deltas negativos, `chart-4`. |
| Verde palmero | `#22ab61` | `--success` — deltas positivos, estado "Publicado", potencial "Alto" en Tendencias, `chart-3`. |
| Arena | `#f4d7b7` | `--accent-foreground` — acento cálido secundario para íconos/chips (`--accent` es su versión oscurecida como fondo), `chart-5`. |

- `--background` / `--card` / `--popover`: escala de carbón neutro casi negro (`#0c0e12` → `#161a21`), deliberadamente **sin matiz cálido ni frío dominante** para no competir con los cinco acentos de marca.
- `--sidebar-accent` usa un tinte azul marino sutil (no arena) para que el ítem de navegación activo se sienta "seleccionado con la marca", separado visualmente del acento arena que se usa en chips/íconos de contenido.
- Elementos que antes usaban un solo tono de acento (p. ej. la barra de "potencial de hook" en Tendencias) ahora usan el color de marca correspondiente al valor mostrado (verde/naranja/gris), en vez de un color fijo — ver `potentialTier()` en `src/app/trends/page.tsx`.
- `--chart-1..5` mapea 1:1 a los cinco colores de marca en el orden de la tabla, así que cualquier gráfica nueva que use `chart-1..5` hereda la paleta automáticamente.

Border-radius base: `0.75rem` (`--radius`), consistente con las cards y botones
de shadcn/ui estilo "new-york".

### shadcn/ui instalado manualmente (sin CLI)

Se intentó `npx shadcn@latest init`, pero el entorno de esta sesión **bloquea
por política de red las peticiones a `ui.shadcn.com`** (proxy devuelve 403 al
`CONNECT`). Como alternativa, se instalaron las dependencias reales de
shadcn/ui (Radix UI, `class-variance-authority`, `clsx`, `tailwind-merge`,
`tw-animate-css`) vía npm (sí permitido) y se escribieron a mano los
componentes en `src/components/ui/` siguiendo al detalle las convenciones
oficiales de shadcn/ui (atributos `data-slot`, mismas variantes de `cva`,
mismo naming). Esto significa que:

- El código es **API-compatible** con shadcn/ui: si en el futuro hay acceso a
  `ui.shadcn.com`, se puede correr `npx shadcn add <componente>` con
  normalidad y sobreescribirá/añadirá componentes con el mismo patrón.
- No existe `components.json` (no se pudo generar por el mismo bloqueo de
  red). Si se instala el CLI más adelante, generar uno con
  `npx shadcn init -b radix -y` y apuntarlo a los alias ya usados
  (`@/components`, `@/lib/utils`, `@/components/ui`).

Componentes vendorizados: `button`, `card`, `badge`, `avatar`, `separator`,
`progress`, `tabs`, `input`, `textarea`, `label`, `switch`, `select`,
`tooltip`, `dropdown-menu`, `scroll-area`, `table`, `sheet`.

### Iconos de plataformas sin logos de marca

`lucide-react` (versión instalada, v1.x) **eliminó los íconos de marcas**
(Instagram, TikTok, YouTube, etc.) de su set por temas de licencias. Se
usaron reemplazos genéricos consistentes en todo el dashboard:

| Plataforma | Ícono usado | Razón |
| --- | --- | --- |
| Instagram | `Aperture` | Evoca cámara/lente sin usar el logo real. |
| TikTok | `Music2` | Referencia al audio/formato corto. |
| YouTube Shorts | `PlaySquare` | Ícono de "reproducir" genérico. |

Si más adelante se agregan logos reales, considerar un set de SVG propio en
`public/icons/` en vez de depender de `lucide-react` para marcas.

### Rutas en inglés, contenido en español

Las URLs usan slugs en inglés (`/hooks`, `/analytics`, `/competitors`,
`/scheduler`, `/calendar`, `/trends`) por ser más cortas y estándar en
dashboards SaaS, mientras que **todo el copy visible es en español** (idioma
del negocio). `src/lib/nav.ts` centraliza el mapeo slug → título/descripción/ícono
para mantener sidebar, page headers y accesos rápidos sincronizados desde un
solo lugar. `/script` es la única ruta que no está en `nav.ts` ni en el
sidebar — es una página de apoyo del flujo (ver sección siguiente), no una de
las seis secciones del producto.

### Biblioteca de Hooks: plantillas literales, no categorías abstractas

Cada `Hook` tiene un campo `template` que es un formato de relleno **literal**
(p. ej. `"5 cosas que nadie te dice antes de venir a [destino]"` o
`"POV: Son las [hora], saliste de/tu [lugar] y tu [evento] es a [hora
futura]"`), derivado de su `hook` real — no una etiqueta descriptiva como
"Confesión + contraste temporal". `hookType` sí es una categoría acotada
(`Lista | POV | Confesión | Pregunta | Advertencia | Comparación`) y es el eje
de los filtros por chip; `niche` es el segundo eje de filtro (Select) y el
tercero es el orden (más vistas / más recientes). Cada tarjeta muestra
siempre `creator.name` + `creator.handle` (el creador original del hook) y
`views`, tal como pide el brief.

### Flujo Hooks → Guion → Programador (banco de hooks en localStorage)

El dashboard conecta tres secciones sin backend usando `localStorage` como
puente (`src/lib/content-store.ts`), ya que todas las páginas son estáticas:

1. **Biblioteca de Hooks → `/script`**: el botón "Usa este hook" de cada
   tarjeta enlaza a `/script?hook=<id>`. `ScriptEditor` (client component)
   lee el parámetro, busca el hook con `getHookById()` y precarga el campo
   Hook, el Guion (con la transcripción) y el Caption (generado con
   `generateCaptionVariants()`). Esto es literalmente "insertar el hook en
   la sección /script" pedido en el brief.
2. **`/script` → Programador**: "Enviar al Programador" guarda el borrador
   (`saveScriptDraft()`) y navega a `/scheduler`. `SchedulerComposer` lee ese
   borrador una sola vez al montar, precarga el hook/guion y simula
   automáticamente la subida de video para esa pieza (ver sección del
   Programador). El borrador se limpia (`clearScriptDraft()`) tras usarse,
   para no reaplicarse en visitas futuras a `/scheduler`.
3. **Competidores → Biblioteca de Hooks**: "Guardar en banco de hooks" en
   cualquier reel de competidor llama a `addHookToBank()`, que convierte el
   reel (`hookFromCompetitorReel()`) al mismo tipo `Hook` que usa la
   biblioteca (infiriendo `hookType` por heurística simple sobre el texto) y
   lo guarda en `localStorage`. La Biblioteca de Hooks lee ese banco al
   montar y lo mezcla con la data mock, marcando cada resultado con un
   badge "Del banco".

`readLocal`/`writeLocal` (`src/lib/local-store.ts`) son un wrapper con guard
de `typeof window === "undefined"` para que el render en servidor no falle.
La sincronización con `localStorage` ocurre siempre dentro de un
`useEffect` tras el montaje (nunca durante el render) para evitar mismatches
de hidratación entre servidor y cliente; los `setState` correspondientes
llevan un comentario `eslint-disable-next-line react-hooks/set-state-in-effect`
explicando por qué el patrón es intencional en este caso (sincronizar con un
sistema externo al montar es exactamente el caso de uso que ese hook de
React describe como válido).

Cuando haya backend real, `content-store.ts` es el único archivo que cambia:
`getHookBank`/`addHookToBank` pasarían a ser llamadas a la API y
`getScriptDraft`/`saveScriptDraft` a un guardado real del borrador.

### Datos de ejemplo (`src/data/mock.ts`)

Todo el contenido (hooks, analíticas, competidores, posts programados,
calendario, tendencias) es **data mock hardcodeada**, tipada con TypeScript.
No hay backend, IA ni jobs reales todavía — cada "automatización" descrita en
el brief (scan de competidores los domingos, tracking de tendencias cada
mañana, transcripción de audio) está representada como datos ya procesados
más, cuando aplica, la lógica de fecha/hora real que mostraría el estado de
ese job (ver secciones de Competidores y Tendencias). Cuando se conecte una
fuente real:

- Los tipos exportados (`Hook`, `TrendPoint`, `ContentPerformanceItem`,
  `CompetitorAccount`, `CompetitorReel`, `ScheduledPost`, `CalendarEntry`,
  `TrendItem`, etc.) están pensados para mapear 1:1 a la forma que debería
  tener la respuesta de la API — se pueden reusar tal cual al reemplazar los
  arrays estáticos por `fetch`/`server actions`.
- Las páginas que solo leen datos (`competitors`, `calendar`, `trends`,
  `analytics`) son **Server Components**, listas para volverse `async` y
  hacer `fetch` server-side sin más cambios estructurales.
- Las páginas con estado local o que dependen de `localStorage` (`hooks`,
  `script`, `scheduler`) están separadas en Client Components que reciben la
  data inicial por props, para poder alimentarlas con datos reales del
  servidor sin tocar su lógica interna.
- Las series de `performanceRanges` (7/30/90 días) se generan con un PRNG
  determinista (`mulberry32`, semilla fija) en vez de `Math.random()` —
  necesario porque estas páginas son estáticas: un dato no-determinista
  produciría un mismatch de hidratación entre el HTML pre-renderado y el
  primer render en cliente.

### Programador: video real → 3 captions → programación por plataforma

`/scheduler` sigue el flujo pedido en el brief de punta a punta, dentro de
las limitaciones de un mock sin backend:

1. Se elige un hook/guion base (o llega precargado desde `/script`).
2. Se sube un archivo de video real (`<input type="file" accept="video/*">`).
   Al seleccionarlo, `generateCaptionVariants()` (`src/lib/captions.ts`)
   genera las **3 variantes de caption** pedidas — Directo, Storytelling y
   Preguntas — a partir del hook y el nicho, con un breve estado
   "Generando..." simulado (`setTimeout`) para que se sienta como
   procesamiento real. Cada variante es editable en su propio tab.
3. Cada plataforma (Instagram / TikTok / YouTube Shorts) se activa por
   separado y tiene **su propio selector de fecha y hora** — no se programa
   todo a la misma hora. El botón "Programar publicación" solo se habilita
   cuando hay captions generados y al menos una plataforma con fecha y hora.
4. Cada pieza programada (`ScheduledPost`) guarda un `target` por
   plataforma con su propio `status`: **Borrador / Programado / Publicando**
   (los tres estados pedidos). La cola de publicaciones muestra el estado de
   cada plataforma de forma independiente, porque una misma pieza puede estar
   "Publicando" en Instagram mientras sigue en "Borrador" en YouTube Shorts.

Conectar APIs reales (Meta Graph API, TikTok API, YouTube Data API) o un LLM
real reemplazaría únicamente `generateCaptionVariants()` y el callback
`onSchedule` en `scheduler-board.tsx` — el resto de la UI ya está modelada
para eso.

### Calendario: vista mensual real + panel lateral con guion completo

`CalendarMonth` (`components/dashboard/calendar-month.tsx`) construye una
cuadrícula de mes completo con `buildMonthGrid()` (incluye los días de los
meses vecinos para completar semanas, atenuados) y agrupa las
`calendarEntries` del mock por fecha. Cada bloque muestra hora + ícono de
plataforma + hook resumido; el día de hoy se resalta con un círculo relleno
en `--primary`. Al hacer clic en cualquier bloque se abre un `Sheet` lateral
(`components/ui/sheet.tsx`) con la fecha/hora exacta, plataforma, formato,
el **guion completo** y el **caption** — tal como pide el brief.

### Analíticas: rangos 7/30/90 días y "contenido destacado"

- `PerformanceChart` tiene dos selectores independientes: la métrica
  (Vistas / Guardados / Nuevos seguidores / DMs) y el rango (7 / 30 / 90
  días), cada uno respaldado por su propia serie en `performanceRanges`.
- `averageViews30d` y `featuredThreshold` (`= averageViews30d * 2`) se
  calculan una vez en `mock.ts` a partir de `contentPerformance` (12 piezas
  de los últimos 30 días). `isFeatured(views)` es la regla de "contenido
  destacado" pedida — cualquier reel con el doble o más de esa media se
  marca con el badge "Contenido destacado" en el Top 5.
- El Top 5 (`top5ContentThisWeek`) no es solo una tabla de números: cada
  tarjeta incluye el campo `reason`, una explicación breve de qué hizo que
  esa pieza destacara (o no) — el "por qué destacó" pedido explícitamente.

### Competidores: cadencia semanal real (domingo 8:00 am)

`getCompetitorScanWindow()` en `mock.ts` calcula, a partir de la fecha real
(`new Date()`), el domingo 8:00 am más reciente y el siguiente — no son
fechas hardcodeadas, así que el header de `/competitors` siempre muestra
"Último análisis" / "Próximo" correctos sin importar cuándo se abra el
dashboard. Cada `CompetitorReel` incluye `hook` y `onScreenText` (los campos
que representan "transcribir el audio y extraer el hook y el texto en
pantalla"), y cada tarjeta linkea a `accountHandle` en `competitorAccounts`
para mostrar seguidores y nicho junto al reel.

### Tendencias: escala 1–10, justificación y fuentes por tipo

Cada `TrendItem` tiene `potential` (1–10, no 0–100), `justification` (por
qué se le dio ese puntaje) y `mentionedBy` (subconjunto de las 12
`trendSources`, cada una tipada como `Newsletter` / `Cuenta` / `Comunidad`).
La cabecera de `/trends` agrupa las 12 fuentes por tipo y la lista siempre
se ordena por `potential` descendente. La barra de progreso de cada tema usa
el color de marca correspondiente a su nivel (verde/naranja/gris — ver
`potentialTier()`), igual que el resto del dashboard.

### Componentes reutilizables clave

- `PageHeader` (`components/dashboard/page-header.tsx`): ícono + título +
  descripción + slot de acciones, usado en las 6 páginas para header
  consistente.
- `StatCard` (`components/dashboard/stat-card.tsx`): tarjeta de KPI con
  delta (%) en verde/rojo, usada en Resumen y Analíticas.
- `AppShell` / `Sidebar` / `MobileSidebar` / `MobileTopbar`
  (`components/dashboard/`): layout responsivo — sidebar fijo en desktop
  (`lg:` breakpoint), `Sheet` deslizable en mobile con el mismo `SidebarNav`.

### Perfil en el sidebar

El bloque superior del sidebar (`SidebarProfile`) muestra el avatar (iniciales
"PH"), el handle **`@puertohub.pxm`** con un check de verificado y el
subtítulo "Panel de creador". Es un componente estático por ahora — si se
agrega autenticación, es el punto de integración natural para mostrar el
usuario real.

## Cómo correr el proyecto

```bash
npm install
npm run dev
# abrir http://localhost:3000
```

El proyecto fue verificado con `npm run build` (build de producción sin
errores, TypeScript estricto) y `npm run lint` (sin warnings), además de una
revisión visual de las 8 rutas (incluye `/script` y el menú mobile) y de los
flujos interactivos completos en Chromium headless: Hooks → "Usa este hook"
→ `/script` precargado, Competidores → "Guardar en banco de hooks" →
aparece en la Biblioteca de Hooks con badge "Del banco", clic en un bloque
del Calendario → panel lateral con guion y caption, y subir un video en el
Programador → 3 variantes de caption generadas.
