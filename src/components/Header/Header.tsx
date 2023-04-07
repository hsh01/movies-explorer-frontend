import React, { useEffect, useState } from "react";
import styles from './Header.module.css';
import { Link, NavLink } from "react-router-dom";
import { ProtectedRouter, PublicRouter } from "../../utils/routes";
import { Logo } from "../Logo";

type HeaderProps = {
    user?: any;
    theme?: 'dark';
}

enum MenuItems {
    MAIN = 'Главная',
    MOVIES = 'Фильмы',
    SAVED_MOVIES = 'Сохранённые фильмы'
}

const Header: React.FC<HeaderProps> = ({user, theme}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuItems = [
        {
            label: MenuItems.MAIN,
            to: PublicRouter.MAIN,
            hidden: true,
        },
        {
            label: MenuItems.MOVIES,
            to: ProtectedRouter.MOVIES,
            keepParams: true,
        },
        {
            label: MenuItems.SAVED_MOVIES,
            to: ProtectedRouter.SAVED_MOVIES,
            keepParams: true,
        },
    ];

    const onClose = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        function closeByEscape(evt: KeyboardEvent) {
            if (evt.key === 'Escape') {
                onClose();
            }
        }

        if (isMenuOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            };
        }
    }, [isMenuOpen]);

    const handleOverlay = (e: any) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <header className={`${styles.Container} ${theme === 'dark' ? styles.Container_Theme_Dark : ''}`}>
            <Logo />
            <div className={styles.Buttons}>{
                !!user
                    ? (
                        <>
                            <div className={`${styles.Menu} ${isMenuOpen ? styles.Menu_Open : ''}`}
                                 onMouseDown={handleOverlay}
                            >
                                <div className={styles.Menu_Type_Main}>
                                    {
                                        menuItems.map((item, index) => (
                                            (isMenuOpen || !item.hidden) &&
                                            <NavLink to={item.to}
                                                     key={index}
                                                     className={({isActive}) =>
                                                         `${styles.Button} ${styles.Button__MenuItem} ${isMenuOpen &&
                                                         isActive ? styles.Button__MenuItem_Active : ''}`
                                                     }
                                            >{item.label}</NavLink>
                                        ))
                                    }
                                </div>
                                <Link className={`${styles.Button} ${styles.Button_Type_Profile}`}
                                      to={ProtectedRouter.PROFILE}
                                >
                                    <span className={styles.ProfileIcon} />
                                    <span>Аккаунт</span>
                                </Link>
                            </div>
                            <button type='button'
                                    className={styles.Menu_Button}
                                    onClick={onClose}
                            />
                        </>
                    ) : (
                        <>
                            <Link className={`${styles.Button} ${styles.Button__Secondary}`}
                                  to={PublicRouter.SIGNUP}
                            >Регистрация</Link>
                            <Link className={`${styles.Button} ${styles.Button__Primary}`}
                                  to={PublicRouter.SIGNIN}
                            >Войти</Link>
                        </>
                    )
            }</div>
        </header>
    );
};

export { Header };