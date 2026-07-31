import { dtMoneyApi } from "@/shared/api/dt-money";
import { ICreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import { IGetTransactionParams, IGetTransactionResponse } from "@/shared/interfaces/https/get-transaction-request";
import { ITransactionCategory } from "@/shared/interfaces/https/transaction-categorie-response";
import qs from "qs";

export const getTransactionCategories = async(): Promise<ITransactionCategory[]> => {
    const {data} = await dtMoneyApi.get<ITransactionCategory[]>("/transaction/categories");
    return data;
}

export const createTransaction = async(transaction: ICreateTransactionInterface): Promise<void> => {
    await dtMoneyApi.post("/transaction", transaction);
}

export const getTransactions = async (params: IGetTransactionParams): Promise<IGetTransactionResponse> => {
    const {data} = await dtMoneyApi.get<IGetTransactionResponse>("/transaction", {
        params,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat"})
    });
    return data;
}