import React from "react";
import styles from './Logo.module.css';
import { Link } from "react-router-dom";
import { PublicRouter } from "../../utils/routes";

const Logo: React.FC = () => {
    return (
        <div className={styles.Logo} ><Link className={styles.Logo__Link} to={PublicRouter.MAIN} /></div>
    );
};

export {Logo};