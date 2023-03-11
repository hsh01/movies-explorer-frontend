import React from "react";
import styles from './Footer.module.css';
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    const links = [
        {
            label: 'Яндекс.Практикум',
            href: 'https://practicum.yandex.ru/',
        },
        {
            label: 'Github',
            href: 'https://github.com/'
        }
    ]

    return (
        <footer className={styles.Container}>
            <p className={`${styles.Text} ${styles.Text__Secondary}`}>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className={styles.Copyright}>
                <p className={styles.Copyright__Text}>&copy; 2020</p>
                <ul className={styles.Links}>{
                    links.map((item, index) => (
                        <li key={index}><Link className={`${styles.Text} ${styles.Link}`} to={item.href}>{item.label}</Link></li>
                    ))
                }</ul>
            </div>
        </footer>
    );
};

export { Footer };