import React, { useState } from 'react';
import classes from '@/styles/homePageNewsList.module.scss';
import defaultCover from '@/img/news-cover.svg';
// import moment from "moment";
import Link from "next/link";
import { useStore } from '@nanostores/react';
import { i18n } from "@/stores/locale"
import dayjs from 'dayjs';
import { textCut } from '@/utils/textcut';

export const messages = i18n('home_news_block', {
    menu_news: "Новости",
    news_important: "Важное"
})


export function HomeNewsList({ important_news, last_news }) {
    const t = useStore(messages);

    return (
        <React.Fragment>

            <section className={classes.news_section}>
                <h2 className={classes.newstitle}>{t.menu_news}</h2>
                <h2 className={classes.important}>{t.news_important}</h2>
                {
                    last_news.map((item, i) => {
                        return (
                            <Link href={`/news/${item.slug}`}>
                                <div key={i} className={classes.news}>
                                    <img
                                        src={item.cover ? `${process.env.NEXT_PUBLIC_API_URL}${item.cover}` : defaultCover.src}
                                        alt="" />
                                    <p className={classes.public_date}>{dayjs(item.created).format('D/MM/YYYY')}</p>
                                    <h6 className={classes.news_title}>{item.title}</h6>
                                    <p className={classes.text_news}>{textCut(item.excerpt, 70)}</p>
                                </div>
                            </Link>
                        )
                    })
                }

                <Link href={`/news/${important_news.slug}`}>
                    <div className={classes.news}>
                        <img
                            src={important_news.cover ? `${process.env.NEXT_PUBLIC_API_URL}${important_news.cover}` : defaultCover.src}
                            alt="" />
                        {/* <p className={classes.public_date}>{moment(important_news.created).format('D/MM/YYYY')}</p> */}
                        <p className={classes.public_date}>{dayjs(important_news.created).format('D/MM/YYYY')}</p>
                        <h6 className={classes.news_title}>{important_news.title}</h6>
                        <p className={classes.text_news}>{textCut(important_news.excerpt, 70)}</p>
                    </div>
                </Link>
            </section>
        </React.Fragment>
    )
}
