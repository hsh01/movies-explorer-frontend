import React from "react";
import styles from './Login.module.css';
import { Logo } from "../../components/Logo";
import { Field } from "../../components/Field";
import { Locales } from "../../utils/locales";
import { Link } from "react-router-dom";
import { PublicRouter } from "../../utils/routes";

const Login: React.FC = () => {
    return (
        <div className={styles.Container}>
            <Logo />
            <h1 className={styles.Title}>{Locales.GLADS}</h1>
            <form className={styles.Form}>
                <div className={styles.Fields}>
                    <Field label={Locales.EMAIL} type='email' />
                    <Field label={Locales.PASSWORD} type='password' />
                </div>
                <div className={styles.Buttons}>
                    <button type='submit' className={styles.Button}>{Locales.SIGNIN}</button>
                    <div className={styles.Hint}>
                        <span className={styles.Hint__Text}>{Locales.NOT_REGISTERED}</span>
                        <Link className={styles.Hint__Link} to={PublicRouter.SIGNUP}>{Locales.REGISTRATION}</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export { Login };