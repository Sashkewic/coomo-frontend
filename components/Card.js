import classes from '../styles/Card.module.scss';

export default function Card({name, lang, time, task, key, background}) {
    return(
        <div className={classes.card_content} key={key} style={{background}}>
            <p style={{marginTop: "0"}}>Предмет на {lang} языке</p>
            <h6>{name}</h6>
            <p>
                <span className={classes.time_on_test}>Время: {time} мин</span>
                <span className={classes.number_of_tasks}>Количество заданий: {task}</span>
            </p>
        </div>
    )
}