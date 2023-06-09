import React, { useState } from "react";
import styles from './Profile.module.css';
import { Header } from "../../components/Header";
import { Locales } from "../../utils/locales";
import { useAuth } from "../../contexts/AuthContext";
import { Field } from "../../components/Field";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { api } from "../../utils/api/MainApi";
import { InfoMessagesEnum, isEmailRegex } from "../../utils/constants";
import { useAlert } from "../../contexts/AlertContext";

const Profile: React.FC = () => {
    const {user, setUser, logout} = useAuth();
    const {values, handleChange, handleBlur, errors, setErrors, isValid} = useFormAndValidation(user);
    const {infoTip, errorTip} = useAlert();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const {email, name} = values;
        if (!values.email || !values.name) {
            return;
        }
        if (isValid) {
            api.patchUser({email, name})
                .then((data) => {
                    const {email, name} = data;
                    setUser({...user, email, name})
                    infoTip(InfoMessagesEnum.SAVED_SUCCESS);
                })
                .catch((err) => {
                    errorTip(err.body);
                })
                .finally();
        }
    };

    return (
        <>
            <Header user={user} />
            <main className={styles.Container}>
                <h1 className={styles.Title}>{Locales.HELLO}, {user!.name}!</h1>
                <form className={styles.Form} onSubmit={handleSubmit} name='profile'>
                    <div className={styles.Fields}>
                        <Field label={Locales.NAME}
                               type='text'
                               name='name'
                               error={errors.name}
                               value={values.name}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               view='inline'
                               minLength={2}
                               maxLength={30}
                        />
                        <Field label={Locales.EMAIL}
                               type='email'
                               name='email'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               error={errors.email}
                               value={values.email}
                               view='inline'
                               pattern={isEmailRegex}
                        />
                    </div>
                    <div className={styles.Buttons}>
                        <button className={styles.Button}
                                type='submit'
                                disabled={!isValid || (values.name === user?.name && values.email === user?.email)}
                        >{Locales.EDIT}</button>
                        <button className={`${styles.Button} ${styles.Button_Type_Primary}`}
                                onClick={logout}
                        >{Locales.LOGOUT}</button>
                    </div>
                </form>
            </main>
        </>
    );
};

export {
    Profile
};