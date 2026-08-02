import { ITransactionCategory } from "@/shared/interfaces/https/transaction-categorie-response"
import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service"
import { ICreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import { ITransaction } from "@/shared/interfaces/transaction";
import { ITotalTransactions } from "@/shared/interfaces/total-transactions";

export type TransactionContextType = {
    fetchCategories: () => Promise<void>
    categories: ITransactionCategory[]
    createTransaction: (transaction: ICreateTransactionInterface) => Promise<void>
    fetchTransactions: () => Promise<void>
    totalTransactions: ITotalTransactions;
    transactions: ITransaction[];
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [categories, setCategories] = useState<ITransactionCategory[]>([]);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [totalTransactions, setTotalTransactions] = useState<ITotalTransactions>({
        revenue: 0,
        expense: 0,
        total: 0
    } as ITotalTransactions);

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
        setTransactions(transactionResponse.data);
        setTotalTransactions(transactionResponse.totalTransactions);
    }, [])

    return (
        <TransactionContext.Provider value={{ 
            fetchCategories, 
            categories, 
            totalTransactions, 
            createTransaction, 
            fetchTransactions,
            transactions }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}