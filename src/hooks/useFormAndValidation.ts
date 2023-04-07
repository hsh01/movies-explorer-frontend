import { useCallback, useState } from 'react';

export function useFormAndValidation(defaultValues?: any) {
    const [values, setValues] = useState<any>(defaultValues);
    const [errors, setErrors] = useState<any>({});
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e: any) => {
        const {name} = e.target;
        let value = e.target.value;
        setValues({...values, [name]: value});
    };
    const handleBlur = (e: any) => {
        const {name} = e.target;
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

    return {values, handleChange, handleBlur, errors, setErrors, isValid, resetForm, setValues, setIsValid};
}