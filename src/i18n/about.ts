import type { Locale } from "./ui";

export const aboutContent: Record<
	Locale,
	{ paragraphs: string[] }
> = {
	ru: {
		paragraphs: [
			"Я Василий (Basil) Козлов — разработчик и автор проектов под брендом Mind Arts. Делаю веб-продукты, лендинги и инструменты, где важны ясность интерфейса и аккуратная инженерия.",
			"На этом сайте — обзор проектов, статьи и ссылки на отдельные продукты. Исходники сайта открыты; обновления выкатываются через GitHub.",
			"Связаться можно через GitHub или соцсети в подвале страницы.",
		],
	},
	en: {
		paragraphs: [
			"I'm Vasiliy (Basil) Kozlov — a developer and maker behind Mind Arts. I build web products, landing pages, and tools where clear UX and solid engineering matter.",
			"This site is a hub for project overviews, articles, and links to standalone products. The site source is in git; updates ship via GitHub.",
			"Reach out via GitHub or the social links in the footer.",
		],
	},
};
