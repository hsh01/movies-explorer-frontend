import React from "react";
import styles from './AboutProject.module.css';
import { Section } from "../Section";

const AboutProject: React.FC = () => {
    return (
        <Section header='О проекте' name='about-project'>
            <div className={styles.Cards}>
                <div className={styles.Card}>
                    <h2 className={styles.Card__Header}>Дипломный проект включал 5 этапов</h2>
                    <p className={styles.Card__Text}>Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.</p>
                </div>
                <div className={styles.Card}>
                    <h2 className={styles.Card__Header}>На выполнение диплома ушло 5 недель</h2>
                    <p className={styles.Card__Text}>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                        соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className={styles.Snippets}>
                <div className={styles.Snippet}>
                    <div className={`${styles.Timing} ${styles.Timing__Primary}`}>1 неделя</div>
                    <div className={styles.Caption}>Back-end</div>
                </div>
                <div className={styles.Snippet}>
                    <div className={`${styles.Timing} ${styles.Timing__Secondary}`}>4 недели</div>
                    <div className={styles.Caption}>Front-end</div>
                </div>
            </div>
        </Section>
    );
};

export {AboutProject};