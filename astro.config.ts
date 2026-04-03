// @ts-check
import qwik from "@qwik.dev/astro";
import { defineConfig } from "astro/config";

import swup from "@swup/astro";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://elemental.moulas.dev",
  integrations: [
    qwik({ include: "**/qwik/*.tsx", clientRouter: true }),
    swup()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
