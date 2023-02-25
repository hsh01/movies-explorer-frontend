import React from "react";
import styles from './Section.module.css';

type SectionProps = {
    name: string;
    header: string;
    className?: string;
    type?: 'primary' | 'secondary';
    children?: React.ReactNode;
};
const Section: React.FC<SectionProps> = ({
                                             header,
                                             children,
                                             className,
                                             name,
                                             type = 'primary'
                                         }) => {
    return (
        <section id={name}
             className={`${styles.Container} ${type === 'primary' ? styles.Container__Primary
                 : type === 'secondary' ? styles.Container__Secondary
                     : ''}`}>
            <h1 className={styles.Header}>{header}</h1>
            {
                !!className ? <div className={className}>
                    {children}
                </div> : children
            }

        </section>
    );
};

export { Section };