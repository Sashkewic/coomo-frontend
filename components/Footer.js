import React from 'react';
import classes from '../styles/footer.module.scss';
import { useStore } from '@nanostores/react';
import { i18n, format } from "@/stores/locale"


export const messages = i18n('footer', {
    footer_address_title: "Наш адрес",
    footer_address: "720040, Кыргызстан, Бишкек, ул.Тыныстанова 98",
    footer_telephone: "Телефон",
    footer_email: "Электронная почта",
    menu_reports: "Документы",
    menu_projects: "Проекты",
    menu_gallery: "Галерея",
    pages_contacts: "Контакты",
    footer_company_name: "Официальный сайт Центра оценки в образовании и методов обучения",
    footer_rights: "Все права защищены © Официальный сайт Центра оценки в образовании и методов обучения",
    footer_schedule: "График работы офиса",
    footer_schedule_time: "Понедельник-пятница 9.00-17.00, обед 12.00-13.00",
    footer_schedule_time_work: "в рабочее время"
})



export default function Footer() {
    const t = useStore(messages);
    return (
        <React.Fragment>
            <footer className={classes.footer}>
                <div className={classes.row}>
                    <div className={classes.col_2}>
                        <span>{t.footer_company_name}</span>
                        <p>{t.footer_address_title}: <span>{t.footer_address}</span><br/>
                            {t.footer_telephone}: <span>(996) 312 66-48-38, 0502/0772 66-48-38 ({t.footer_schedule_time_work})</span><br/>
                            {t.footer_email}: <span>ceatm@ceatm.elcat.kg</span><br/>
                            {t.footer_schedule}: <span>{t.footer_schedule_time}</span></p>

                        <ul>
                            <li><a href="/projects">{t.menu_projects}</a></li>
                            <li><a href="/gallery">{t.menu_gallery}</a></li>
                            <li><a href="/reports">{t.menu_reports}</a></li>
                            <li><a href="/contacts">{t.pages_contacts}</a></li>
                        </ul>
                    </div>
                </div>
            </footer>

            <div className={classes.copyright}>
                <p>{t.footer_rights}</p>
            </div>
        </React.Fragment>
    )
}