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
| Gráficas | `recharts` | Usado en Analíticas para el chart de rendimiento semanal. |
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
    analytics/page.tsx    # Analíticas
    competitors/page.tsx  # Seguimiento de Competidores
    scheduler/page.tsx    # Programador
    calendar/page.tsx     # Calendario de Contenido
    trends/page.tsx       # Tendencias
    globals.css           # Tokens de diseño (tema oscuro + terracota) y Tailwind v4
  components/
    ui/                  # Primitivas shadcn/ui vendorizadas (button, card, badge, tabs, table, ...)
    dashboard/           # Componentes compuestos específicos del producto (sidebar, page-header, stat-card, ...)
  data/
    mock.ts              # Toda la data de ejemplo del dashboard (ver más abajo)
  lib/
    utils.ts             # cn() — merge de clases Tailwind
    format.ts             # Formateo de números/fechas en es-ES
    nav.ts                # Definición de la navegación (las 6 secciones + "Resumen")
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
| YouTube | `PlaySquare` | Ícono de "reproducir" genérico. |

Si más adelante se agregan logos reales, considerar un set de SVG propio en
`public/icons/` en vez de depender de `lucide-react` para marcas.

### Rutas en inglés, contenido en español

Las URLs usan slugs en inglés (`/hooks`, `/analytics`, `/competitors`,
`/scheduler`, `/calendar`, `/trends`) por ser más cortas y estándar en
dashboards SaaS, mientras que **todo el copy visible es en español** (idioma
del negocio). `src/lib/nav.ts` centraliza el mapeo slug → título/descripción/ícono
para mantener sidebar, page headers y accesos rápidos sincronizados desde un
solo lugar.

### Datos de ejemplo (`src/data/mock.ts`)

Todo el contenido (hooks, analíticas, competidores, posts programados,
calendario, tendencias) es **data mock hardcodeada**, tipada con TypeScript.
No hay backend ni base de datos todavía. Cuando se conecte una fuente real:

- Los tipos exportados (`Hook`, `WeeklyPoint`, `TopContent`, `CompetitorReel`,
  `ScheduledPost`, `CalendarEntry`, `TrendItem`) están pensados para mapear 1:1
  a la forma que debería tener la respuesta de la API — se pueden reusar tal
  cual al reemplazar los arrays estáticos por `fetch`/`server actions`.
- Las páginas que solo leen datos (`competitors`, `calendar`, `trends`,
  `analytics`) son **Server Components**, listas para volverse `async` y
  hacer `fetch` server-side sin más cambios estructurales.
- Las páginas con estado local (`hooks` — búsqueda/filtro, `scheduler` —
  composer + cola) están separadas en Client Components (`hooks-library.tsx`,
  `scheduler-board.tsx`, `scheduler-composer.tsx`) que reciben la data inicial
  por props, para poder alimentarlas con datos reales del servidor sin tocar
  su lógica interna.

### El Programador es funcional (dentro del mock)

El botón "Generar automáticamente" en `/scheduler` sí genera un caption real
a partir del hook seleccionado (concatenando el hook + un CTA por nicho +
hashtags — ver `generateCaption()` en `scheduler-composer.tsx`), y "Programar
con un clic" añade la publicación a la cola en memoria (`useState`, sin
persistencia). Es la demostración más fiel al pedido de "un solo clic +
generación automática de captions"; conectar un modelo de lenguaje real o una
API de programación (Meta Graph API, TikTok API, etc.) reemplazaría
únicamente `generateCaption()` y el `onSchedule` callback.

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
revisión visual de las 7 rutas (incluye el menú mobile) en Chromium headless.
