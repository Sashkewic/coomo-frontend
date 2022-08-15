import { i18n } from "@/stores/locale"
import { params, count } from '@nanostores/i18n'

export const messages = i18n("galleries_page", {
  page_title: "Фотоальбомы",
  galleries: count({
    one: "{count} альбом",
    few: "{count} альбома",
    many: "{count} альбомов"
  }),
  more: "ещё"
})