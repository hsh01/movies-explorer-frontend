import { useState } from "react";
import { useAlert } from "../contexts/AlertContext";

export const useLocalStorage = <T>(keyName: string, defaultValue?: T, ttl?: number): [T, (v: T) => void] => {
    const {errorTip} = useAlert();

    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                const tempResult = JSON.parse(value);
                if (tempResult.expires_in && tempResult.expires_in < Date.now()) {
                    return;
                }
                if (tempResult.value) {
                    return tempResult.value;
                }
            } else if (defaultValue) {
                window.localStorage.setItem(keyName, JSON.stringify({
                    value: defaultValue,
                    expires_in: ttl ? new Date((new Date()).getTime() + ttl * 1000) : undefined,
                }));
                return defaultValue;
            }
        } catch (err: any) {
            errorTip(err.toString());
        }
        return defaultValue;
    });
    const setValue = (newValue: T) => {
        try {
            if (newValue) {
                window.localStorage.setItem(keyName, JSON.stringify({
                    value: newValue,
                    expires_in: ttl ? new Date((new Date()).getTime() + ttl * 1000) : undefined,
                }));
            } else {
                window.localStorage.removeItem(keyName);
            }
        } catch (err: any) {
            errorTip(err.toString());
        }
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};
