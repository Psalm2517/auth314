import { Landing } from "@/pages/Landing";
import { Verify } from "@/pages/Verify";

export function App() {
  const hasSession = new URLSearchParams(window.location.search).has(
    "session",
  );
  return hasSession ? <Verify /> : <Landing />;
}
