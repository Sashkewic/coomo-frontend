import React, {useEffect, useState} from 'react';
import Answers from "@/components/answers/Answers";
import classes from "@/styles/result.module.scss";
import { zeroPad } from 'react-countdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from "swr";
import {fetcher} from "@/utils/fetcher";
import convertMiliseconds from "@/utils/time";
import { useStore } from '@nanostores/react';
import { i18n } from "@/stores/locale"

export const messages = i18n('online_test_results', {
    right_answers: "Правильные ответы",
    online_test_results_complete_test: "Результат выполнения теста",
    online_test_is_right: "Правильно",
    online_test_is_wrong: "Неправильно",
    online_test_elapsed_time: "Время выполнения теста",
    online_test_button_show_is_right_answers: "Для просмотра правильных ответов, решений к заданиям нажмите сюда",
    online_test_button_on_home: "На главную",
    online_test_button_repeat_test: "Повторить тест",
    online_test_button_select_subj: "Выбрать предмет"
})

export default function Result({name, time}) {
    const t = useStore(messages);
    const router = useRouter();
    const { id } = router.query;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/tests/${id}/answers`;
    const [userAnswers, setUserAnswers] = useState({});
    const [timeSpent, setTimeSpent] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem("answers");
        const ans = JSON.parse(saved);
        setUserAnswers(ans);

        setTimeSpent(JSON.parse(localStorage.getItem("time")).total)
    }, [])

    
    const { data, error } = useSWR(
        apiUrl,
        fetcher
    );
    if (error) return "Произошла ошибка.";
    if (!data) return "Загружаем...";
    
    let correct = 0
    let wrong = Object.keys(data.answers).length
    if (userAnswers) {
        for (let k of Object.keys(userAnswers)) {
            if (data.answers[k] === userAnswers[k]){
                correct += 1
                wrong -= 1
            }  
        }

    }

    const numberOfAnsweredQs = Object.keys(data.answers).length;
    const correctRatio = numberOfAnsweredQs > 0 ?  Math.round((correct/numberOfAnsweredQs)*100) : 0;
    const wrongRatio =  numberOfAnsweredQs > 0 ? Math.round((wrong/numberOfAnsweredQs)*100) : 0;

    let timespent = 0;
    if (timeSpent) {
        timespent = (data.test.duration * 60000) - timeSpent;
        timespent = convertMiliseconds(timespent)
    }


    return(
        <React.Fragment>
            <div className={classes.rangeResult}>
                <div className={classes.title}>
                    <p>{t.online_test_results_complete_test} <h1>{data.test.name}</h1></p>
                </div>
                <div className={classes.range}>
                    <div className={classes.diagrama}>
                        <div className={classes.green} style={{width: correctRatio+'%'}}>

                        </div>
                        <div className={classes.red} style={{width: wrongRatio+'%'}}>

                        </div>
                    </div>
                    <div className={classes.text_answer}>
                        <div className={classes.right}>
                            <p>{t.online_test_is_right}</p>
                            <h3>{correct} из {Object.keys(data.answers).length} ({correctRatio}%)</h3>
                        </div>
                        <div className={classes.wrong}>
                            <p>{t.online_test_is_wrong}</p>
                            <h3>{wrong} из {Object.keys(data.answers).length} ({wrongRatio}%)</h3>
                        </div>
                    </div>
                </div>
                <div className={classes.time}>
                    <p>{t.online_test_elapsed_time}</p>
                    <h1>{zeroPad(timespent['h'])}:{zeroPad(timespent['m'])}:{zeroPad(timespent['s'])}</h1>
                </div>
                {/* <div className={classes.help}>
                    <p>{t.online_test_button_show_is_right_answers}</p>
                </div> */}
                <div className={classes.test_answer}>
                    <h1>{data.test.name}. {t.right_answers}</h1>
                    <Answers numberOfQuestions={data.test.num_questions} numberOfAnswers={data.test.num_answers} correctAnswers={data.answers} engLetters={data.test.eng_test} firstQuestion={data.test.first} userAnswers={userAnswers} />
                </div>
                <div className={classes.buttons}>
                    <Link href='/'><button>{t.online_test_button_on_home}</button></Link>
                    <Link href={`/tests/questions/${id}`}><button>{t.online_test_button_repeat_test}</button></Link>
                    <Link href={`/tests`}><button>{t.online_test_button_select_subj}</button></Link>
                </div>
            </div>
        </React.Fragment>
    )
}
