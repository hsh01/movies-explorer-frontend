import React from "react";
import styles from './FilterCheckbox.module.css';

type FilterCheckbox = {
    value: number;
    onChange: (value: any) => void;
}
const FilterCheckbox: React.FC<any> = ({value, onChange}) => {
    return (
        <label className={styles.Container}>
            <span className={styles.Checkbox__Text}>Короткометражки</span>
            <input className={styles.Checkbox} name='shorts' type='checkbox' value={value} onChange={onChange}/>
            <span className={styles.Checkbox_Item}></span>
        </label>
    );
};

export { FilterCheckbox };