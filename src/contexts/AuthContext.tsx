import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserCredentialsModel, UserModel } from "../models/UserModel";
import { api } from "../utils/api/MainApi";
import { ProtectedRouter, PublicRouter } from "../utils/routes";
import { LocalStorageEnum } from "../utils/constants";


interface AuthContextInterface {
    user: UserModel | null;
    setUser: (user: UserModel) => void;
    login: (user: { email: string, password: string }, callback?: VoidFunction) => any;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextInterface>(null!);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage<UserModel | null>(LocalStorageEnum.USER, null);
    const location = useLocation();

    function checkAuth() {
        api.getMe()
            .then((res) => {
                if (res) {
                    setUser(res);
                    if (Object.values(ProtectedRouter).map(item=>item.toString()).includes(location?.pathname)) {
                        const from = location?.pathname ? location?.pathname : PublicRouter.MAIN;
                        navigate(from, {replace: true});
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                logout();
            });
    }

    useEffect(() => {
        if (user) {
            checkAuth();
        }
    }, []);

    const login = (user: UserCredentialsModel) => {
        return api.authorize(user)
            .then((res) => {
                if (res.success) {
                    checkAuth();
                }
            }).then(() => {
                navigate(PublicRouter.MAIN);
            });
    };

    const logout = () => {
        api.logout()
            .then(() => {
                Object.values(LocalStorageEnum).forEach((item) => localStorage.removeItem(item));
                setUser(null);
            })
            .finally(() => {
                navigate(PublicRouter.MAIN);
            });
    };

    const value = useMemo(
        () => ({
            user,
            setUser,
            login,
            logout
        }),
        [user]
    );
    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};

export const useAuth = () => React.useContext(AuthContext);