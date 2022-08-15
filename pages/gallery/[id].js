import React from 'react';
import { MainLayout } from "@/components/MainLayout";
import classes from '@/styles/gallery.module.scss';
import useSWR from 'swr';
import { useRouter } from 'next/router';


//Функция склонения слов 
function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

//Получение JSON
const fetcher = url =>
    fetch(url).then(res => res.json());

export default function Album() {

    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/galleries/${id}`, fetcher);

    if (error) return "An error has occured"
    if (!data) return "Loading"

    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.fotoalbum_title}>
                    <h2>Фотоальбомы</h2>
                </div>

                <div className={classes.fotoalbum_desc}>
                    <p>{data.title}</p>
                    <span>{data.photos_gallery.length} фото</span>
                </div>

                <section className={classes.fotos}>
                    <div className={classes.row}>
                        {data.photos_gallery.map((album, i) => {
                            return (
                                <div className={classes.foto} key={i}>
                                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/media/${album.photo}`} alt="" className={classes.album_foto}/>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </MainLayout>
        </React.Fragment>
    )
}