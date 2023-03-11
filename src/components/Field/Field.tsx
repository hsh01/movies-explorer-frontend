import React, { HTMLInputTypeAttribute } from "react";
import styles from './Field.module.css';

type FieldProps = {
    name?: string;
    label?: string;
    type?: HTMLInputTypeAttribute
    value?: any;
    onChange?: (value: any) => void;
    error?: string;
}

const Field: React.FC<FieldProps> = ({label, name, type, value, onChange, error}) => {
    return (
        <div className={styles.Field}>
            <div className={styles.Label}>{label}</div>
            <input className={`${styles.Input} ${error? styles.Input_Type_Error : ''}`} value={value} type={type} onChange={onChange} />
            <span className={styles.Error}>{error}</span>
        </div>
    );
};

export { Field };