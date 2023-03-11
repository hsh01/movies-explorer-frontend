import React from "react";
import styles from './SearchForm.module.css';
import { FilterCheckbox } from "../FilterCheckbox";

const SearchForm: React.FC = () => {
    return (
        <form className={styles.Container}>
            <label className={styles.Search}>
                <input className={styles.Search__Field} type='search' placeholder='Фильм'/>
                <button className={styles.Search__Button} type='submit' />
            </label>
            <FilterCheckbox/>
        </form>
    );
};

export { SearchForm };