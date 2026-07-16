import { json } from "../lib/http";

export function handleHealth(): Response {
  return json({ status: "ok" }, 200);
}
