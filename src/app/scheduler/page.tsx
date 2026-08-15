import { Send } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { SchedulerBoard } from "@/components/dashboard/scheduler-board";
import { hooks, scheduledPosts } from "@/data/mock";

export const metadata = {
  title: "Programador · Puerto Hub",
};

export default function SchedulerPage() {
  return (
    <>
      <PageHeader
        icon={Send}
        title="Programador"
        description="Programación multiplataforma con un solo clic y generación automática de captions"
      />
      <SchedulerBoard hooks={hooks} initialPosts={scheduledPosts} />
    </>
  );
}
