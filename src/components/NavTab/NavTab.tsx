import React from "react";
import styles from './NavTab.module.css';

type LinkType = {
    label: string;
    href: string;
}

type NavTabProps = {
    links: LinkType[];
}
const NavTab: React.FC<NavTabProps> = ({
                                           links
                                       }) => {
    return (
        <div className={styles.Container}>
            <ul className={styles.Menu}>
                {
                    links.map((item, index) => (
                        <li className={styles.Menu__Item}
                            key={index}
                            onClick={() => {
                                document.getElementById(item.href)?.scrollIntoView()
                            }
                            }
                        >{item.label}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export { NavTab };