import React, { useEffect, useMemo, useState } from "react";
import styles from './Register.module.css';
import { Logo } from "../../components/Logo";
import { Field } from "../../components/Field";
import { Locales } from "../../utils/locales";
import { Link, useNavigate } from "react-router-dom";
import { ProtectedRouter, PublicRouter } from "../../utils/routes";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { api } from "../../utils/api/MainApi";
import { ApiError } from "../../models/ApiError";
import { isEmailRegex } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";

const Register: React.FC = () => {

    const initialValues = useMemo(() => {
        return {email: '', password: '', name: ''};
    }, []);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const {
        values,
        handleChange,
        handleBlur,
        errors,
        setErrors,
        isValid,
        resetForm
    } = useFormAndValidation(initialValues);

    const {login} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        resetForm(initialValues);
    }, [resetForm, initialValues]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setErrors({});
        if (!values.email || !values.password) {
            return;
        }
        setIsSubmitting(true);
        api.register(values)
            .then((data) => {
                if (!data) {
                    return Promise.reject(data);
                }
            })
            .then(() => {
                login({email: values.email, password: values.password})
            })
            .then(() => navigate(ProtectedRouter.MOVIES))
            .catch((err: ApiError) => {
                setErrors({form: err.body ?? err.toString()});
                console.log(err.body);
                return Promise.reject(err);
            })
            .finally(() => setIsSubmitting(false));
    };

    return (
        <main className={styles.Container}>
            <Logo />
            <h1 className={styles.Title}>{Locales.WELLCOME}</h1>
            <form className={styles.Form}
                  onSubmit={handleSubmit}
            >
                <div className={styles.Fields}>
                    <Field label={Locales.NAME}
                           type='text'
                           name='name'
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={errors.name}
                           value={values.name}
                    />
                    <Field label={Locales.EMAIL}
                           type='email'
                           name='email'
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={errors.email}
                           value={values.email}
                           pattern={isEmailRegex}
                    />
                    <Field label={Locales.PASSWORD}
                           type='password'
                           name='password'
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={errors.password}
                           value={values.password}
                    />
                </div>
                {
                    errors.form &&
                    <div className={styles.Error}>{errors.form}</div>
                }
                <div className={styles.Buttons}>
                    <button type='submit'
                            className={styles.Button}
                            disabled={!isValid || isSubmitting}
                    >{Locales.REGISTER}</button>
                    <div className={styles.Hint}>
                        <span className={styles.Hint__Text}>{Locales.NOT_REGISTERED}</span>
                        <Link className={styles.Hint__Link} to={PublicRouter.SIGNIN}>{Locales.SIGNIN}</Link>
                    </div>
                </div>
            </form>
        </main>
    );
};

export { Register };