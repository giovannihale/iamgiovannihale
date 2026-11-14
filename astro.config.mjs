// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://iamgiovannihale.com",
	integrations: [mdx(), sitemap()],
	redirects: {
		"/home": "/",
		"/blog": "/notes/",
	},
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
