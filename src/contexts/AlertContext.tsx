import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from "react-router-dom";
import { ErrorMessagesEnum } from "../utils/constants";


interface AlertContextInterface {
    alerts: AlertType[];
    errorTip: (value: string) => void;
    infoTip: (value: string) => void;
    removeTip: (value: number) => void;
}

type AlertType = {
    type: 'info' | 'error',
    message: string
}
export const AlertContext = React.createContext<AlertContextInterface>(null!);

export const AlertProvider = ({children}: { children: React.ReactNode }) => {

    const [alerts, setAlerts] = useState<AlertType[]>([]);
    const location = useLocation();

    useEffect(() => {
        setAlerts([]);
    }, [location]);
    const infoTip = (value: string) => {
        setAlerts([...alerts.slice(-9), {type: "info", message: value}]);
    };
    const errorTip = (value: string) => {

        if (value === 'TypeError: Failed to fetch') {
            value = ErrorMessagesEnum.NO_CONNECTION;
        }
        setAlerts([...alerts.slice(-9), {type: "error", message: value}]);
    };
    const removeTip = (ind: number) => {
        setAlerts([...alerts.filter((item, index) => index !== ind)]);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            alerts.shift();
            setAlerts([...alerts]);
        }, 3000)
        return () => clearTimeout(timer)
    }, [alerts]);

    const value = useMemo(
        () => ({
            alerts,
            infoTip,
            errorTip,
            removeTip
        }),
        [alerts]
    );
    return (<AlertContext.Provider value={value}>{children}</AlertContext.Provider>);
};

export const useAlert = () => React.useContext(AlertContext);