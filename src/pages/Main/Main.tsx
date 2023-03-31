import React from "react";
import styles from './Main.module.css';
import { Header } from "../../components/Header";
import { Promo } from "../../components/Promo";
import { NavTab } from "../../components/NavTab";
import { AboutProject } from "../../components/AboutProject";
import { Techs } from "../../components/Techs";
import { AboutMe } from "../../components/AboutMe";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const Main: React.FC = () => {
    const {user} = useAuth();

    return (
        <main className={styles.Container}>
            <Header user={user} theme='dark'/>
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Footer/>
        </main>
    );
};

export { Main };