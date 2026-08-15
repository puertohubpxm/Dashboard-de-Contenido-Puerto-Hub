import { Library } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { HooksLibrary } from "@/components/dashboard/hooks-library";
import { hooks, hookTemplates } from "@/data/mock";

export const metadata = {
  title: "Biblioteca de Hooks · Puerto Hub",
};

export default function HooksPage() {
  return (
    <>
      <PageHeader
        icon={Library}
        title="Biblioteca de Hooks"
        description={`${hooks.length} hooks guardados, transcritos y organizados en ${hookTemplates.length} plantillas`}
      />
      <HooksLibrary hooks={hooks} templates={hookTemplates} />
    </>
  );
}
