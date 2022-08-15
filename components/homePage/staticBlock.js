import React, {useState} from 'react';

import classes from "@/styles/static.module.scss";
import { useStore } from '@nanostores/react';
import { i18n, format, locale } from "@/stores/locale"


export const messages = i18n("statistics_block",{
    statistics_block_title: "Количество абитуриентов 2021 год.",
    statistics_block1: "Количество участников ОРТ",
    statistics_block2: "Количество абитуриентов, зачисленных на грантовые места вузов Кыргызстана",
    statistics_block3: "Зачисленные (в %) абитуриенты из сельских школ",
    statistics_block4: "Зачисленные абитуриенты. Среднее значение тестовых баллов",
    statistics_block5: "Участники ОРТ. Среднее значение тестовых баллов",
    statistics_block6: "Данные по зачислению предоставлены вузами Кыргызской Республики",
    statistics_block7: "Детализированные данные по зачислению не предоставлялись",
    statisctics_location1: "Баткенская",
    statisctics_location2: "Г. Бишкек",
    statisctics_location3: "Жалал-Абадская ",
    statisctics_location4: "Иссык-Кульская",
    statisctics_location5: "Нарынская",
    statisctics_location6: "Ошская",
    statisctics_location7: "Таласская",
    statisctics_location8: "Чуйская"
})


export function StaticBlock() {
    const langFromStore = useStore(locale);
    const t = useStore(messages);

    return(
        <React.Fragment>
            <h2 className={classes.title}>{t.statistics_block_title}</h2>
            <section className={classes.statistics}>
                <div className={classes.row}>
                    <div className={classes.col_3}>
                        <span>43 963</span>
                        <p>{t.statistics_block1}</p>
                    </div>

                    <div className={classes.col_3}>
                        <span>4 199</span>
                        <p>{t.statistics_block2}</p>
                    </div>

                    <div className={classes.col_3}>
                        <span>66,1%</span>
                        <p>{t.statistics_block3}</p>
                    </div>

                    <div className={classes.col_3}>
                        <span>145,6</span>
                        <p>{t.statistics_block4}</p>
                    </div>

                    <div className={classes.col_3}>
                        <span>120,2</span>
                        <p>{t.statistics_block5}</p>
                    </div>

                    <div className={classes.col_3}>
                        <p style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab, serif'}}>{t.statisctics_location1}<span
                            style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab serif', textDecoration: "underline"}}>400</span>
                        </p>
                        <p style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab, serif'}}>{t.statisctics_location2}<span
                            style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab serif', textDecoration: "underline"}}>777</span>
                        </p>
                        <p style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab, serif'}}>{t.statisctics_location3}<span
                            style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab serif', textDecoration: "underline"}}>608</span>
                        </p>
                        <p style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab, serif'}}>{t.statisctics_location4}<span
                            style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab serif', textDecoration: "underline"}}>448</span>
                        </p>
                        <p style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab, serif'}}>{t.statisctics_location5}<span
                            style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab serif', textDecoration: "underline"}}>410</span>
                        </p>
                        <p style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab, serif'}}>{t.statisctics_location6}<span
                            style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab serif', textDecoration: "underline"}}>770</span>
                        </p>
                        <p style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab, serif'}}>{t.statisctics_location7}<span
                            style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab serif', textDecoration: "underline"}}>202</span>
                        </p>
                        <p style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab, serif'}}>{t.statisctics_location8}<span
                            style={{fontSize: "18px", lineHeight: "24px", fontFamily: 'Roboto Slab serif', textDecoration: "underline"}}>360</span>
                        </p>
                    </div>


                    <p style={{fontSize: "15px", lineHeight: "18px"}}><span
                        style={{fontWeight: "300", color: "#3130BD", fontSize: "15px", lineHeight: "18px"}}>*</span> - {t.statistics_block6}<br/>
                            <span
                                style={{fontWeight: "300", color: "#3130BD", fontSize: "15px", lineHeight: "18px"}}>**</span> -
                            {t.statistics_block7}</p>
                </div>
            </section>
        </React.Fragment>
    )
}
