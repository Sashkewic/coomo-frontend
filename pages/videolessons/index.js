import React from "react";
import Link from 'next/link';
import useSWR from 'swr';
import { MainLayout } from "@/components/MainLayout";
import PlayIcon from "@/img/play.svg";
import classes from '@/styles/videolessons.module.scss';
import { fetcher } from "@/utils/fetcher"
import { useStore } from '@nanostores/react';
import { messages } from "@/components/videolessons/translations"


export default function Videolessons() {
    const t = useStore(messages);
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, fetcher)

    if (error) return "An error has occured"
    if (!data) return "Loading"


    let elements = []

    for (let item in data) {
        elements.push(
            <div className={classes.videolesson}>
                <p>{item}</p>
                <div className={classes.choose_lang}>

                    {data[item]["Kg"] ?
                        <Link href={`/videolessons/${data[item]["Kg"]["id"]}`}><a>Кырг</a></Link> : <a className={classes.link_disabled}>Кырг</a>
                    }

                    <div className={classes.icon_block}>
                        <img src={PlayIcon.src} className={classes.play_icon} />
                    </div>

                    {data[item]["Ru"] ?
                        <Link href={`/videolessons/${data[item]["Ru"]["id"]}`}><a>Рус</a></Link> :  <a className={classes.link_disabled}>Рус</a>
                    }
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <MainLayout title={t.videolessons_title}>
                <div className={classes.videolessons_title}>
                    <h2>{t.videolessons_title}</h2>
                    <p>{t.videolessons_youtube_link1} <a href="https://www.youtube.com/channel/UCdlPy3qAGu6mPuXusTjMiMg">{t.videolessons_youtube_link2}</a>{t.videolessons_youtube_link3}</p>
                </div>

                <div className={classes.videolessons_desc}>
                    <p>{t.videolessons_subjects}</p>
                    <span><strong>{t.courses(Object.keys(data).length)}</strong></span>
                </div>

                <section className={classes.videolessons_section}>
                    {elements}
                </section>
            </MainLayout>
        </React.Fragment>
    )
}