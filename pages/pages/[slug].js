import React from 'react';
import { MainLayout } from "@/components/MainLayout";
import classes from '@/styles/singlepage.module.scss';

import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {fetcher} from '@/utils/fetcher';


export default function Abiturientam() {
    const router = useRouter()

    const { slug } = router.query;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/pages/${slug}`;
    const { data, error } = useSWR(apiUrl, fetcher);

    if (error) return "Произошла ошибка.";
    if (!data) return "Загружаем...";

    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.title}>
                    <h1>{data.title}</h1>
                </div>

               {/*
                <div className={classes.info}>
                    <p>В данном разделе Центр оценки в образовании и методов обучения предлагает подборку вспомогательных материалов по подготовке к Общереспубликанскому тестированию. Более расширенную информацию об ОРТ (отчеты, правила проведения, публикации по теме) можно получить в специализированном разделе.</p>
                </div>
                */}
                <section className={classes.content}>
                    {ReactHtmlParser(data.article)}
                </section>
            </MainLayout>
        </React.Fragment>
    )
}
