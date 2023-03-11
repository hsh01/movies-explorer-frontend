import React from "react";
import styles from './Main.module.css';
import { Header } from "../../components/Header";
import { Promo } from "../../components/Promo";
import { NavTab } from "../../components/NavTab";
import { AboutProject } from "../../components/AboutProject";
import { Techs } from "../../components/Techs";
import { AboutMe } from "../../components/AboutMe";
import { Footer } from "../../components/Footer";

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
            <Header theme='dark'/>
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