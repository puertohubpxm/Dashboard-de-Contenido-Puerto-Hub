import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Library,
  BarChart3,
  Radar,
  Send,
  CalendarDays,
  Sparkles,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export const overviewNavItem: NavItem = {
  title: "Resumen",
  href: "/",
  icon: LayoutDashboard,
  description: "Vista general de la cuenta",
};

export const navItems: NavItem[] = [
  {
    title: "Biblioteca de Hooks",
    href: "/hooks",
    icon: Library,
    description: "Hooks virales guardados, transcritos y en plantillas",
  },
  {
    title: "Analíticas",
    href: "/analytics",
    icon: BarChart3,
    description: "Visualizaciones, guardados, seguidores y top de la semana",
  },
  {
    title: "Seguimiento de Competidores",
    href: "/competitors",
    icon: Radar,
    description: "Mejores reels recopilados semanalmente",
  },
  {
    title: "Programador",
    href: "/scheduler",
    icon: Send,
    description: "Programación multiplataforma y captions automáticos",
  },
  {
    title: "Calendario de Contenido",
    href: "/calendar",
    icon: CalendarDays,
    description: "Autocompletado con hooks y ángulos de contenido",
  },
  {
    title: "Tendencias",
    href: "/trends",
    icon: Sparkles,
    description: "Noticias de IA de 12 fuentes rankeadas por potencial de hook",
  },
];
