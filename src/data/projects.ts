import type { Locale } from "../i18n/ui";

export type Project = {
	slug: string;
	landingPath?: string;
	externalUrl?: string;
	featured: boolean;
	order: number;
	title: Record<Locale, string>;
	description: Record<Locale, string>;
	tags: string[];
};

export const projects: Project[] = [
	{
		slug: "beatbob",
		landingPath: "/beatbob/",
		featured: true,
		order: 1,
		title: { ru: "Beatbob", en: "Beatbob" },
		description: {
			ru: "Проект Beatbob — лендинг и продукт на mindarts.ru/beatbob.",
			en: "Beatbob — product landing at mindarts.ru/beatbob.",
		},
		tags: ["web"],
	},
	{
		slug: "kinonaoborot",
		landingPath: "/kinonaoborot/",
		featured: true,
		order: 2,
		title: { ru: "Кино наоборот", en: "Kinonaoborot" },
		description: {
			ru: "Кино наоборот — отдельный лендинг проекта.",
			en: "Kinonaoborot — dedicated project landing.",
		},
		tags: ["web"],
	},
	{
		slug: "tarifmometr",
		landingPath: "/tarifmometr/",
		featured: true,
		order: 3,
		title: { ru: "Тарифометр", en: "Tarifmometr" },
		description: {
			ru: "Тарифометр — инструмент и лендинг на mindarts.ru.",
			en: "Tarifmometr — tool and landing on mindarts.ru.",
		},
		tags: ["web"],
	},
	{
		slug: "konek",
		externalUrl: "https://konek.mind-arts.ru",
		featured: true,
		order: 4,
		title: { ru: "Konek", en: "Konek" },
		description: {
			ru: "Konek — отдельный продукт на поддомене konek.mind-arts.ru.",
			en: "Konek — standalone product at konek.mind-arts.ru.",
		},
		tags: ["product"],
	},
];

export function sortedProjects() {
	return [...projects].sort((a, b) => a.order - b.order);
}

export function projectHref(project: Project): string {
	return project.externalUrl ?? project.landingPath ?? "/projects/";
}
