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
import type { Hook, Platform, ScheduledPost, TargetStatus } from "@/data/mock";
import { formatDate, formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const platformIcons: Record<Platform, typeof Aperture> = {
  Instagram: Aperture,
  TikTok: Music2,
  "YouTube Shorts": PlaySquare,
};

const statusVariant: Record<TargetStatus, "secondary" | "default" | "warning"> = {
  Borrador: "secondary",
  Programado: "default",
  Publicando: "warning",
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
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[400px_1fr]">
      <SchedulerComposer
        hooks={hooks}
        onSchedule={(post) => setPosts((prev) => [post, ...prev])}
      />

      <Card>
        <CardHeader>
          <CardTitle>Cola de publicaciones</CardTitle>
          <CardDescription>
            {posts.length} piezas · estado por plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-3 rounded-lg border border-border p-4"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  {post.activeVariant} · basado en un hook de la biblioteca
                </span>
                <p className="text-sm font-medium text-foreground">
                  &ldquo;{post.hookUsed}&rdquo;
                </p>
                <p className="whitespace-pre-line text-xs text-muted-foreground">
                  {post.captions[post.activeVariant]}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 border-t border-border pt-3">
                {post.targets.map((target) => {
                  const Icon = platformIcons[target.platform];
                  return (
                    <div
                      key={target.platform}
                      className="flex items-center justify-between gap-2 text-xs"
                    >
                      <span
                        className={cn(
                          "flex items-center gap-1.5 font-medium text-foreground"
                        )}
                      >
                        <Icon className="size-3.5 text-muted-foreground" />
                        {target.platform}
                        <span className="font-normal text-muted-foreground">
                          {formatDate(target.scheduledAt)} ·{" "}
                          {formatTime(target.scheduledAt)}
                        </span>
                      </span>
                      <Badge variant={statusVariant[target.status]}>
                        {target.status}
                      </Badge>
                    </div>
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
