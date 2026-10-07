export type Locale = "ru" | "en";

export const locales: Locale[] = ["ru", "en"];
export const defaultLocale: Locale = "ru";

const ui = {
	ru: {
		"nav.home": "Главная",
		"nav.projects": "Проекты",
		"nav.blog": "Блог",
		"nav.about": "Обо мне",
		"lang.switch": "English",
		"lang.current": "Русский",
		"footer.rights": "Все права защищены.",
		"home.title": "Mind Arts",
		"home.lead":
			"Проекты, статьи и эксперименты Василия Козлова.",
		"home.featuredProjects": "Избранные проекты",
		"home.recentPosts": "Последние статьи",
		"home.allProjects": "Все проекты",
		"home.allPosts": "Весь блог",
		"projects.title": "Проекты",
		"projects.lead": "Продукты и лендинги, мои.",
		"projects.open": "Открыть",
		"projects.external": "На отдельном сайте",
		"projects.appStore": "В App Store",
		"blog.title": "Блог",
		"blog.lead": "Заметки о разработке, дизайне и продуктах.",
		"about.title": "Обо мне",
		"about.description": "Кто я и чем занимаюсь.",
		"post.updated": "Обновлено",
		"404.title": "Страница не найдена",
		"404.lead": "Такой страницы нет. Вернитесь на главную.",
		"404.home": "На главную",
	},
	en: {
		"nav.home": "Home",
		"nav.projects": "Projects",
		"nav.blog": "Blog",
		"nav.about": "About",
		"lang.switch": "Русский",
		"lang.current": "English",
		"footer.rights": "All rights reserved.",
		"home.title": "Mind Arts",
		"home.lead":
			"Projects, writing, and experiments by Vasiliy Kozlov.",
		"home.featuredProjects": "Featured projects",
		"home.recentPosts": "Recent posts",
		"home.allProjects": "All projects",
		"home.allPosts": "All posts",
		"projects.title": "Projects",
		"projects.lead": "Products and landing pages I've built or maintain.",
		"projects.open": "Open",
		"projects.external": "External site",
		"projects.appStore": "App Store",
		"blog.title": "Blog",
		"blog.lead": "Notes on engineering, design, and products.",
		"about.title": "About me",
		"about.description": "Who I am and what I do.",
		"post.updated": "Updated",
		"404.title": "Page not found",
		"404.lead": "This page doesn't exist. Head back home.",
		"404.home": "Go home",
	},
} as const;

export type UiKey = keyof (typeof ui)["ru"];

export function useTranslations(locale: Locale) {
	return function t(key: UiKey): string {
		return ui[locale][key];
	};
}

export function getLocaleFromUrl(url: URL): Locale {
	const [, first] = url.pathname.split("/");
	return first === "en" ? "en" : "ru";
}

/** Path without /en prefix for locale switching */
export function stripEnPrefix(pathname: string): string {
	if (pathname === "/en") return "/";
	if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
	return pathname;
}
