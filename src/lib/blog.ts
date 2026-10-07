import type { CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/ui";

export function postSlug(post: CollectionEntry<"blog">): string {
	const prefix = `${post.data.locale}/`;
	if (post.id.startsWith(prefix)) return post.id.slice(prefix.length);
	return post.id;
}

export function blogPostUrl(locale: Locale, slug: string): string {
	return locale === "en" ? `/en/blog/${slug}/` : `/blog/${slug}/`;
}
