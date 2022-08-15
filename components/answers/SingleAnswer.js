import React, {useEffect, useState} from 'react';
import { useStore } from '@nanostores/react';
import { active_questions } from "@/stores/activeQuestions";


export default function SingleAnswer({number, col, row, numberOfAnswers, saveAnswers, correctAnswer, userAnswer}) {
    const [answers, setAnswers] = useState([])
    const [numberOfClicks, setNumberOfClicks] = useState(0)
    const [ansDisabled, setAnsDisabled] = useState(null)
    const active_questions_numbers = useStore(active_questions)

    useEffect(() => {
        if ( number >= active_questions_numbers['num_start'] && number <= active_questions_numbers['num_end']) {
            setAnsDisabled(null)
        } else {
            setAnsDisabled('disabled')
        }
    }, [active_questions_numbers])

    useEffect(() => {
        if (numberOfClicks > 1) {
            setAnsDisabled('disabled')
        }
    }, [numberOfClicks])

    useEffect(() => {
        if (correctAnswer) {
            setAnsDisabled('disabled')
        }
    }, [correctAnswer])


    function handleClick(e) {
        document.querySelectorAll(".active[name='answer-" + number+"']").forEach( el =>{
            el.classList.remove("active");
            el.classList.add("active_wrong_mark");
        });
        e.target.classList.add("active")
        setAnswers([...answers, e.target.value])
        setNumberOfClicks(numberOfClicks + 1)
        saveAnswers({[number]: e.target.value})
    }

    console.log("Qnumber: ",number," Correct:", correctAnswer," UserAns:", userAnswer);
    const answerLetters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж'].slice(0, numberOfAnswers)
    const inputs = answerLetters.map((letter) => {
        let classes = '';
        // если вариант ответа неверный, он показывается красным кругом
        if (correctAnswer === letter){
            classes = 'green';
        }
        // если вариант ответа верный, он показывается зеленым кругом
        else if (letter === userAnswer) {
            classes = 'red';
        }
        // если эта буква была первой в ответе данного задания, становится синим кругом
        if (answers?.[0] === letter) {
            classes = 'first_click';
        }
        // если эта буква была второй в ответе в данного задания (исправленный ответ), становится синим квадратом
        else if (answers?.[1] === letter) {
            classes = 'second_click';
        }
        // else {
        //     return <input type="radio" value={letter} name={`answer-${number}`} onClick={handleClick} disabled={ansDisabled}/>}
        return <input className={classes} type="radio" value={letter} name={`answer-${number}`} onClick={handleClick} disabled={ansDisabled}/>
    })
    return(
        <div className={`answers column-${col} row-${row}`}>
            <span className="number">{number}</span>
            {inputs}
        </div>
    )
   
}
