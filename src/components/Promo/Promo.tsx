import React from "react";
import styles from './Promo.module.css';

const Promo: React.FC = () => {
    return (
        <div className={styles.Container}>
            <h1 className={styles.Header}>Учебный проект студента факультета Веб-разработки.</h1>
        </div>
    );
};

export {Promo};