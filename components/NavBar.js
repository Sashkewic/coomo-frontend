import React, {useState} from 'react';
import Link from 'next/link';
import logo from '../img/coomo_logo.svg';
import classes from '../styles/navbar.module.scss';
import {useRouter} from 'next/router';
import { useStore } from '@nanostores/react';
import { i18n, format } from "@/stores/locale";
import { searchTerm } from "@/stores/searchTerm";

export const messages = i18n('navbar', {
    menu_projects: "Проекты",
    menu_gallery: "Галерея",
    pages_contacts: "Контакты",
    search_placeholder: "Искать (больше 3 знаков)"
})

    // const t = useStore(messages);

export default function NavBar() {
    const t = useStore(messages);
    const searchFromStore = useStore(searchTerm);
    // const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    const handleSearchInput = (e) => {
        searchTerm.set(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if(searchFromStore.trim().length>2){
            router.push({pathname: '/search_results', query: {q: searchFromStore}})
        }
    }

    return (
        <React.Fragment>
            <div className={classes.nav_block}>
                <div className={classes.row}>
                    <div className={classes.col_2 + " " + classes.logo}>
                        <Link href="/"><a><img src={logo.src} alt="logo" width={445} height={95}/></a></Link>
                    </div>
                    <div className={classes.col_2 + " " + classes.nav}>
                        <ul>
                            <li className={classes.projects}>
                                <a href="/projects">{t.menu_projects}</a>
                            </li>
                            <li className="gallery"><Link href="/gallery"><a>{t.menu_gallery}</a></Link></li>
                            <li className="contacts"><Link href="/contacts"><a>{t.pages_contacts}</a></Link></li>
                            <li className={classes.search}>
                                <form action="" onSubmit={handleSearchSubmit}>
                                    <i className="fas fa-search"></i>
                                    <input type="search" value={searchFromStore} className={classes.nav_search} placeholder={`${t.search_placeholder}`} formMethod="GET" onChange={handleSearchInput}/>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
