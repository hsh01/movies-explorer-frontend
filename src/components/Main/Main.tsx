import React from "react";
import styles from './Main.module.css';
import { Header } from "../Header";
import { Promo } from "../Promo";
import { NavTab } from "../NavTab";
import { AboutProject } from "../AboutProject";
import { Techs } from "../Techs";
import { AboutMe } from "../AboutMe";
import { Footer } from "../Footer";

const Main: React.FC = () => {
    const navTabLinks = [
        {
            label: 'О проекте',
            href: 'about-project'
        },
        {
            label: 'Технологии',
            href: 'techs'
        },
        {
            label: 'Студент',
            href: 'about-me'
        },
    ]

    return (
        <div className={styles.Container}>
            <Header/>
            <Promo/>
            <NavTab links={navTabLinks}/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Footer/>
        </div>
    );
};

export { Main };