import { ILoginFormData } from "@/screens/Login/LoginForm";
import { IRegisterFormData } from "@/screens/Register/RegisterForm";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import * as authService from "@/shared/services/dt-money/auth.service";
import { IUser } from "@/shared/interfaces/https/user-interface";

type AuthContextType = {
    user: IUser | null;
    token: string | null;
    handleAuthenticate: (params: ILoginFormData) => void;
    handleRegister: (params: IRegisterFormData) => void;
    handleLogout: () => void;
    handleUpdate: (params: IRegisterFormData) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const handleAuthenticate = async (userData: ILoginFormData) => {
        const {token, user } = await authService.authenticate(userData);
        setUser(user);
        setToken(token);
        console.log(token, user);
    }
    const handleRegister = ({ email, name, password, confirmPassword }: IRegisterFormData) => {}
    const handleLogout = () => {}
    const handleUpdate = ({ email, name, password, confirmPassword }: IRegisterFormData) => {}

    return (
        <AuthContext.Provider value={{
            user,
            token,
            handleAuthenticate,
            handleRegister,
            handleLogout,
            handleUpdate,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    return context
}