import React from "react";
import styles from './Alert.module.css';
import { useAlert } from "../../contexts/AlertContext";

const Alert: React.FC = () => {
    const {alerts, removeTip} = useAlert();
    if (alerts.length) {
        return (
            <div className={styles.Container}>{
                alerts.map((item, key) => {
                    return (
                        <div key={key}
                             className={`${styles.Row} ${item.type === 'error' ?
                                 styles.Error : item.type === 'info' ? styles.Info : ''}`}>
                            <div className={`${styles.Message}`}>{item.message}</div>
                            <button className={`${styles.Button} ${item.type === 'error' ?
                                styles.Button_Error : item.type === 'info' ? styles.Button_Info : ''}`}
                                    type='button' onClick={() => removeTip(key)}></button>
                        </div>
                    );
                })
            }</div>
        );
    }
    return <></>;
};

export { Alert };