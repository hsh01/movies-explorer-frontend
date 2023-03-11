import React from "react";
import styles from './Preloader.module.css';

const Preloader: React.FC = () => {
    return (
        <div className={styles.Preloader}>
            <div className={styles.Preloader__Container}>
                <span className={styles.Preloader__Round}></span>
            </div>
        </div>
    );
};

export {Preloader};