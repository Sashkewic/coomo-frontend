import { i18n } from "@/stores/locale"
import { params } from '@nanostores/i18n'

export const messages = i18n('online_test', {
    online_test_title: "Онлайн Тест",
    online_test_title_subjects: "Предметы",
    online_test_lang_ru: "Русский",
    online_test_lang_kg: "Кыргызский",
    online_test_part: "часть",
    online_test_version: "вариант",
    online_test_quantity_quests: "Количество заданий",
    online_test_time_test: params<{ minutes: number }>("Время: {minutes} минут"),
    online_test_search: "Поиск по предмету",
    online_test_search_all: "Все",
    online_test_search_option1: "Все предметы",
    online_test_search_option2: "На кыргызском",
    online_test_search_option3: "На русском",
    extra_note1: "Для более подробных результатов, показывающих уровень подготовленности тестируемого в конкретных разделах теста ОРТ Вам следует пройти Пробное бланочное тестирование ЦООМО.",
    extra_note2: "Тесты, используемые в этом случае, отличаются по содержанию от тестов бесплатного онлайн-тестирования.",
    start_test_button: "Начать тест",
    page_title: "бланк ответов",
    timing: "Оставшееся время",
    button_text: "Закончить тест",
})
