import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION_EN } from "../../consts";
import { blogPostUrl, postSlug } from "../../lib/blog";

export async function GET(context) {
	const posts = await getCollection("blog", ({ data }) => data.locale === "en");
	return rss({
		title: `${SITE_TITLE} (EN)`,
		description: SITE_DESCRIPTION_EN,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: blogPostUrl("en", postSlug(post)),
		})),
	});
}
