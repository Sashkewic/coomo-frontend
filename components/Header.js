import React, { useState } from 'react';
import classes from '@/styles/header.module.scss';

import logoMobile from "@/img/LogoMobile.png";
import menuIcon from "@/img/menuIcon.svg";
import closeMenuIcon from "@/img/closeMenuIcon.svg";

import { useRouter } from 'next/router';
import { useStore } from '@nanostores/react';
import { i18n, format, locale } from "@/stores/locale";
import { searchTerm } from "@/stores/searchTerm";

export const messages = i18n('mobileMenu', {
    menu_projects: "Проекты",
    menu_gallery: "Галерея",
    pages_contacts: "Контакты",
    search_placeholder: "Искать (больше 3 знаков)",
    about: "О ЦООМО"
})

export default function Header() {
    const router = useRouter()
    const t = useStore(messages);
    const searchFromStore = useStore(searchTerm);
    const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

    const setLocale = e => {
        e.preventDefault()
        locale.set(e.target.getAttribute('data-lang'));
        setMobileMenuOpened(false)
    }

    const handleSearchInput = e => {
        searchTerm.set(e.target.value)
    }

    const handleSearchSubmit = e => {
        e.preventDefault()
        if (searchFromStore.trim().length > 2) {
            router.push({ pathname: '/search_results', query: { q: searchFromStore } })
        }
    }

    let menu =
        <ul className={classes.mobile_navigation}>
            <li className={classes.projects}><a href="/projects">{t.menu_projects}</a></li>
            <li className="gallery"><a href="/gallery">{t.menu_gallery}</a></li>
            <li className="contacts"><a href="/contacts">{t.pages_contacts}</a></li>
            <li><a href="/about_coomo">{t.about}</a></li>
            <li><a href="" data-lang="kg" onClick={setLocale}>Кыргызча</a></li>
            <li><a href="" data-lang="ru" onClick={setLocale}>Русский</a></li>
            <ul className={classes.bottom_mobileMenu}>
                <li><a href="tel:+996312664838">(996) 312 66-48-38</a></li>
                <li><a href="https://www.instagram.com/ort_ceatm_official/"><i className="fab fa-instagram"></i></a></li>
                <li><a href="https://www.facebook.com/testing.kg/"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="https://www.youtube.com/channel/UCdlPy3qAGu6mPuXusTjMiMg"><i className="fab fa-youtube"></i></a></li>
            </ul>
        </ul>

    return (
        <React.Fragment>
            <header className={classes.header}>

                {/* Если мобильная версия (768px и меньше)*/}
                <a href='/'><img src={logoMobile.src} className={classes.mobileLogo} /></a>
                <form action="" onSubmit={handleSearchSubmit}>
                    <i className="fas fa-search"></i>
                    <input type="search" value={searchFromStore} className={classes.nav_search} placeholder={`${t.search_placeholder}`} formMethod="GET" onChange={handleSearchInput} />
                </form>
                <div className={classes.toggleMenu} onClick={() => setMobileMenuOpened(!mobileMenuOpened)}>
                    {mobileMenuOpened ? <img src={closeMenuIcon.src} /> : <img src={menuIcon.src} />}
                </div>
                {mobileMenuOpened ? menu : null}
                {/**/}

                {/*ПК-версия*/}
                <ul className={classes.navigation}>
                    <li><a href="/about_coomo">{t.about}</a></li>
                    <li><a href="" data-lang="kg" onClick={setLocale}>КЫР</a></li>
                    <li><a href="" data-lang="ru" onClick={setLocale}>РУС</a></li>
                    <li><a href="tel:+996312664838">(996) 312 66-48-38</a></li>
                </ul>

                <ul className={classes.navigation}>
                    <li><a href="https://www.instagram.com/ort_ceatm_official/"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="https://www.facebook.com/testing.kg/"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="https://www.youtube.com/channel/UCdlPy3qAGu6mPuXusTjMiMg"><i className="fab fa-youtube"></i></a></li>
                </ul>
                {/**/}
            </header>
        </React.Fragment>
    )
}
