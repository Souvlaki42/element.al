// @ts-check
import tailwind from "@astrojs/tailwind";
import qwikdev from "@qwikdev/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://elemental.souviki.me",
  integrations: [tailwind(), qwikdev({ include: "**/qwik/*.tsx" })]
});
