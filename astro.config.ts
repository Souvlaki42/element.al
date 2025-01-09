import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import qwikdev from "@qwikdev/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://elemental.souviki.me",
  integrations: [tailwind(), qwikdev({ include: "**/qwik/*.tsx" })]
});
