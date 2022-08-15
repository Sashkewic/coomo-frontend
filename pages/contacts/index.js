import React,{useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MainLayout } from "@/components/MainLayout";
import classes from "@/styles/contacts.module.scss";

import MapIcon from "@/img/map-icon.png";
import PhoneIcon from "@/img/phone-icon.png";
import LetterIcon from "@/img/letter-icon.png";
import FacebookIcon from "@/img/facebook-icon.png";
import YoutubeIcon from "@/img/youtube-icon.png";
import InstagramIcon from "@/img/instagram-icon.png";
import ClockIcon from "@/img/clock-icon.png";
import { useStore } from '@nanostores/react';
import { i18n } from "@/stores/locale";
import twogis from "@/components/contacts/twogis";

export const messages = i18n("contacts_page", {
    page_title: "Контакты",
    address_title: "Наш адрес",
    address: "720040, Кыргызстан, Бишкек, ул.Тыныстанова 98",
    telephone: "Телефон",
    email: "Электронная почта",
    schedule: "График работы офиса",
    schedule_time: "Понедельник-пятница 9.00-17.00, обед 12.00-13.00",
    schedule_time_work: "в рабочее время"
})


export default function Contacts() {
    const t = useStore(messages);

    useEffect(() => {
        if(typeof twogis !== 'undefined'){
            twogis();
            new DGWidgetLoader({"width":"100%","height":600,"borderColor":"#a3a3a3","pos":{"lat":42.871718262613314,"lon":74.60871219635011,"zoom":16},"opt":{"city":"bishkek"},"org":[{"id":"70000001019363610"}]})
        }
    }, [])
  
    return (
        <React.Fragment>
            <MainLayout>
                <div className={classes.title}>
                    <h1>{t.page_title}</h1>
                </div>

                <section className={classes.location_block}>
                    <div className={classes.text_location}>
                        <div className={classes.address}>
                            <div className={classes.icon}>
                                <img src={MapIcon.src} alt=""/>
                            </div>

                            <div className={classes.text}>
                                <span>{t.address_title}:</span>
                                <p>{t.address}</p>
                            </div>
                        </div>

                        <div className={classes.phone}>
                            <div className={classes.icon}>
                                <img src={PhoneIcon.src} alt=""/>
                            </div>

                            <div className={classes.text}>
                                <span>{t.telephone}:</span>
                                <p>+996 (312) 66-48-38, 0502/0772 66-48-38 ({t.schedule_time_work})</p>
                            </div>
                        </div>

                        <div className={classes.email}>
                            <div className={classes.icon}>
                                <img src={LetterIcon.src} alt=""/>
                            </div>

                            <div className={classes.text}>
                                <span>{t.email}:</span>
                                <p>ceatm@ceatm.elcat.kg</p>
                            </div>
                        </div>

                        <div className={classes.time_work}>
                            <div className={classes.icon}>
                                <img src={ClockIcon.src} alt=""/>
                            </div>

                            <div className={classes.text}>
                                <span>{t.schedule}:</span>
                                <p>{t.schedule_time}</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.map_location}>
                        <a className="dg-widget-link" href={`http://2gis.kg/bishkek/firm/70000001019363610/center/74.60871219635011,42.871718262613314/zoom/16?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=bigMap`}>
                        Посмотреть на карте Бишкека
                        </a>
                        <div className="dg-widget-link">
                            <a href={`http://2gis.kg/bishkek/firm/70000001019363610/photos/70000001019363610/center/74.60871219635011,42.871718262613314/zoom/17?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=photos`}>
                                Фотографии компании
                            </a>
                        </div>
                        <div className="dg-widget-link">
                            <a href={`http://2gis.kg/bishkek/center/74.608716,42.871422/zoom/16/routeTab/rsType/bus/to/74.608716,42.871422╎Центр оценки в образовании и методов обучения?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=route`}>
                                Найти проезд до Центр оценки в образовании и методов обучения
                            </a>
                        </div>
                        <div id="2gismap"></div>
                    </div>
                </section>

                <section className={classes.social_sites}>
                    <div className={classes.social_sites_text}>
                        <h2>Мы в соцсетях:</h2>
                    </div>

                    <div className={classes.social_sites_icons}>
                        <a href="https://www.facebook.com/testing.kg/"><img src={FacebookIcon.src} alt=""/></a>
                        <a href="https://www.youtube.com/channel/UCdlPy3qAGu6mPuXusTjMiMg"><img src={YoutubeIcon.src} alt=""/></a>
                        <a href="https://www.instagram.com/ort_ceatm_official/"><img src={InstagramIcon.src} alt=""/></a>
                    </div>
                </section>
            </MainLayout>
        </React.Fragment>
    )
}
