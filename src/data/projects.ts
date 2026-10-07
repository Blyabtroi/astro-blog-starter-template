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
		title: { ru: "BeatBob", en: "BeatBob" },
		description: {
			ru: "iOS-приложение: персонаж кивает в такт музыке с микрофона. Лендинг на английском.",
			en: "iOS app: Bob headbangs to the beat from nearby music. English landing.",
		},
		tags: ["iOS", "audio"],
	},
	{
		slug: "kinonaoborot",
		landingPath: "/kinonaoborot/",
		featured: true,
		order: 2,
		title: { ru: "Кино наоборот", en: "Kinonaoborot" },
		description: {
			ru: "Угадай фильм по перевёрнутому названию — Telegram-бот, группа и приложение.",
			en: "Guess the movie from an upside-down title — Telegram bot, group, and iOS app.",
		},
		tags: ["Telegram", "iOS", "game"],
	},
	{
		slug: "tarifmometr",
		landingPath: "/tarifmometr/",
		featured: true,
		order: 3,
		title: { ru: "Тарифометр", en: "Tarifmometr" },
		description: {
			ru: "Telegram-бот и iOS: мониторинг цены такси на маршруте и уведомление о снижении.",
			en: "Telegram bot and iOS: watch taxi fares on your route and get notified when prices drop.",
		},
		tags: ["Telegram", "iOS", "utility"],
	},
	{
		slug: "mknc",
		landingPath: "/mknc/",
		featured: true,
		order: 4,
		title: { ru: "МКНЦ FAQ-бот", en: "MKNC FAQ bot" },
		description: {
			ru: "Справочный бот для пациентов МКНЦ: Python, BM25 и AI при недоступности колл-центра.",
			en: "Patient FAQ bot for MKNC: Python, BM25, and AI when the call center is unavailable.",
		},
		tags: ["Python", "AI", "healthcare"],
	},
	{
		slug: "konek",
		externalUrl: "https://apps.apple.com/tj/app/konek/id6810789188",
		featured: true,
		order: 5,
		title: { ru: "Konek", en: "Konek" },
		description: {
			ru:
				"Головоломка на ход шахматного коня: заполнить поле без тупиков. Режимы — уровни, два игрока на одном устройстве и игра против ИИ.",
			en:
				"Knight's tour puzzle: cover every playable square without getting stuck. Puzzle levels, local two-player, and vs AI.",
		},
		tags: ["iOS", "puzzle", "game"],
	},
	{
		slug: "magnetology",
		externalUrl: "https://apps.apple.com/tj/app/magnetology/id789651124",
		featured: true,
		order: 6,
		title: { ru: "Magnetology", en: "Magnetology" },
		description: {
			ru:
				"iOS: прогноз геомагнитных бурь и индекс Kp (данные NOAA) — чтобы заранее учитывать самочувствие и нагрузку.",
			en:
				"iOS app: geomagnetic storm forecast and Kp index (NOAA data) — plan around storms and how you feel.",
		},
		tags: ["iOS", "weather"],
	},
	{
		slug: "padla-picasso",
		externalUrl: "https://padlapicasso.ru",
		featured: true,
		order: 7,
		title: { ru: "Padla Picasso", en: "Padla Picasso" },
		description: {
			ru:
				"Словесный батл с AI-персонажами: ищи слабости, обходи красную линию и выноси противника за минимум реплик.",
			en:
				"Word battle with AI characters: spot weaknesses, stay off the red line, and win in as few replies as you can.",
		},
		tags: ["Telegram", "AI", "game"],
	},
];

export function sortedProjects() {
	return [...projects].sort((a, b) => a.order - b.order);
}

export function isAppStoreUrl(url: string): boolean {
	return url.includes("apps.apple.com/");
}

export function projectHref(project: Project, locale: Locale = "ru"): string {
	if (project.externalUrl) return project.externalUrl;
	if (project.landingPath) {
		if (locale === "en" && project.slug === "mknc") {
			return "/en/mknc/";
		}
		return project.landingPath;
	}
	return locale === "en" ? "/en/projects/" : "/projects/";
}
