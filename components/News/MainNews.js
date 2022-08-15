import React from "react";
import classes from "@/styles/MainNews.module.scss";
import Link from "next/link";
import ReactHtmlParser from 'react-html-parser';
import dayjs from 'dayjs';
import defaultCover from '@/img/news-cover.svg';

export default function MainNews({data}) {

    const textCut = (text) =>{
        if(text.length > 350) {
            const string = text.substring(0, 350) + "...";
            return string
        }
        return text
    };

    return (
        <div className={classes.main_news}>
            {
                data ?
                    data.map((item, i) => {
                        return (
                            <div className={classes.news_block} key={i}>
                                <div className={classes.img_block}>
                                    <img src={item.cover ? `${process.env.NEXT_PUBLIC_API_URL}${item.cover}` : defaultCover.src}/>
                                </div>
                                <div className={classes.text_block}>
                                    <span
                                        className={classes.public_date}>{dayjs(item.created).format('D/MM/YYYY')}</span>
                                    <Link href={`/news/${item.slug}`} className={classes.title}>{item.title}</Link>
                                    <p className={classes.text}>{ReactHtmlParser(textCut(item.article))}</p>
                                </div>
                            </div>
                        )
                    })
                    :
                    null
            }
        </div>
    )
}