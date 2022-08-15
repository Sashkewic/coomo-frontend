import React from 'react';
import classes from "@/styles/SecondaryNews.module.scss";
import defaultCover from '@/img/news-cover.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useSWR from 'swr';
import Link from "next/link";
import dayjs from 'dayjs';
import { fetcher } from '@/utils/fetcher';
import { textCut } from '@/utils/textcut';

import { useStore } from '@nanostores/react';
import { i18n, format } from "@/stores/locale"


export const messages = i18n('secondary_news', {
    news_important: "Важное"
})


export default function SecondaryNews() {
    const t = useStore(messages);
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, fetcher)

    if (error) return "An error has occured"
    if (!data) return "Loading"

    return (
        <div className={classes.secondary_news}>
            <Tabs>
                <TabList>
                    <Tab>{t.news_important}</Tab>
                </TabList>

                <TabPanel>
                    {data.important_news.title &&
                        <Link href={`/news/${data.important_news.slug}`}>
                            <div className={classes.news}>
                                <img
                                    src={data.important_news.cover ? `${process.env.NEXT_PUBLIC_API_URL}${data.important_news.cover}` : defaultCover.src}
                                    alt="" />
                                <span className={classes.public_date}>{dayjs(data.important_news.created).format('D/MM/YYYY')}</span>
                                <h6 className={classes.news_title}>{data.important_news.title}</h6>
                                <p className={classes.text_news}>{textCut(data.important_news.excerpt, 70)}</p>
                            </div>
                        </Link>
                    }
                </TabPanel>
            </Tabs>
        </div>
    )
}