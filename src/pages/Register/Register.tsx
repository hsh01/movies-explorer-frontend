import React from "react";
import styles from './Register.module.css';
import { Logo } from "../../components/Logo";
import { Field } from "../../components/Field";
import { Locales } from "../../utils/locales";
import { Link } from "react-router-dom";
import { PublicRouter } from "../../utils/routes";

const Register: React.FC = () => {
    return (
        <div className={styles.Container}>
            <Logo />
            <h1 className={styles.Title}>{Locales.WELLCOME}</h1>
            <form className={styles.Form}>
                <div className={styles.Fields}>
                    <Field label={Locales.NAME} type='text' />
                    <Field label={Locales.EMAIL} type='email' />
                    <Field label={Locales.PASSWORD} type='password' error={'Что-то пошло не так...'}/>
                </div>
                <div className={styles.Buttons}>
                    <button type='submit' className={styles.Button}>{Locales.REGISTER}</button>
                    <div className={styles.Hint}>
                        <span className={styles.Hint__Text}>{Locales.NOT_REGISTERED}</span>
                        <Link className={styles.Hint__Link} to={PublicRouter.SIGNIN}>{Locales.SIGNIN}</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export { Register };