import React from "react";
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.Container}>
            <div className={styles.Logo} />
            <div className={styles.Buttons}>
                <button className={`${styles.Button} ${styles.Button__Secondary}`}>Регистрация</button>
                <button className={`${styles.Button} ${styles.Button__Primary}`}>Войти</button>
            </div>
        </header>
    );
};

export {Header};