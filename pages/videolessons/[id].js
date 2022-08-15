import React from 'react';
import { MainLayout } from "@/components/MainLayout";
import classes from '@/styles/VideolessonsItem.module.scss';
import useSWR from 'swr';
import { useRouter } from 'next/router'
import { fetcher } from "@/utils/fetcher"
import { i18n } from "@/stores/locale"
import { useStore } from '@nanostores/react';

export const messages = i18n('videolesson', {
    videolesson_title: "Видеоуроки",
})


export default function SubjectVideolessons() {
    const t = useStore(messages);
    const router = useRouter()
    const { id } = router.query

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`, fetcher)

    if (error) return "An error has occured"
    if (!data) return "Loading"


    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.videolessons_title}>
                    <h2>{t.videolesson_title}</h2>
                </div>

                <div className={classes.videolessons_desc}>
                    <p>{data.name} ({data.lang})</p>
                    <span><strong>{data.videos.length}</strong> видео</span>
                </div>

                <section className={classes.videolessons}>
                    <div className={classes.row}>
                        {
                            data.videos.map((item, i) => {
                                return (
                                    <div className={classes.col_2} key={i}>
                                        <iframe width="540" height="303" src={item.video_link.replace('watch?v=', 'embed/')} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </MainLayout>
        </React.Fragment>
    )
}