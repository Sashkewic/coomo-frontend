import React from 'react';
import Link from 'next/link';
import { MainLayout } from "@/components/MainLayout";
import classes from '@/styles/gallery.module.scss';
import useSWR from 'swr';
import { useStore } from '@nanostores/react';
import { messages } from "@/components/galleries/translations"
import { fetcher } from "@/utils/fetcher"


export default function Gallery() {
    const t = useStore(messages);
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/galleries`, fetcher)

    if (error) return "An error has occured"
    if (!data) return "Loading"


    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.gallery_title}>
                    <h2>Галерея</h2>
                </div>

                <div className={classes.gallery_desc}>
                    <p>{t.page_title}</p>
                    <span>{t.galleries(data.results.length)}</span>
                </div>

                <section className={classes.fotoalbums}>
                    <div className={classes.row}>
                        {data.results.map((gallery, i) => {
                            return (
                                <Link href={`/gallery/${gallery.id}`}>
                                    <div className={classes.album} key={i}>
                                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/media/${gallery.cover}`} className={classes.poster} />
                                        <p>{gallery.title}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    <div className={classes.see_more_fotoalbums}>
                        <button className={classes.load_fotoalbums}><i className="fas fa-sync"></i>{t.more}</button>
                    </div>
                </section>
            </MainLayout>
        </React.Fragment >
    )
}