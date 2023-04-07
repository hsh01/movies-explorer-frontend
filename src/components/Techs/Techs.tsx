import React from "react";
import styles from './Techs.module.css';
import { Section } from "../Section";

const Techs: React.FC = () => {
    const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

    return (
        <Section header='Технологии' type='secondary' name='techs'>
            <h2 className={styles.Title}>7 технологий</h2>
            <p className={styles.Text}>На курсе веб-разработки мы освоили технологии,
                которые применили в дипломном проекте.</p>
            <ul className={styles.Snippets}>
                {
                    techs.map((item, index) => (
                        <li className={styles.Snippet} key={index}>{item}</li>
                    ))
                }
            </ul>
        </Section>
    );
};

export {Techs};