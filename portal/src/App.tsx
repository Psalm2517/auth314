import { Landing } from "@/pages/Landing";
import { Verify } from "@/pages/Verify";

const MARKETING_HOSTS = ["auth314.com", "www.auth314.com"];

export function App() {
  return MARKETING_HOSTS.includes(window.location.hostname) ? (
    <Landing />
  ) : (
    <Verify />
  );
}
