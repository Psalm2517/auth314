import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto my-2 h-9 w-9 animate-spin rounded-full border-[3px] border-border border-t-foreground",
        className,
      )}
    />
  );
}
