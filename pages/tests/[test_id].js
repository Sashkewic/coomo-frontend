import React from 'react';
import { MainLayout } from "@/components/MainLayout";
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import classes from "@/styles/test_testid.module.scss";
import DescPic from "@/img/math-pic.svg";
import WarningIcon from '@/img/warning-icon.svg';
import ReactHtmlParser from 'react-html-parser';
import { useStore } from '@nanostores/react';
import { messages } from '@/components/tests/index_translation';


export default function testDetail() {
    const t = useStore(messages)
    const router = useRouter();
    const { test_id } = router.query;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/tests/${test_id}`;
    const { data, error } = useSWR(apiUrl, fetcher);

    if (error && error.status === 404) {
        router.replace('/404')
    } else if (error) return "An error has occured"
    if (!data) return "Загружаем...";

    const languages = { 'Русский': 'Русском языке', 'Кыргызский': 'Кыргызском языке' }

    return (
        <React.Fragment>
            <MainLayout title={data.name}>
                <section className={classes.test_section}>
                    <div className={classes.test_description}>
                        <div className={classes.row}>
                            <div className={classes.col_2}>
                                <span>Тест на {languages[data.lang]}</span>
                                <h2>{data.name}</h2>
                                <p>{ReactHtmlParser(data.intro)}</p>

                                <a href={`questions/${test_id}`} className={classes.start_test}>{t.start_test_button}</a>

                                <ul>
                                    <li>{t.online_test_time_test({minutes: data.duration})}</li>
                                    <li>{t.online_test_quantity_quests}: {data.num_questions}</li>
                                </ul>
                            </div>

                            <div className={classes.col_2 + " " + classes.img}>
                                <img src={DescPic.src} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className={classes.warning}>
                        <img src={WarningIcon.src} alt="" />
                        <p> {t.extra_note1}<br />
                            {t.extra_note2}
                        </p>
                    </div>
                </section>
            </MainLayout>
        </React.Fragment>
    )
}




