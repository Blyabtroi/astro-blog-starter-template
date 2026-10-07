import type { Locale } from "./ui";

export type AboutContent = {
	paragraphs: string[];
	highlightsTitle: string;
	highlights: string[];
	closing: string;
};

export const aboutContent: Record<Locale, AboutContent> = {
	ru: {
		paragraphs: [
			"Я Василий Козлов — разработчик и автор.",
			"Мой основной бэкграунд — мобильная разработка и руководство командами. Работал в VK, Delivery Club и МТС. В сумме — больше 10 лет.",
		],
		highlightsTitle: "Три интересных факта из моего опыта:",
		highlights: [
			"Make VK Music great again.",
			"Delivery Club в годы ковида.",
			"Команды, в которых хочется работать.",
		],
		closing:
			"На этом сайте — обзор проектов, статьи и ссылки на отдельные продукты. Связаться можно через LinkedIn в шапке или подвале.",
	},
	en: {
		paragraphs: [
			"I'm Vasiliy (Basil) Kozlov — a developer and maker.",
			"My core background is mobile development and engineering leadership. I've worked at VK, Delivery Club, and MTS — over 10 years in total.",
		],
		highlightsTitle: "Three facts from my experience:",
		highlights: [
			"Make VK Music great again.",
			"Delivery Club during the COVID years.",
			"Teams worth working.",
		],
		closing:
			"This site collects project overviews, articles, and links to standalone products. Reach out via LinkedIn in the header or footer, or Twitter in the footer.",
	},
};
