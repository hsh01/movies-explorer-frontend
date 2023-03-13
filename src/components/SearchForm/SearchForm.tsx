import React, { FormEvent, useState } from "react";
import styles from './SearchForm.module.css';
import { FilterCheckbox } from "../FilterCheckbox";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const SearchForm: React.FC = () => {
    const {values, handleChange, errors, setErrors, isValid, resetForm} = useFormAndValidation();


    function submitHandler(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <form className={styles.Container} noValidate onSubmit={submitHandler}>
            <div className={styles.Search}>
                <input className={styles.Search__Field} name='search' type='search' placeholder='Фильм' required />
                <button className={styles.Search__Button} type='submit' />
                <span className={styles.Error}>{errors.search}</span>
            </div>
            <FilterCheckbox />
        </form>
    );
};

export { SearchForm };