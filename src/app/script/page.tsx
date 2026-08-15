import { Suspense } from "react";
import { NotebookPen } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { ScriptEditor } from "@/components/dashboard/script-editor";

export const metadata = {
  title: "Guion · Puerto Hub",
};

export default function ScriptPage() {
  return (
    <>
      <PageHeader
        icon={NotebookPen}
        title="Guion"
        description="El hook seleccionado se inserta aquí automáticamente — escribe el guion completo y el caption antes de enviarlo al Programador"
      />
      <Suspense fallback={null}>
        <ScriptEditor />
      </Suspense>
    </>
  );
}
