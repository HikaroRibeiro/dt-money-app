import { ITransactionCategory } from "@/shared/interfaces/https/transaction-categorie-response"
import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service"
import { ICreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import { ITransaction } from "@/shared/interfaces/transaction";

export type TransactionContextType = {
    fetchCategories: () => Promise<void>
    categories: ITransactionCategory[]
    createTransaction: (transaction: ICreateTransactionInterface) => Promise<void>
    fetchTransactions: () => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [categories, setCategories] = useState<ITransactionCategory[]>([]);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    const fetchCategories = async () => {
        const categoriesResponse = await transactionService.getTransactionCategories();
        setCategories(categoriesResponse);
    }

    const createTransaction = async (transaction: ICreateTransactionInterface) => {
        await transactionService.createTransaction(transaction);
    }

    const fetchTransactions = useCallback(async () => {
        const transactionResponse = await transactionService.getTransactions({
            page: 1,
            perPage: 10,
        });
        console.log(transactionResponse);
        setTransactions(transactionResponse.data);
    }, [])

    return (
        <TransactionContext.Provider value={{ fetchCategories, categories, createTransaction, fetchTransactions }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}