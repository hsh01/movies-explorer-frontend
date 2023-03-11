import React from "react";
import styles from './Profile.module.css';
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { MoviesCardList } from "../../components/MoviesCardList";
import { Footer } from "../../components/Footer";
import { Locales } from "../../utils/locales";

const Profile: React.FC = () => {
    const user = {
        name: 'Виталий',
        email: 'pochta@yandex.ru',
    };

    return (
        <>
            <Header user={user} />
            <div className={styles.Container}>
                <h1 className={styles.Title}>{Locales.HELLO}, {user.name}!</h1>
                <div className={styles.Fields}>
                    <div className={styles.Field}>
                        <div className={styles.Label}>{Locales.NAME}</div>
                        <div className={styles.Text}>{user.name}</div>
                    </div>
                    <div className={styles.Field}>
                        <div className={styles.Label}>{Locales.EMAIL}</div>
                        <div className={styles.Text}>{user.email}</div>
                    </div>
                </div>
                <div className={styles.Buttons}>
                    <div className={styles.Button}>{Locales.EDIT}</div>
                    <div className={`${styles.Button} ${styles.Button_Type_Primary}`}>{Locales.LOGOUT}</div>
                </div>
            </div>
        </>
    );
};

export { Profile };