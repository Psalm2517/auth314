export function Brand({ className }: { className?: string }) {
  return (
    <div className={className}>
      Auth<span className="text-accent">314</span>
      <span className="ml-0.5 text-accent text-[1.15em]" aria-hidden>
        π
      </span>
      <span className="sr-only">pi</span>
    </div>
  );
}
