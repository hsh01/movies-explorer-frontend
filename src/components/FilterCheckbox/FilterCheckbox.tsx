import React from "react";
import styles from './FilterCheckbox.module.css';

type FilterCheckboxType = {
    value: boolean;
    onChange: (value: any) => void;
}
const FilterCheckbox: React.FC<FilterCheckboxType> = ({value, onChange}) => {
    return (
        <label className={styles.Container}>
            <span className={styles.Checkbox__Text}>Короткометражки</span>
            <input className={styles.Checkbox} name='shorts' type='checkbox' checked={value} onChange={onChange}/>
            <span className={styles.Checkbox_Item}></span>
        </label>
    );
};

export { FilterCheckbox };