import { ILoginFormData } from "@/screens/Login/LoginForm";
import { IRegisterFormData } from "@/screens/Register/RegisterForm";
import { dtMoneyApi } from "@/shared/api/dt-money";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-reponse";

export const authenticate = async (userData: ILoginFormData): Promise<IAuthenticateResponse> => {
    const {data} = await dtMoneyApi.post<IAuthenticateResponse>("/auth/login", userData);
    console.log("Authenticate", data.token);
    return data;
}

export const registerUser = async (userData: IRegisterFormData): Promise<IAuthenticateResponse> => {

    const {data} = await dtMoneyApi.post<IAuthenticateResponse>("/auth/register", userData);
    return data;
}