import { ITransactionCategory } from "@/shared/interfaces/https/transaction-categorie-response"
import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service"
import { ICreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import { ITransaction } from "@/shared/interfaces/transaction";
import { ITotalTransactions } from "@/shared/interfaces/total-transactions";
import { IUpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request";
import { IPagination } from "@/shared/interfaces/https/get-transaction-request";
import { is } from "date-fns/locale";
import { set } from "date-fns";

interface FetchTransactionParams {
    page: number;
}

export type TransactionContextType = {
    fetchCategories: () => Promise<void>;
    categories: ITransactionCategory[];
    createTransaction: (transaction: ICreateTransactionInterface) => Promise<void>;
    updateTransaction: (transaction: IUpdateTransactionInterface) => Promise<void>;
    fetchTransactions: (params: FetchTransactionParams) => Promise<void>;
    totalTransactions: ITotalTransactions;
    transactions: ITransaction[];
    refreshTransaction: () => Promise<void>;
    loading: boolean;
    loadMoreTransactions: () => Promise<void>;
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
    const [loading, isLoading] = useState(false);

    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        perPage: 4,
        totalRows: 0,
        totalPages: 0
    })

    const refreshTransaction = async () => {

        const { page, perPage } = pagination;

        isLoading(true);
        const transactionResponse = await transactionService.getTransactions({
            page: 1,
            perPage: page * perPage
        });
        setTransactions(transactionResponse.data);
        setTotalTransactions(transactionResponse.totalTransactions);
        setPagination({
            ...pagination,
            page,
            totalRows: transactionResponse.totalRows,
            totalPages: transactionResponse.totalPages
        })
        isLoading(false);
    }

    const updateTransaction = async (transaction: IUpdateTransactionInterface) => {
        await transactionService.updateTransaction(transaction);
        await refreshTransaction();
    }

    const fetchCategories = async () => {
        const categoriesResponse = await transactionService.getTransactionCategories();
        setCategories(categoriesResponse);
    }

    const createTransaction = async (transaction: ICreateTransactionInterface) => {
        await transactionService.createTransaction(transaction);
        await refreshTransaction();
    }

    const fetchTransactions = useCallback(async ({ page = 1 }:FetchTransactionParams) => {

        isLoading(true);

        const transactionResponse = await transactionService.getTransactions({
            page,
            perPage: pagination.perPage
        });

        if(page === 1) {
            setTransactions(transactionResponse.data);
        } else {
            setTransactions((prevState) => [...prevState, ...transactionResponse.data]);
        }

        setTotalTransactions(transactionResponse.totalTransactions);
        setPagination({
            ...pagination,
            page,
            totalRows: transactionResponse.totalRows,
            totalPages: transactionResponse.totalPages,
        })

        isLoading(false);
        
    }, [pagination])

    const loadMoreTransactions = useCallback(async () => {
        if (loading || pagination.page >= pagination.totalPages) return;
        await fetchTransactions({
            page: pagination.page + 1
        })

    }, [loading, pagination])


    return (
        <TransactionContext.Provider value={{ 
            fetchCategories, 
            categories, 
            totalTransactions, 
            createTransaction,
            updateTransaction, 
            fetchTransactions,
            transactions,
            refreshTransaction,
            loading,
            loadMoreTransactions
            }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}