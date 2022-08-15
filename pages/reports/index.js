import React from 'react';

import classes from '../../styles/reply.module.scss';
import { MainLayout } from "@/components/MainLayout";
import { ArrowFatDown } from "phosphor-react";
import useSWR from 'swr';
import {fetcher} from "@/utils/fetcher";


export default function Reports() {

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/reports`, fetcher)

    if (error) return "An error has occured"
    if (!data) return "Loading"

    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.replyContainer}>
                    <div className={classes.replyTitle}>
                        <h1>Отчеты</h1>
                    </div>
                    <div className={classes.replyContent}>
                        <ol>
                            {
                                data.reports.map((item, i) => {
                                    return <a href={`${process.env.NEXT_PUBLIC_API_URL}${item.pdf}`} target="_blank" rel="noopener noreferrer">
                                        <li key={i}>{item.title} | <span> PDF <ArrowFatDown size={22} /></span></li>
                                    </a>
                                })
                            }
                        </ol>
                    </div>
                </div>
            </MainLayout>
        </React.Fragment>
    )
}