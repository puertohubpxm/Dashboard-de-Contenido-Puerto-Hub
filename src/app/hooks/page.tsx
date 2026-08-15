import { Library } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { HooksLibrary } from "@/components/dashboard/hooks-library";
import { hooks, hookNiches, hookTypes } from "@/data/mock";

export const metadata = {
  title: "Biblioteca de Hooks · Puerto Hub",
};

export default function HooksPage() {
  return (
    <>
      <PageHeader
        icon={Library}
        title="Biblioteca de Hooks"
        description={`${hooks.length} hooks guardados, transcritos y convertidos en plantillas reutilizables`}
      />
      <HooksLibrary hooks={hooks} niches={hookNiches} hookTypes={hookTypes} />
    </>
  );
}
