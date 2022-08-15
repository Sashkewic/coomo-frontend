import { i18n } from "@/stores/locale"
import { params, count } from '@nanostores/i18n'

export const messages = i18n("search_results", {
    search_results_title: "Результаты поиска",
    search_results_found_items_before: "По результатам поиска",
    search_results_found_items_after: count({
      one: "найдено: {count} запись",
      few: "найдено: {count} записи",
      many: "найдено: {count} записей"
    }),
    search_results_sorting: "Сортировать",
    search_results_sorting_all: "Все",
    search_results_sorting_news: "Новости",
    search_results_sorting_pages: "Страницы",
    search_results_sorting_tests: "Тесты",
    search_results_sorting_courses: "Видеокурсы"
})
