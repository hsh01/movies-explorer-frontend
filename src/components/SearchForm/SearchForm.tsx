import React, { FormEvent, useEffect } from "react";
import styles from './SearchForm.module.css';
import { FilterCheckbox } from "../FilterCheckbox";
import { Locales } from "../../utils/locales";
import { MoviesSearchParamsEnum } from "../../models/movies";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type SearchFormProps = {
    validator: any;
    setSearch: (values: any) => void;
    isShort: boolean;
    setIsShortsOnly: (value: boolean) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({validator, setSearch, isShort, setIsShortsOnly}) => {

    function submitHandler(e: FormEvent) {
        e.preventDefault();
        if (validator.isValid) {
            setSearch(validator.values.search);
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
                       value={validator.values.search ?? ''}
                       onChange={validator.handleChange}
                       onBlur={validator.handleBlur}
                />
                <button className={styles.Search__Button}
                        type='submit'
                        disabled={!validator.values.search}
                />
                <button className={styles.Search__Reset}
                        type='reset'
                        onClick={() => {
                            validator.resetForm({search: ''});
                            setSearch(undefined);
                        }}
                />
                <span className={styles.Error}>{validator.errors.search}</span>
            </div>
            <FilterCheckbox value={isShort} onChange={() => setIsShortsOnly(!isShort)} />
        </form>
    );
};

export { SearchForm };