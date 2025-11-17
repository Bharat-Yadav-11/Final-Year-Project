"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function StorageBarSkeleton() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function StorageBar() {
  const usageBytes = useQuery(api.files.getStorageUsage);

  if (usageBytes === undefined) {
    return <StorageBarSkeleton />;
  }

  const TOTAL_GB = 45;
  const TOTAL_BYTES = TOTAL_GB * 1024 * 1024 * 1024;
  const usagePercent = (usageBytes / TOTAL_BYTES) * 100;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Progress value={usagePercent} />
      <span className="text-xs text-gray-600">
        {formatBytes(usageBytes)} of {TOTAL_GB} GB used
      </span>
    </div>
  );
}