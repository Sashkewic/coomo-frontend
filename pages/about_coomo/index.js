import React from 'react';
import { MainLayout } from "@/components/MainLayout";
import classes from "@/styles/about_coomo.module.scss";
import Router from "next/router";
import useSWR from 'swr';
import {fetcher} from '@/utils/fetcher';
import ReactHtmlParser from 'react-html-parser';
import { useStore } from '@nanostores/react';
import { i18n, format, locale } from "@/stores/locale"



export default function aboutCoomo() {
    const langFromStore = useStore(locale);
    const { data, error } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/api/about`, langFromStore], fetcher);


    if (error && error.status === 404) {
        Router.replace('/404')
    } else if (error) return "An error has occured"
    if (!data) return "Loading"

    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.title}>
                    <h1>{data.title}</h1>
                </div>

                <section className={classes.info}>
                    {ReactHtmlParser(data.article)}
                </section>
            </MainLayout>
        </React.Fragment>
    )
}