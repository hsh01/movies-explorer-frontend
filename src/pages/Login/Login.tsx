import React, { useEffect, useMemo, useState } from "react";
import styles from './Login.module.css';
import { Logo } from "../../components/Logo";
import { Field } from "../../components/Field";
import { Locales } from "../../utils/locales";
import { Link, useNavigate } from "react-router-dom";
import { ProtectedRouter, PublicRouter } from "../../utils/routes";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useAuth } from "../../contexts/AuthContext";
import { ApiError } from "../../models/ApiError";
import { isEmailRegex } from "../../utils/constants";
import { useAlert } from "../../contexts/AlertContext";

const Login: React.FC = () => {
    const initialValues = useMemo(() => {
        return {email: '', password: ''};
    }, []);
    const {
        values,
        handleChange,
        handleBlur,
        errors,
        setErrors,
        isValid,
        resetForm
    } = useFormAndValidation(initialValues);
    const {user, login} = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const {errorTip} = useAlert();
    if (user) {
        navigate(ProtectedRouter.MOVIES, {replace: true});
    }

    useEffect(() => {
        resetForm(initialValues);
    }, [resetForm, initialValues]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        setIsSubmitting(true);
        login({email: values.email, password: values.password})
            .then(() => navigate(ProtectedRouter.MOVIES))
            .catch((err: ApiError) => {
                errorTip(err.body ?? err.toString());
                return Promise.reject(err);
            })
            .finally(() => setIsSubmitting(false));
    };

    return (
        <main className={styles.Container}>
            <Logo />
            <h1 className={styles.Title}>{Locales.GLADS}</h1>
            <form className={styles.Form}
                  onSubmit={handleSubmit}
            >
                <div className={styles.Fields}>
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
                    >{Locales.SIGNIN}</button>
                    <div className={styles.Hint}>
                        <span className={styles.Hint__Text}>{Locales.NOT_REGISTERED}</span>
                        <Link className={styles.Hint__Link} to={PublicRouter.SIGNUP}>{Locales.REGISTRATION}</Link>
                    </div>
                </div>
            </form>
        </main>
    );
};

export { Login };