import logo from "@/assets/logo.svg";

export function Brand({ className }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <img src={logo} alt="" className="h-[1.15em] w-[1.15em]" aria-hidden />
      Auth
      <span
        className="bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(180deg, #ffffff 0%, #c6c7cc 100%)" }}
      >
        314
      </span>
      <span
        className="ml-0.5 bg-clip-text text-[1.15em] text-transparent"
        style={{ backgroundImage: "linear-gradient(180deg, #ffffff 0%, #c6c7cc 100%)" }}
        aria-hidden
      >
        π
      </span>
      <span className="sr-only">pi</span>
    </div>
  );
}
