import { i18n } from "@/stores/locale"
import { count } from '@nanostores/i18n'

export const messages = i18n('videolessons', {
    videolessons_title: "Видеоуроки",
    videolessons_youtube_link1: "Смотрите все видеоуроки на нашем",
    videolessons_youtube_link2: "Youtube-канале",
    videolessons_youtube_link3: "",
    videolessons_subjects: "Предметы",
    
    courses: count({
        one: "{count} курс",
        few: "{count} курса",
        many: "{count} курсов",
    }),   
    more: "ещё"
})