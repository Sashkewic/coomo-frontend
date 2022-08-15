import React, {useState} from "react";
import Link from 'next/link';
import { MainLayout } from "@/components/MainLayout";
import classes from '@/styles/searchresults.module.scss';
import { useRouter } from 'next/router';
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useStore } from '@nanostores/react';
import { messages } from "@/components/searchResults/translation"

//Функция склонения слов 
function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

export default function SearchResults() {
    const t = useStore(messages);
    const [typeFilter, setTypeFilter] = useState('')
    const router = useRouter();
    const { q } = router.query;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/search?query=${q}`;
    const { data, error } = useSWR(apiUrl, fetcher);

    if (error) return "Произошла ошибка.";
    if (!data) return "Загружаем...";

    const handleSelectType = (e) => {
        setTypeFilter(e.target.value)
    }

    let numberOfResults = 0
    for (let kk of Object.keys(data)){
        numberOfResults += data[kk].length  
    }

    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.search_desc}>
                    <h3>{t.search_results_title}</h3>
                  {/*<form action="">
                        <i className="fas fa-search"></i>
                        <input type="search" placeholder="Введите ключевое слово или фразу для поиска" formMethod="GET" />
                    </form>*/}
                </div>

                <section className={classes.section_results}>
                    <div className={classes.filter_search}>
                      <div className={classes.result}>
                        <p>{t.search_results_found_items_before} <strong>“{q}”</strong> {t.search_results_found_items_after(numberOfResults)}</p>
                        </div>

                        <div className={classes.select_filter}>
                            <p>{t.search_results_sorting}: </p>

                            <select name="format" className={classes.format} onChange={handleSelectType}>
                                <option value="" className={classes.option}>{t.search_results_sorting_all}</option>
                                <option value="news" className={classes.option}>{t.search_results_sorting_news}</option>
                                <option value="tests" className={classes.option}>{t.search_results_sorting_tests}</option>
                                <option value="courses" className={classes.option}>{t.search_results_sorting_courses}</option>
                            </select>
                        </div>
                    </div>

                    {
                      (typeFilter === 'news' || typeFilter === '') &&
                        data.news.map((item, i) => {
                          return (
                              <div className={classes.results} key={i}>
                                  <p>{item.id}. {item.title}</p>
                                <Link href={`/news/${item.slug}`}><a>{item.excerpt}</a></Link>
                              </div>
                          )
                      })
                    }
                    {
                      (typeFilter === 'tests' || typeFilter === '') &&
                        data.tests.map((item, i) => {
                            return (
                                <div className={classes.results} key={i}>
                                   <Link href={`/tests/${item.id}`}><p>{item.id}. {item.name}</p></Link>
                                </div>
                            )
                      })
                    }
                    {
                      (typeFilter === 'courses' || typeFilter === '') &&
                        data.courses.map((item, i) => {
                            return (
                                <div className={classes.results} key={i}>
                                    <p>{item.id}. {item.name}</p>
                                    <Link href={`/videolessons/${item.id}`}><a>{item.description}</a></Link>
                                </div>
                            )
                      })
                    }
                </section>
            </MainLayout>
        </React.Fragment>
    )
}
