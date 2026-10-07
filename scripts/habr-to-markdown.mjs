import fs from "node:fs";
import path from "node:path";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const articles = [
	{
		id: 522326,
		slug: "habr-ideal-tech-interview",
		pubDate: "2020-10-07",
		source: "https://habr.com/ru/companies/deliveryclub/articles/522326/",
		description:
			"Как устроить техническое интервью в Delivery Club Tech: формат, HR, интервьюер и сценарий в пяти действиях.",
	},
	{
		id: 1083242,
		slug: "habr-vibe-coding-team",
		pubDate: "2025-09-17",
		source: "https://habr.com/ru/articles/1083242/",
		description:
			"Vibe coding как инженерная среда: безопасность, ясность, code review и роль руководителя.",
	},
];

const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
turndown.use(gfm);
turndown.remove(["script", "style"]);

async function fetchArticle(id) {
	const res = await fetch(`https://habr.com/kek/v2/articles/${id}/?fl=ru`);
	if (!res.ok) throw new Error(`Habr ${id}: ${res.status}`);
	return res.json();
}

async function downloadImage(url, dest) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Image ${url}: ${res.status}`);
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

async function processArticle(meta) {
	const data = await fetchArticle(meta.id);
	const title = data.titleHtml.replace(/<[^>]+>/g, "").trim();
	let html = data.textHtml;

	const replacements = [];
	html = html.replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, (tag, src) => {
		const ext = path.extname(new URL(src).pathname) || ".png";
		const file = `img-${String(replacements.length).padStart(2, "0")}${ext}`;
		const local = `/blog/habr/${meta.id}/${file}`;
		replacements.push({ src, dest: path.join("public", local), local });
		const altMatch = tag.match(/alt="([^"]*)"/i);
		const alt = altMatch?.[1] ?? "";
		return `<img src="${local}" alt="${alt}" />`;
	});

	for (const { src, dest } of replacements) {
		await downloadImage(src, dest);
		console.log("saved", dest);
	}

	let body = turndown.turndown(html);
	body = body.replace(/\n{3,}/g, "\n\n");

	const frontmatter = `---
title: '${title.replace(/'/g, "''")}'
description: '${meta.description.replace(/'/g, "''")}'
pubDate: ${meta.pubDate}
locale: ru
originalUrl: ${meta.source}
---

> Опубликовано на [Хабре](${meta.source}). Ниже — полный текст с сохранением иллюстраций.

`;

	const outPath = path.join("src/content/blog/ru", `${meta.slug}.md`);
	fs.writeFileSync(outPath, frontmatter + body + "\n");
	console.log("wrote", outPath);
}

for (const meta of articles) {
	await processArticle(meta);
}
