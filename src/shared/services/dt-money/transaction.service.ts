import { dtMoneyApi } from "@/shared/api/dt-money";
import { ICreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import { IGetTransactionParams, IGetTransactionResponse } from "@/shared/interfaces/https/get-transaction-request";
import { ITransactionCategory } from "@/shared/interfaces/https/transaction-categorie-response";
import { IUpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request";
import qs from "qs";

// Aqui ficam todas as funções que se comunicam com o back-end.

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

export const deleteTransaction = async (transactionId: number): Promise<void> => {
    await dtMoneyApi.delete(`/transaction/${transactionId}`);
}

export const updateTransaction = async (transaction: IUpdateTransactionInterface): Promise<void> => {
    await dtMoneyApi.put("/transaction", transaction);
}