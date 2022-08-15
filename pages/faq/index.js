import React, { useEffect, useState } from 'react';
import { MainLayout } from "@/components/MainLayout";
import classes from "@/styles/Faq.module.scss";
import useSWR from 'swr';
import { fetcher } from "@/utils/fetcher";
import { useStore } from '@nanostores/react';
import { i18n, format, locale } from "@/stores/locale"


export const messages = i18n('faq', {
    faq_title: "Вопрос-ответ"
})


export default function Faq() {
    const [hide, setHide] = useState(false);
    function toggle() {
        setHide(!hide);
    }

    const langFromStore = useStore(locale);
    const t = useStore(messages);
    const [result, setResult] = useState([]);
    const [search, setActiveSearch] = useState(false);

    const { data, error } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/api/faq`, langFromStore], fetcher)

    if (error) return "An error has occured"
    if (!data) return "Loading"

    const Accordion = ({ title, content }) => {
        const [isActive, setIsActive] = useState(false);

        return (
            <div className={classes.accordion_item}>
                <div className={classes.accordion_item_header} onClick={() => setIsActive(!isActive)}>
                    {title}
                </div>

                {isActive && <div className={classes.accordion_item_content}>{content}</div>}
            </div>
        );
    };

    const handleChange = (event) => {
        const search = event.target.value;

        const results = data.filter(item => {
            return item.question.toLowerCase().includes(search) || item.answer.toLowerCase().includes(search)
        })

        setResult(results);
        setActiveSearch(true);
    }


    const elements = []

    if (search) { // если идет поиск, то выходят результаты, подходящие под const results c data.filter
        elements.push(...result.map(({ id, question, answer }) => (
            <Accordion title={question} content={answer} />)
        ))
    }

    else { // если не идет поиск, то выходит все содержимое
        elements.push(...data.map(({ id, question, answer }) => (
            <Accordion title={question} content={answer} />)
        ))
    }

    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.faq_desc}>
                    <h3>{t.faq_title}</h3>
                    {/* <input type="search" placeholder="Введите ключевое слово или фразу для поиска" onChange={handleChange} /> */}
                </div>

                <section className={classes.accordion_section}>
                    {elements.length ? elements : <span>Ничего не найдено</span>}
                </section>

                <section className={classes.question_section} style={{display: hide ? "none" : "flex"}}>
                    <h2>Была ли информация полезной?</h2>
                    <div className={classes.btns}>
                        <button className={classes.btn + " " + classes.yes} onClick={toggle}>Да</button>
                        <button className={classes.btn + " " + classes.no} onClick={toggle}>Нет</button>
                    </div>
                </section>
            </MainLayout>
        </React.Fragment>
    )
}
