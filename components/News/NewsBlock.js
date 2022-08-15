import React from "react";
import classes from "@/styles/MainNews.module.scss";
import Link from "next/link";
import dayjs from 'dayjs';
import defaultCover from '@/img/news-cover.svg';

export default function NewsBlock({slug, cover,  title, excerpt, created}) {
    return(
        <div className={classes.news_block}>
            <div className={classes.img_block}>
                <img src={cover ? `${process.env.NEXT_PUBLIC_API_URL}${cover}` : defaultCover.src}/>
            </div>
            <div className={classes.text_block}>
                <span className={classes.public_date}>{dayjs(created).format('D/MM/YYYY')}</span>
                <Link href={`/news/${slug}`} className={classes.title}>{title}</Link>
                <p className={classes.text}>{excerpt}</p>
            </div>
        </div>

    )
}