import { IUser } from "../user-interface";

export interface IAuthenticateResponse {
    token: string;
    user: IUser;
}