import logo from "@/assets/logo.svg";

export function Brand({ className }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className ?? ""}`}>
      <span className="flex h-[1.8em] w-[1.8em] flex-none items-center justify-center rounded-md border border-border bg-card">
        <img src={logo} alt="" className="h-[1.05em] w-[1.05em]" aria-hidden />
      </span>
      <span className="text-[#e7e8ea]">Auth314</span>
    </div>
  );
}
