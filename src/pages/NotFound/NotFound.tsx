import React from "react";
import styles from './NotFound.module.css';
import { Locales } from "../../utils/locales";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <main className={styles.Container}>
            <h1 className={styles.Title}>404</h1>
            <p className={styles.Text}>{Locales.PAGE_NOT_FOUND}</p>
            <button className={styles.Button} onClick={() => navigate(-1)}>{Locales.BACK}</button>
        </main>
    );
};

export {NotFound};