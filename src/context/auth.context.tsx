import { ILoginFormData } from "@/screens/Login/LoginForm";
import { IRegisterFormData } from "@/screens/Register/RegisterForm";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import * as authService from "@/shared/services/dt-money/auth.service";
import { IUser } from "@/shared/interfaces/https/user-interface";
import ASyncStorage from "@react-native-async-storage/async-storage";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-reponse";

type AuthContextType = {
    user: IUser | null;
    token: string | null;
    handleAuthenticate: (params: ILoginFormData) => void;
    handleRegister: (params: IRegisterFormData) => void;
    handleLogout: () => void;
    handleUpdate: (params: IRegisterFormData) => void;
    restoreUserSession: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const handleAuthenticate = async (userData: ILoginFormData) => {
        const {token, user } = await authService.authenticate(userData);
        await ASyncStorage.setItem("dt-money", JSON.stringify({token, user}));
        setUser(user);
        setToken(token);
    }
    const handleRegister = async(formData: IRegisterFormData) => {
        const {token, user} = await authService.registerUser(formData);
        await ASyncStorage.setItem("dt-money", JSON.stringify({token, user}));
        setUser(user);
        setToken(token);
    }
    const handleLogout = async () => {
        await ASyncStorage.removeItem("dt-money");
        setUser(null);
        setToken(null);
    }

    const restoreUserSession = async () => {
        const userData = await ASyncStorage.getItem("dt-money");
 
        if(userData) {
            const {token, user} = JSON.parse(userData) as IAuthenticateResponse;
            setUser(user);
            setToken(token);
        }
        return userData;
    }
    const handleUpdate = ({ email, name, password, confirmPassword }: IRegisterFormData) => {}

    return (
        <AuthContext.Provider value={{
            user,
            token,
            handleAuthenticate,
            handleRegister,
            handleLogout,
            handleUpdate,
            restoreUserSession
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    return context
}