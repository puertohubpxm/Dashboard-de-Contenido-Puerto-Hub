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
        description="Sube el video, genera 3 variantes de caption y programa por plataforma con fecha y hora propias"
      />
      <SchedulerBoard hooks={hooks} initialPosts={scheduledPosts} />
    </>
  );
}
