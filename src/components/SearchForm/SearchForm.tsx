import React, { FormEvent, useState } from "react";
import styles from './SearchForm.module.css';
import { FilterCheckbox } from "../FilterCheckbox";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { Locales } from "../../utils/locales";

const SearchForm: React.FC = () => {
    const {values, handleChange, errors, setErrors, isValid, resetForm} = useFormAndValidation();


    function submitHandler(e: FormEvent) {
        e.preventDefault();
        if (isValid) {
            console.log(values);
        }
    }

    return (
        <form className={styles.Container} noValidate onSubmit={submitHandler}>
            <div className={styles.Search}>
                <input className={styles.Search__Field}
                       name='search'
                       type='search'
                       placeholder={Locales.MOVIE}
                       required
                       value={values.search ?? ''}
                       onChange={handleChange}
                />
                <button className={styles.Search__Button} type='submit' disabled={!values.search}/>
                <span className={styles.Error}>{errors.search}</span>
            </div>
            <FilterCheckbox value={values.shorts} onChange={handleChange} />
        </form>
    );
};

export { SearchForm };