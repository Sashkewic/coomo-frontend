import React, {useState} from 'react';
import { MainLayout } from "@/components/MainLayout";

import classes from '@/styles/types-tests.module.scss';
import Link from 'next/link';

import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';
import { useStore } from '@nanostores/react';
import { messages } from '@/components/tests/index_translation';

//Функция склонения слов 
function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

// список предметов для фильра. на русском и кыргызском. в алфавитном порядке
const testNames = [
    'Аналогии и дополнения предложений',
    'Английский язык',
    'Англис тили',
    'Биология',
    'История',
    'Кыргыз тилинин практикалык грамматикасы',
    'Математика',
    'Математика предметная',
    'Математика предметная',
    'Окшоштуктар жана сүйлөмдөрдү толуктоо',
    'Практическая грамматика русского языка',
    'Тарых',
    'Текстти окуу жана түшүнүү',
    'Физика',
    'Химия',
    'Чтение и понимание',
]

export default function OnlineTest() {
    const t = useStore(messages)
    const [langFilter, setLangFilter] = useState('')
    const [subjFilter, setSubjFilter] = useState('')

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/tests`, fetcher)

    if (error) return "An error has occured"
    if (!data) return "Loading"

    const handleSelectSubj = (e) => {
        setSubjFilter(e.target.value)
    }

    const languages_test = { 'Русский': t.online_test_lang_ru, 'Кыргызский': t.online_test_lang_kg}


    return (
        <React.Fragment>
            <MainLayout title="Онлайн-тест">
                <div className={classes.title}>
                    <h1>{t.online_test_title}</h1>
                </div>

                <section className={classes.choose_test}>
                    <div className={classes.filter_tests}>
                        <div className={classes.choose_lang}>
                            <ul>
                                <li>
                                    <label className={classes.container}>{t.online_test_search_option1}
                                      <input type="radio" name="test-lang" onClick={()=>setLangFilter('')} />
                                        <span className={classes.checkmark}></span>
                                    </label>
                                </li>
                                <li>
                                    <label className={classes.container}>{t.online_test_search_option2}
                                        <input type="radio" name="test-lang"  onClick={()=>setLangFilter('Кыргызский')}/>
                                        <span className={classes.checkmark}></span>
                                    </label>
                                </li>
                                <li>
                                    <label className={classes.container}>{t.online_test_search_option3}
                                        <input type="radio" name="test-lang"  onClick={()=>setLangFilter('Русский')}/>
                                        <span className={classes.checkmark}></span>
                                    </label>
                                </li>
                            </ul>
                        </div>

                        <div className={classes.subject_filter}>
                            <span>{t.online_test_search}: </span>
                          <select 
                              name="subject_filter" 
                              className={classes.subject_filter_select} 
                              onChange={handleSelectSubj}>
                              <option value="" className={classes.option}>{t.online_test_search_all}</option>
                              <option className={classes.option} value='Аналогии и дополнения предложений'> Аналогии и дополнения предложений </option>
                              <option className={classes.option} value='Английский язык'> Английский язык </option>
                              <option className={classes.option} value='Англис тили'> Англис тили </option>
                              <option className={classes.option} value='Биология'> Биология </option>
                              <option className={classes.option} value='История'> История </option>
                              <option className={classes.option} value='Кыргыз тилинин практикалык грамматикасы'> Кыргыз тилинин практикалык грамматикасы </option>
                              <option className={classes.option} value='Математика'> Математика </option>
                              <option className={classes.option} value='Математика боюнча предметтик тест'> Математика боюнча предметтик тест </option>
                              <option className={classes.option} value='Математика предметная'> Математика предметная </option>
                              <option className={classes.option} value='Окшоштуктар жана сүйлөмдөрдү толуктоо'> Окшоштуктар жана сүйлөмдөрдү толуктоо </option>
                              <option className={classes.option} value='Практическая грамматика русского языка'> Практическая грамматика русского языка </option>
                              <option className={classes.option} value='Тарых'> Тарых </option>
                              <option className={classes.option} value='Текстти окуу жана түшүнүү'> Текстти окуу жана түшүнүү </option>
                              <option className={classes.option} value='Физика'> Физика </option>
                              <option className={classes.option} value='Химия'> Химия </option>
                              <option className={classes.option} value='Чтение и понимание'> Чтение и понимание </option>
                           </select>
                        </div>
                    </div>

                    <div className={classes.tests_card}>

                        {
                          data.filter(item => item.lang.includes(langFilter) && item.name.includes(subjFilter)).map((item, i) => {
                                return (
                                    <Link href={`/tests/${item.id}`} key={i} >
                                        <div key={i} className={classes.object}>
                                            <p className={classes.object_lang}>{languages_test[item.lang]}. {item.part_num ? `${item.part_num} ${t.online_test_part}.` : null} {item.version ? `${item.version} ${t.online_test_version}` : null}</p>
                                            <h6>{item.name}</h6>
                                            <div className={classes.time_and_tasks}>
                                                <div className={classes.time_on_test}>
                                                    <span>{t.online_test_time_test({minutes: item.duration})}</span>
                                                </div>
                                                <div className={classes.number_of_tasks}>
                                                    <span>{t.online_test_quantity_quests}: {item.num_questions}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </section>
            </MainLayout>
        </React.Fragment>

    )
}
