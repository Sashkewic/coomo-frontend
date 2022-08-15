import React, { useState, useEffect } from 'react';

//swiper extra components
import { Navigation } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"

import classes from "@/styles/test.module.scss";
import Answers from "@/components/answers/Answers";
import { useRouter } from 'next/router';
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { active_questions } from "@/stores/activeQuestions";
import { MemoizedCountdown } from "@/components/tests/timer";
import { useStore } from '@nanostores/react';
import { i18n, format, locale } from "@/stores/locale"
import { messages } from '@/components/tests/index_translation';

export default function OnlineTest(props) {
    const langFromStore = useStore(locale);
    const t = useStore(messages);
    
    // let swiperDirection='horizontal';
    useEffect(() => {
        localStorage.setItem("answers", JSON.stringify({}));
        // swiperDirection = window.matchMedia("(max-width: 920px)").matches ? "vertical" : "horizontal";
    }, [])

    const router = useRouter();
    const { id } = router.query;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/tests/${id}/questions`;
    const { data, error } = useSWR(
        apiUrl,
        fetcher,
        {
            onSuccess: (data, key, config) => {
                const start = data.questions[0]['num_start']
                const end = data.questions[0]['num_end']
                active_questions.set({num_start: start, num_end: end})
            }
        }
    );

    if (error) return "Произошла ошибка.";
    if (!data) return "Загружаем...";

    function handleClick() {
        router.push('/tests/result/' + id)
    }

    const languages_test = { 'Ru': t.online_test_lang_ru, 'Kg': t.online_test_lang_kg }

    const handleSlideChange = event => {
        const start = data.questions[event.activeIndex]['num_start']
        const end = data.questions[event.activeIndex]['num_end']
        active_questions.set({num_start: start, num_end: end})
    } 
    
    return (
        <React.Fragment>
            <div className={classes.test_content}>
                <div className={classes.test_descrip}>
                    <p className={classes.test_desc}>{data.name} ({languages_test[data.lang]}). {data.part_num ? `${data.part_num} ${t.online_test_part}.` : null} {data.version ? `${data.version} ${t.online_test_version}` : null}</p>
                    <p className={classes.test_desc}>{t.online_test_quantity_quests}: {data.num_questions}</p>
                    <p className={classes.test_desc}>{t.online_test_time_test({ minutes: data.duration })}</p>
                </div>

                <div className={classes.test_slides}>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.swiper_button_prev_wrapper',
                            nextEl: '.swiper_button_next_wrapper',
                        }}
                        onSlideChange={(e) => handleSlideChange(e)}
                    >
                        {data.questions.map((item, i) => {
                            return (
                                <SwiperSlide>
                                    <div key={i} className={classes.test_task}>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/media/${item.question}`}
                                            alt="questions"
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>

                <div className={classes.prev_btn}>
                    <span className="swiper_button_prev_wrapper">
                        <i className="fas fa-chevron-left swiper_button_prev"></i>
                        Назад
                    </span>
                </div>

                <div className={classes.next_btn}>
                    <span className="swiper_button_next_wrapper">
                        Вперед
                        <i className="fas fa-chevron-right swiper_button_next"></i>
                    </span>
                </div>

                <div className={classes.test_answer}>
                    <h1>{data.name} - {t.page_title}</h1>
                    <Answers numberOfQuestions={data.num_questions} numberOfAnswers={data.num_answers} engLetters={data.eng_test} firstQuestion={data.first}/>
                </div>
                <div className={classes.show_time}>
                    <i className="fas fa-hourglass-start" />
                    <h1>{t.timing}:</h1>
                    <MemoizedCountdown duration={data.duration} test_id={data.id} />
                </div>

                <div className={classes.buttonEndTest}>
                    <button type="button" onClick={handleClick}>{t.button_text}</button>
                </div>
            </div>
        </React.Fragment>
    )
}
