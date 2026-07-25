import { AxiosInstance } from "axios";
import ASyncStorage from "@react-native-async-storage/async-storage";
import { IAuthenticateResponse } from "../interfaces/https/authenticate-reponse";

export const addTokenToRequest = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(async (config) => {
        const userData = await ASyncStorage.getItem("dt-money");
        if (userData) {
            const {token} = JSON.parse(userData) as IAuthenticateResponse;
            if(token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config;
    });
}