import React from 'react';
import { MainLayout } from "@/components/MainLayout";
import useSWR from 'swr';
import ReactHtmlParser from 'react-html-parser';

import classes from "@/styles/news_id.module.scss";
import SecondaryNews from '@/components/News/SecondaryNews';
import { useRouter } from "next/router";
import dayjs from 'dayjs';
import NewsBlock from '@/components/News/NewsBlock';
import {fetcher} from '@/utils/fetcher';
import { useStore } from '@nanostores/react';
import { locale } from "@/stores/locale"


export default function NewsId({ }) {
    const langFromStore = useStore(locale);
    const router = useRouter();
    const { slug } = router.query;

    const { data, error } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/api/news/${slug}`, langFromStore], fetcher);

    if (error && error.status === 404) {
        router.replace('/404')
    } else if (error) return "An error has occured"
    if (!data) return "Loading"

    return (
        <React.Fragment>
            <MainLayout>
                <section className={classes.news_section}>
                    <div className={classes.news}>
                        <div className={classes.news_image}>
                            {
                                data.current_news.cover && 
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}${data.current_news.cover}`} />
                            }
                          
                            <h1 style={data.current_news.cover ? {position: "absolute"} : {position: "relative"}}>{data.current_news.title}</h1>
                        </div>

                        <div className={classes.news_info}>
                            <div className={classes.news_public_date}>
                                <span>{dayjs(data.current_news.created).format('D/MM/YYYY')} {data.current_news.updated ? '(обновлено ' + dayjs(data.current_news.updated).format('D/MM/YYYY') + ')' : null}</span>
                            </div>
                        </div>
                    </div>

                    <div className={classes.news_text}>
                        {ReactHtmlParser(data.current_news.article)}
                    </div>

                    <div className={classes.news_block}>
                        <div className={classes.read_other_news}>
                            <p className={classes.read_title}>Читайте также</p>
                            {data.related.map((item, i) => {
                                return <NewsBlock key={i} {...item}/>
                            })}
                        </div>

                        <SecondaryNews />
                    </div>
                </section>
            </MainLayout>
        </React.Fragment>
    )
}
