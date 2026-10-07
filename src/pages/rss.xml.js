import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION_RU } from "../consts";
import { blogPostUrl, postSlug } from "../lib/blog";

export async function GET(context) {
	const posts = await getCollection("blog", ({ data }) => data.locale === "ru");
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION_RU,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: blogPostUrl("ru", postSlug(post)),
		})),
	});
}
