// @ts-check
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

/** Dev-only: Astro does not map public/foo/index.html → /foo/ (preview/build do). */
const legacyLandingDirs = ["beatbob", "kinonaoborot", "tarifmometr"];

/** @returns {import("astro").AstroIntegration} */
function legacyPublicIndexIntegration() {
	return {
		name: "legacy-public-index-dev",
		hooks: {
			"astro:server:setup": (
				/** @type {{ server: import("vite").ViteDevServer }} */ { server },
			) => {
				const handler = (
					/** @type {import("node:http").IncomingMessage} */ req,
					/** @type {import("node:http").ServerResponse} */ res,
					/** @type {() => void} */ next,
				) => {
					if (req.method !== "GET" && req.method !== "HEAD") return next();
					const pathname = req.url?.split("?")[0] ?? "";
					if (!pathname.endsWith("/") || pathname === "/") return next();

					const slug = pathname.slice(1, -1);
					if (!legacyLandingDirs.includes(slug)) return next();

					const indexPath = path.join(process.cwd(), "public", slug, "index.html");
					if (!fs.existsSync(indexPath)) return next();

					if (req.method === "HEAD") {
						res.statusCode = 200;
						res.setHeader("Content-Type", "text/html; charset=utf-8");
						res.end();
						return;
					}

					res.statusCode = 200;
					res.setHeader("Content-Type", "text/html; charset=utf-8");
					res.end(fs.readFileSync(indexPath));
				};

				server.middlewares.stack.unshift({ route: "", handle: handler });
			},
		},
	};
}

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
	integrations: [legacyPublicIndexIntegration(), mdx(), sitemap()],
});
