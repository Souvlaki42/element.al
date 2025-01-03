// @ts-check
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import qwikdev from "@qwikdev/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://elemental.souviki.me",
  integrations: [tailwind(), qwikdev()],
  adapter: vercel()
});
