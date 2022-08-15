import classes from '@/styles/category.module.scss';
import { useStore } from '@nanostores/react';
import { i18n, format } from "@/stores/locale"


export const messages = i18n('bottom_menu', {
    pages_test_preparation_guides: "Видеоуроки по подготовке к ОРТ"
})

// const t = useStore(messages);

export function BottomMenu({links}) {
    const t = useStore(messages);
    return(
        <section className={classes.category}>
            {links.map((link) =>{ 
                return (<div className={classes.col_3}>
                          <a href={`/pages/${link.page_slug}`}>{link.title}</a>
                        </div>
                )}
            )}

                <div className={classes.col_3}>
                    <a href="/videolessons">{t.pages_test_preparation_guides}</a>
                </div>

        </section>
    )
}
