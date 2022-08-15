import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/components/MainLayout";
import Image from 'next/image';

import { Navigation } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"

import classes from '@/styles/homePage.module.scss';
import useSWR from "swr";

import { BottomMenu } from "@/components/homePage/bottomMenu";
import { HomeNewsList } from "@/components/homePage/homeNewsList";
import { ReportsBlock } from "@/components/homePage/reports";
import { StaticBlock } from "@/components/homePage/staticBlock";
import { CaretLeft, CaretRight } from "phosphor-react";
import { textCut } from '@/utils/textcut';
import { fetcher } from '@/utils/fetcher';
import { useRouter } from 'next/router';
import Link from "next/link";
import { useStore } from '@nanostores/react';
import { i18n, format, locale } from "@/stores/locale"


export const messages = i18n('home_page', {
  home_page_title: "Главная",
  menu_online_test: "Онлайн тест",
  menu_videolessons: "Видеоуроки",
  menu_news: "Новости",
  menu_reports: "Отчёты", 
  menu_faq: "Вопрос-ответ",
})


export default function Index() {
    const langFromStore = useStore(locale);
    const t = useStore(messages);
    const router = useRouter();
    const { data, error } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/api/home`, langFromStore], fetcher);
    
    if (error) return "An error has occured";
    if (!data) return "Loading";
    
    let littleRibbon = null
    if (data.menu.filter((item) => item.position === 'banner').length > 0) {
        const lnk = data.menu.filter((item) => item.position === 'banner')[0]
        littleRibbon = <Link href={lnk.link}><a>{lnk.title}</a></Link>
    }

    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.content} style={{ marginTop: "10px", overflowX: "hidden" }}>
                    <div className={classes.col_2 + " " + classes.sidebar_menu}>
                        <div className={classes.sidebar}>
                            <a href='/tests'>
                                <div className={classes.sideBarItem}>
                                    <div className={classes.sideBarIcon}><i class="fas fa-sign-in-alt"></i></div>
                                    <div className={classes.sideBarTitle}><p>{t.menu_online_test}</p></div>
                                </div>
                            </a>

                            <a href='/videolessons'>
                                <div className={classes.sideBarItem}>
                                    <div className={classes.sideBarIcon}><i class="fas fa-cubes"></i></div>
                                    <div className={classes.sideBarTitle}><p>{t.menu_videolessons}</p></div>
                                </div>
                            </a>

                            {
                                // фильтр меню для позиции left
                                data.menu.filter((item) => item.position === 'left').map((item, i) => {
                                    return (
                                        <a href={`/pages/${item.page_slug}`}>
                                            <div key={i} className={classes.sideBarItem}>
                                                <div className={classes.sideBarIcon} dangerouslySetInnerHTML={{ __html: item.icon}}></div>
                                                <div className={classes.sideBarTitle}><p>{item.title}</p></div>
                                            </div>
                                        </a>
                                    )
                                })
                            }

                            <a href='/news'>
                                <div className={classes.sideBarItem}>
                                    <div className={classes.sideBarIcon}><i class="far fa-newspaper"></i></div>
                                    <div className={classes.sideBarTitle}><p>{t.menu_news}</p></div>
                                </div>
                            </a>

                            <a href='/reports'>
                                <div className={classes.sideBarItem}>
                                    <div className={classes.sideBarIcon}><i class="fas fa-scroll"></i></div>
                                    <div className={classes.sideBarTitle}><p>{t.menu_reports}</p></div>
                                </div>
                            </a>

                            <a href='/faq'>
                                <div className={classes.sideBarItem}>
                                    <div className={classes.sideBarIcon}><i class="far fa-question-circle"></i></div>
                                    <div className={classes.sideBarTitle}><p>{t.menu_faq}</p></div>
                                </div>
                            </a>


                        </div>

                    </div>

                    <div className={classes.col_2 + " " + classes.slider_block}>
                        <div className={classes.swiper}>
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={50}
                                slidesPerView={1}
                                navigation={{
                                    prevEl: '.swiper_button_prev',
                                    nextEl: '.swiper_button_next',
                                }}
                            >
                                {data.banners.map((item, i) => {
                                    return (
                                        <div className={classes.slider} key={i}>

                                            <SwiperSlide>
                                                {littleRibbon}
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.cover}`}
                                                    style={{ width: '100%', height: "auto", objectFit: "cover", cursor: "pointer" }}
                                                    alt="banners"
                                                    onClick={() => router.push(`/news/${item.slug}`)}/>
                                                <div
                                                    className={classes.textSlider}>
                                                    {textCut(item.title, 80)}

                                                    <div className={`${classes.swiper_button_prev} swiper_button_prev`}>
                                                        <CaretLeft size={20} />
                                                    </div>

                                                    <span className={classes.qwerty}></span>

                                                    <div className={`${classes.swiper_button_next} swiper_button_next`}>
                                                        <CaretRight size={20} />
                                                    </div>
                                                </div>
                                            </SwiperSlide>

                                        </div>)
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
                {/* блок меню с позицией bottom */}
                <BottomMenu links={data.menu.filter((item) => item.position === 'bottom')} />
                {/*список новостей, включая важную.*/}
                <HomeNewsList important_news={data.important_news} last_news={data.last_eight_news} />
                <ReportsBlock docs={data.reports} />
                <StaticBlock />
            </MainLayout>
        </React.Fragment>
    )
}
