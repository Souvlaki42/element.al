import { z } from "astro/zod";
import type { elementSchema } from "./schemas";

type Element = z.infer<typeof elementSchema>;
type Cache = { value: Element[] | null; timestamp: number | null };

let cache: Cache = {
  value: null,
  timestamp: null
};

export function getRandomElements(
  elements: Element[],
  msDuration: number
): Element[] {
  const now = Date.now();

  // Check if the cache is still valid
  if (cache.value && now - (cache.timestamp ?? 0) < msDuration) {
    return cache.value; // Return cached value
  }

  // If cache is expired or doesn't exist, generate new random elements
  cache.value = elements.sort(() => Math.random() - 0.5).slice(0, 6);
  cache.timestamp = now; // Update the timestamp

  return cache.value; // Return the new value
}
