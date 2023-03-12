import React, { FormEvent } from "react";
import styles from './SearchForm.module.css';
import { FilterCheckbox } from "../FilterCheckbox";

const SearchForm: React.FC = () => {
    function submitHandler(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <form className={styles.Container} onSubmit={submitHandler}>
            <label className={styles.Search}>
                <input className={styles.Search__Field} type='search' placeholder='Фильм'/>
                <button className={styles.Search__Button} type='submit' />
            </label>
            <FilterCheckbox/>
        </form>
    );
};

export { SearchForm };