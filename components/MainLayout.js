import React from 'react';
import Head from 'next/head';
import NavBar from "./NavBar";
import Header from "./Header";
import classes from '@/styles/MainLayout.module.scss';
import Footer from "./Footer";


export function MainLayout({children, title = "ЦООМО"}) {
    return (
        <React.Fragment>
            <Head>
                <meta charSet="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{title} | Testing.kg</title>
            </Head>
            <div className={classes.header_content}>
                <Header/>
                <NavBar/>
            </div>
            <main className={classes.main}>
                {children}
            </main>
            <div>
                <Footer/>
            </div>
        </React.Fragment>
    )
}
