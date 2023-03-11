import React from "react";
import styles from './MenuItem.module.css';
import { NavLink } from "react-router-dom";

type MenuItemProps = {
    to: string;
}
const MenuItem: React.FC = ({to}) => {
    return (
        <NavLink className={styles.Container}
                 to={to}
        >

        </NavLink>
    );
};

export {MenuItem};