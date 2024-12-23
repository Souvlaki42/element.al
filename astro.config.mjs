// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

import qwikdev from "@qwikdev/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), qwikdev()],
  adapter: vercel()
});