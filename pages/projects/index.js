import {MainLayout} from "@/components/MainLayout";
import classes from "@/styles/projects.module.scss";
import Link from 'next/link';

import { fetcher } from '@/utils/fetcher';
import useSWRInfinite from 'swr/infinite';
import { useStore } from '@nanostores/react';
import { i18n, format, locale } from "@/stores/locale"


export const messages = i18n("projects_page", {
    page_title: "Проекты",
    more: "ещё"
})


export default function Projects() {
    const langFromStore = useStore(locale);
    const t = useStore(messages);
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        index =>
            `${process.env.NEXT_PUBLIC_API_URL}/api/projects?p=${index + 1}`,
        fetcher
    );

    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.results?.length < 10);

    if (!data) return "Loading"

    return(
        <MainLayout>
            <div className={classes.projectsContainer}>
                <div className={classes.projectsTitle}>
                    <h1>{t.page_title}</h1>
                </div>
                <div className={classes.projectsContent}>
                    {
                        data.map((projects, i) =>{
                            return projects.results.map((item, j) => {
                                return(
                                    <Link href={`/news/${item.slug}`}>
                                      <div className={classes.projectBlock} key={i}>
                                          <div className={classes.projectTitle}>
                                              <h1>{item.title}</h1>
                                          </div>
                                          <div className={classes.projectContent}>
                                              <img src={`${process.env.NEXT_PUBLIC_API_URL}${item.cover}`} alt=""/>
                                              <div className={classes.projectDesc}>
                                                  <p>{item.excerpt}</p>
                                              </div>
                                          </div>
                                      </div>
                                    </Link>
                                )
                          })
                        })
                    }
                </div>
                <div className={classes.read_more_news}>
                    {   !isReachingEnd &&
                        <button className={classes.more_news} onClick={() => setSize(size + 1)} ><i className="fas fa-sync"></i>{t.more}</button>
                    }
                </div>
            </div>
        </MainLayout>
    )
}
