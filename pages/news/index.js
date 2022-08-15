import React from 'react';
import { MainLayout } from "@/components/MainLayout";
import classes from '@/styles/newspage.module.scss';
import NewsBlock from "@/components/News/NewsBlock";
import useSWRInfinite from 'swr/infinite';

// Для вторичных новостей
import 'react-tabs/style/react-tabs.css';
import SecondaryNews from '@/components/News/SecondaryNews';
import {fetcher} from '@/utils/fetcher';
import { useStore } from '@nanostores/react';
import { i18n, locale } from "@/stores/locale";


export const messages = i18n('news_page', {
  page_title: "Новости",
})



export default function News() {
    const langFromStore = useStore(locale);
    const t = useStore(messages);
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        index =>
            [`${process.env.NEXT_PUBLIC_API_URL}/api/news?p=${index + 1}`, langFromStore],
        fetcher
    );

    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.results?.length < 10);

    if (!data) return "Loading"


    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.news_title}>
                    <h1>{t.page_title}</h1>
                </div>
                <section className={classes.news}>
                    <div className={classes.main_news}>
                        {
                            data.map((news, k) => {
                                return news.results.map((item, j) => {
                                    return (
                                        <NewsBlock key={j}
                                            cover={item.cover}
                                            slug={item.slug}
                                            title={item.title}
                                            created={item.created}
                                            excerpt={item.excerpt}
                                        />
                                    )
                                })
                            })
                        }
                        <div className={classes.read_more_news}>
                            <button className={classes.more_news} onClick={() => setSize(size + 1)} disabled={isReachingEnd}><i className="fas fa-sync"></i>Еще новости</button>
                        </div>
                    </div>
                    <SecondaryNews />
                </section>
            </MainLayout>
        </React.Fragment>
    )
}

