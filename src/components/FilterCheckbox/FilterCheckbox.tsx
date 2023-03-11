import React from "react";
import styles from './FilterCheckbox.module.css';

const FilterCheckbox: React.FC = () => {
    return (
        <label className={styles.Container}>
            <span className={styles.Checkbox__Text}>Короткометражки</span>
            <input className={styles.Checkbox} type='checkbox' value={0}/>
            <span className={styles.Checkbox_Item}></span>
        </label>
    );
};

export { FilterCheckbox };