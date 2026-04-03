// @ts-check
import qwikdev from "@qwikdev/astro";
import { defineConfig } from "astro/config";

import swup from "@swup/astro";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://elemental.moulas.dev",
  integrations: [qwikdev({ include: "**/qwik/*.tsx" }), swup()],
  vite: {
    plugins: [tailwindcss()]
  }
});
