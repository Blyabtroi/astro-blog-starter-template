// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://mindarts.ru",
	output: "static",
	i18n: {
		defaultLocale: "ru",
		locales: ["ru", "en"],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [mdx(), sitemap()],
});
