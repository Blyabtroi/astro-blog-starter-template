import type { Locale } from "./ui";

type MkncListItem = { term: string; detail: string };

export type MkncContent = {
	title: string;
	description: string;
	heading: string;
	lead: string;
	sections: {
		title: string;
		paragraphs?: string[];
		list?: MkncListItem[];
	}[];
	disclaimer: string;
};

export const mkncContent: Record<Locale, MkncContent> = {
	ru: {
		title: "МКНЦ FAQ-бот — Mind Arts",
		description:
			"Справочный чат-бот для пациентов МКНЦ: Python, поиск по базе знаний и AI-перефраз при недоступности колл-центра.",
		heading: "FAQ-бот МКНЦ",
		lead:
			"Справочный чат-бот для ГБУЗ МКНЦ им. А.С. Логинова: ответы о записи, часах работы, проезде и подготовке к исследованиям, когда живой колл-центр недоступен или перегружен.",
		sections: [
			{
				title: "Задача",
				paragraphs: [
					"Снять типовые вопросы с линии в моменты, когда операторы недоступны или очередь растёт. Целевой эффект на пилоте — сокращение числа звонков примерно на 20% за счёт самообслуживания по проверенной базе знаний.",
				],
			},
			{
				title: "Технологии",
				list: [
					{ term: "Python", detail: "серверная логика, API и админка." },
					{ term: "PostgreSQL", detail: "хранение контента и сессий." },
					{
						term: "BM25",
						detail: "поиск по базе знаний с официального сайта и внутренних материалов.",
					},
					{
						term: "AI (LLM)",
						detail:
							"опциональный перефраз ответа в разговорной форме; факты остаются привязаны к найденным фрагментам KB.",
					},
					{ term: "FastAPI", detail: "HTTP API; виджет и интеграции с внешними фронтами." },
				],
			},
			{
				title: "Как это устроено",
				paragraphs: [
					"Пользователь задаёт вопрос текстом. Система находит релевантные фрагменты в базе, собирает ответ и при необходимости смягчает формулировку моделью. Ответственность за содержание остаётся за утверждёнными текстами, а не за «галлюцинации» модели.",
				],
			},
		],
		disclaimer:
			"Информационный проект Mind Arts. Не является официальным сайтом или каналом ГБУЗ МКНЦ и не заменяет консультацию врача или официальную запись через уполномоченные сервисы центра.",
	},
	en: {
		title: "MKNC FAQ bot — Mind Arts",
		description:
			"Patient FAQ chatbot for MKNC: Python, knowledge-base search, and optional AI rephrasing when the call center is unavailable.",
		heading: "MKNC FAQ bot",
		lead:
			"A reference chatbot for GBUZ MKNC (A.S. Loginov): answers about appointments, hours, directions, and exam prep when the live call center is unavailable or overloaded.",
		sections: [
			{
				title: "Goal",
				paragraphs: [
					"Take routine questions off the phone line when operators are unavailable or queues grow. On the pilot, the target is roughly a 20% reduction in calls through self-service backed by a vetted knowledge base.",
				],
			},
			{
				title: "Stack",
				list: [
					{ term: "Python", detail: "server logic, API, and admin." },
					{ term: "PostgreSQL", detail: "content and sessions." },
					{ term: "BM25", detail: "search over the official site and internal KB material." },
					{
						term: "AI (LLM)",
						detail:
							"optional conversational rephrasing; facts stay tied to retrieved KB snippets.",
					},
					{ term: "FastAPI", detail: "HTTP API for the widget and external front ends." },
				],
			},
			{
				title: "How it works",
				paragraphs: [
					"The user asks in text. The system finds relevant KB chunks, composes an answer, and may soften wording with a model. Content responsibility stays with approved source text, not model hallucinations.",
				],
			},
		],
		disclaimer:
			"An informational Mind Arts project. Not an official MKNC site or channel; does not replace medical advice or booking through the center’s authorized services.",
	},
};
