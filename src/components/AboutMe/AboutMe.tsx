import React from "react";
import styles from './AboutMe.module.css';
import { Section } from "../Section";
import { Link } from "react-router-dom";

const AboutMe: React.FC = () => {
    const links = [
        {
            label: 'Статичный сайт',
            href: '#'
        },
        {
            label: 'Адаптивный сайт',
            href: '#'
        },
        {
            label: 'Одностраничное приложение',
            href: '#'
        },
    ];

    return (
        <Section header='Студент' name='about-me'>
            <div className={styles.Container}>
                <div className={styles.ContentWrapper}>
                    <div className={styles.Content}>
                        <h2 className={styles.Title}>Виталий</h2>
                        <h3 className={styles.About}>Фронтенд-разработчик, 30 лет</h3>
                        <p className={styles.Text}>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
                            есть
                            жена
                            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года
                            работал
                            в
                            компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
                            фриланс-заказами и ушёл с постоянной работы.</p>
                    </div>
                    <a className={styles.GithubLink} href='#'>Github</a>
                </div>
                <img className={styles.Avatar} src={require('../../images/ava.png')}/>
            </div>
            <div className={styles.Portfolio}>
                <h1 className={styles.Portfolio__Header}>Портфолио</h1>
                <ul className={styles.Links}>{
                    links.map((item, index) => (
                        <li className={styles.Link} key={index}>
                            <p className={styles.Link__Text}>{item.label}</p>
                            <Link className={styles.Link__Button} to={item.href}/>
                        </li>
                    ))
                }</ul>
            </div>
        </Section>
    );
};

export { AboutMe };