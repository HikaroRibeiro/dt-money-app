import { ITotalTransactions } from "../total-transactions";
import { ITransaction } from "../transaction";

export interface IPagination {
    page: number;
    perPage: number;
    totalRows: number;
    totalPages: number
}

export interface IGetTransactionParams {
    page: number;
    perPage: number;
    from?: Date;
    to?: Date;
    typeId?: number;
    categoryId?: number;
    searchText?: string;
}

export interface IGetTransactionResponse {
    data: ITransaction[];
    totalRows: number,
    totalPages: number,
    page: number,
    perPage: number,
    totalTransactions: ITotalTransactions

}