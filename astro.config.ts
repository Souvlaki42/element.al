// @ts-check
import qwik from "@qwik.dev/astro";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://elemental.moulas.dev",
  integrations: [qwik({ include: "**/qwik/*.tsx", clientRouter: true })],
  vite: {
    plugins: [tailwindcss()]
  }
});
