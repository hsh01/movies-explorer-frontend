import { FormEvent, useCallback, useState } from 'react';

export function useFormAndValidation() {
    const [values, setValues] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e: any) => {
        const {name} = e.target;
        let value = e.target.value;
        if (e.target.type === 'checkbox') {
            value = e.target.checked;
        }
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: e.target.validationMessage});
        setIsValid(e.target.closest('form').checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {values, handleChange, errors, setErrors, isValid, resetForm, setValues, setIsValid};
}