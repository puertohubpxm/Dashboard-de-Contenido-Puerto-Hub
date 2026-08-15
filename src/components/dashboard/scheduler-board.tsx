"use client";

import { useState } from "react";
import { Aperture, Music2, PlaySquare } from "lucide-react";

import { SchedulerComposer } from "@/components/dashboard/scheduler-composer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Hook, ScheduledPost } from "@/data/mock";
import { formatDate, formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const platformIcons: Record<ScheduledPost["platforms"][number], typeof Aperture> = {
  Instagram: Aperture,
  TikTok: Music2,
  YouTube: PlaySquare,
};

const statusVariant: Record<
  ScheduledPost["status"],
  "default" | "secondary" | "success" | "warning"
> = {
  Borrador: "secondary",
  Listo: "warning",
  Programado: "default",
  Publicado: "success",
};

export function SchedulerBoard({
  hooks,
  initialPosts,
}: {
  hooks: Hook[];
  initialPosts: ScheduledPost[];
}) {
  const [posts, setPosts] = useState<ScheduledPost[]>(initialPosts);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_1fr]">
      <SchedulerComposer
        hooks={hooks}
        onSchedule={(post) => setPosts((prev) => [post, ...prev])}
      />

      <Card>
        <CardHeader>
          <CardTitle>Cola de publicaciones</CardTitle>
          <CardDescription>
            {posts.length} publicaciones · multiplataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={statusVariant[post.status]}>{post.status}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(post.scheduledAt)} · {formatTime(post.scheduledAt)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    · {post.hookUsed}
                  </span>
                </div>
                <p className="max-w-xl whitespace-pre-line text-sm text-foreground">
                  {post.caption}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                {post.platforms.map((p) => {
                  const Icon = platformIcons[p];
                  return (
                    <span
                      key={p}
                      className={cn(
                        "flex size-7 items-center justify-center rounded-md bg-accent text-accent-foreground"
                      )}
                      title={p}
                    >
                      <Icon className="size-3.5" />
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
