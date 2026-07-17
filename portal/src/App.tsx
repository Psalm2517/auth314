import { Landing } from "@/pages/Landing";
import { Verify } from "@/pages/Verify";

const MARKETING_HOSTS = ["auth314.com", "www.auth314.com"];

export function App() {
  if (MARKETING_HOSTS.includes(window.location.hostname)) {
    return <Landing />;
  }

  const session = new URLSearchParams(window.location.search).get("session");
  if (!session) {
    window.location.replace("https://auth314.com");
    return null;
  }

  return <Verify />;
}
