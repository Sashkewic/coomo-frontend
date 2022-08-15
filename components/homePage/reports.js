import React, {useState} from 'react';
import Slider from 'react-slick';

import classes from '@/styles/docs.module.scss';

import iconPDF from '@/img/pdf-icon.svg';
import {ArrowLeft, ArrowRight} from "phosphor-react";
import Link from "next/link";
import { useStore } from '@nanostores/react';
import { i18n, format, locale } from "@/stores/locale"


export const messages = i18n("reports_block", {
    reports_block_name: "Объявления",
    reports_block_text: "В данном разделе отображаются важные объявления и документы"
})

class SampleNextArrow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div
                className={this.props.className}
                onClick={this.props.onClick}
            > <i className="fas fa-arrow-right"></i></div> )
    }

}

class SamplePrevArrow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div
                className={this.props.className}
                onClick={this.props.onClick}
            ><i className="fas fa-arrow-left"></i> </div>)
    }
}

export function ReportsBlock({docs}) {
    const langFromStore = useStore(locale);
    const t = useStore(messages);
    const [nav1, setNav1] = useState();
    const nextButton = React.createRef();
    const prevButton = React.createRef();

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 580,
                settings: {
                    className: classes.slider580,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                }
            },
        ],
        nextArrow: nextButton.current,
        prevArrow: prevButton.current,
    };

    const textCut = (text) =>{
        if(text.length > 100) {
            const string = text.substring(0, 100) + "...";
            return string
        }
        return text
    };

    return (
        <section className={classes.docs}>
            <div className={classes.docsArrow}>
                <SamplePrevArrow ref={prevButton} onClick={nav1 && nav1.slickPrev}/>
                <SampleNextArrow ref={nextButton} onClick={nav1 && nav1.slickNext}/>
            </div>
            <div className={classes.row}>
                <div className={classes.col_2}>
                    <h4>{t.reports_block_name}</h4>
                    <p>{t.reports_block_text}</p>
                </div>

                <div className={classes.slider}>
                        <Slider ref={c => (setNav1(c))} {...settings}>
                            {
                                docs.map((item, i) =>{
                                    return(
                                        <Link href={`${process.env.NEXT_PUBLIC_API_URL}${item.pdf}`}>
                                            <div key={i} className={classes.swiper_slide}>
                                                <img src={iconPDF.src} alt=""/>
                                                <p>{textCut(item.title)}</p>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </Slider>
                </div>
            </div>
        </section>
    )
}
