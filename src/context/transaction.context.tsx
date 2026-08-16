import { ITransactionCategory } from "@/shared/interfaces/https/transaction-categorie-response"
import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service"
import { ICreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import { ITransaction } from "@/shared/interfaces/transaction";
import { ITotalTransactions } from "@/shared/interfaces/total-transactions";
import { IUpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request";
import { IPagination } from "@/shared/interfaces/https/get-transaction-request";

interface FetchTransactionParams {
    page: number;
}

interface ILoadings {
    initial: boolean;
    refresh: boolean;
    loadMore: boolean;
}

interface HandleLoadingsParms {
    key: keyof ILoadings,
    value: boolean
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
    loadMoreTransactions: () => Promise<void>;
    loadings: ILoadings;
    handleLoadings: (params: HandleLoadingsParms) => void;
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

    const [loadings, setLoadings] = useState<ILoadings>({
        initial: false,
        refresh: false,
        loadMore: false
    })

    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        perPage: 4,
        totalRows: 0,
        totalPages: 0
    })

    const handleLoadings = ({ key, value }: HandleLoadingsParms) => {
        setLoadings(prevData => ({ ...prevData, [key]: value }))
    }

    const refreshTransaction = useCallback(async () => {

        const { page, perPage } = pagination;

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
   
    }, [pagination])

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
        
    }, [pagination])

    const loadMoreTransactions = useCallback(async () => {
        if (loadings.loadMore || pagination.page >= pagination.totalPages) return;
        await fetchTransactions({
            page: pagination.page + 1
        })

    }, [loadings.loadMore, pagination])


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
            loadMoreTransactions,
            loadings,
            handleLoadings
            }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => {
    return useContext(TransactionContext);
}