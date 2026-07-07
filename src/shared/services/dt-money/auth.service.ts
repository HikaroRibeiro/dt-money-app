import { ILoginFormData } from "@/screens/Login/LoginForm";
import { dtMoneyApi } from "@/shared/api/dt-money";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-reponse";

export const authenticate = async (userData: ILoginFormData): Promise<IAuthenticateResponse> => {
    const {data} = await dtMoneyApi.post<IAuthenticateResponse>("/auth/login", userData);

    return data;
}