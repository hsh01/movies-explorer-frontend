import React, { InputHTMLAttributes } from "react";
import styles from './Field.module.css';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    error?: string;
    view?: 'default' | 'inline';
}

const Field: React.FC<FieldProps> = (props) => {
    const {label, name, type, value, error, className, view = 'default'} = props;

    return (
        <div className={styles.Field}>
            <div className={`${styles.Label} ${view === 'inline' ? styles.Label_View_Inline : ''}`}>{label}</div>
            <input
                className={`${styles.Input} ${view === 'inline' ? styles.Input_View_Inline : ''} ${error ? styles.Input_Type_Error : ''}`}
                name={name}
                value={value}
                type={type}
                {...props}
            />
            <span className={styles.Error}>{error}</span>
        </div>
    );
};

export { Field };